from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional
from datetime import datetime, timezone
from bson import ObjectId

from app.core.database import get_database
from app.core.security import get_current_user
from app.models.user import UserModel, Role
from app.schemas.application import (
    ApplicationCreate, ApplicationStatusUpdate, ApplicationInterview,
    ApplicationResponse, ApplicationListResponse
)

router = APIRouter(prefix="/applications", tags=["applications"])

@router.post("", response_model=ApplicationResponse)
async def create_application(app_data: ApplicationCreate, current_user: UserModel = Depends(get_current_user)):
    if current_user.role != Role.JOB_SEEKER:
        raise HTTPException(status_code=403, detail="Only job seekers can apply")
        
    db = get_database()
    
    # Check if job exists
    job = await db["jobs"].find_one({"_id": ObjectId(app_data.job_id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    app_dict = app_data.model_dump()
    app_dict["applicant_id"] = str(current_user.id)
    app_dict["recruiter_id"] = job.get("recruiter_id", "")
    app_dict["status"] = "applied"
    app_dict["created_at"] = datetime.now(timezone.utc)
    app_dict["updated_at"] = datetime.now(timezone.utc)
    app_dict["match_score"] = 80.0  # Mock AI score
    
    result = await db["applications"].insert_one(app_dict)
    
    created_app = await db["applications"].find_one({"_id": result.inserted_id})
    created_app["id"] = str(created_app.pop("_id"))
    
    return ApplicationResponse(**created_app)

@router.get("", response_model=ApplicationListResponse)
async def list_seeker_applications(
    skip: int = 0, limit: int = 20,
    current_user: UserModel = Depends(get_current_user)
):
    if current_user.role != Role.JOB_SEEKER:
        raise HTTPException(status_code=403, detail="Only job seekers can use this route")
        
    db = get_database()
    query = {"applicant_id": str(current_user.id)}
    
    cursor = db["applications"].find(query).skip(skip).limit(limit).sort("created_at", -1)
    applications = await cursor.to_list(length=limit)
    total = await db["applications"].count_documents(query)
    
    for app in applications:
        app["id"] = str(app.pop("_id"))
        
    return ApplicationListResponse(
        applications=[ApplicationResponse(**a) for a in applications],
        total=total,
        page=(skip // limit) + 1,
        pages=(total + limit - 1) // limit
    )

@router.get("/recruiter", response_model=ApplicationListResponse)
async def list_recruiter_applications(
    skip: int = 0, limit: int = 20,
    current_user: UserModel = Depends(get_current_user)
):
    if current_user.role != Role.RECRUITER:
        raise HTTPException(status_code=403, detail="Only recruiters can use this route")
        
    db = get_database()
    query = {"recruiter_id": str(current_user.id)}
    
    cursor = db["applications"].find(query).skip(skip).limit(limit).sort("created_at", -1)
    applications = await cursor.to_list(length=limit)
    total = await db["applications"].count_documents(query)
    
    for app in applications:
        app["id"] = str(app.pop("_id"))
        
    return ApplicationListResponse(
        applications=[ApplicationResponse(**a) for a in applications],
        total=total,
        page=(skip // limit) + 1,
        pages=(total + limit - 1) // limit
    )

@router.get("/{application_id}", response_model=ApplicationResponse)
async def get_application(application_id: str, current_user: UserModel = Depends(get_current_user)):
    db = get_database()
    try:
        app = await db["applications"].find_one({"_id": ObjectId(application_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
        
    if app.get("applicant_id") != str(current_user.id) and app.get("recruiter_id") != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
        
    app["id"] = str(app.pop("_id"))
    return ApplicationResponse(**app)

@router.put("/{application_id}/status", response_model=ApplicationResponse)
async def update_application_status(
    application_id: str, 
    status_update: ApplicationStatusUpdate, 
    current_user: UserModel = Depends(get_current_user)
):
    if current_user.role != Role.RECRUITER:
        raise HTTPException(status_code=403, detail="Only recruiters can update status")
        
    db = get_database()
    try:
        app = await db["applications"].find_one({"_id": ObjectId(application_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    if not app or app.get("recruiter_id") != str(current_user.id):
        raise HTTPException(status_code=404, detail="Application not found or unauthorized")
        
    await db["applications"].update_one(
        {"_id": ObjectId(application_id)},
        {"$set": {"status": status_update.status, "updated_at": datetime.now(timezone.utc)}}
    )
    
    updated_app = await db["applications"].find_one({"_id": ObjectId(application_id)})
    updated_app["id"] = str(updated_app.pop("_id"))
    return ApplicationResponse(**updated_app)

@router.post("/{application_id}/withdraw", response_model=ApplicationResponse)
async def withdraw_application(application_id: str, current_user: UserModel = Depends(get_current_user)):
    if current_user.role != Role.JOB_SEEKER:
        raise HTTPException(status_code=403, detail="Only job seekers can withdraw")
        
    db = get_database()
    try:
        app = await db["applications"].find_one({"_id": ObjectId(application_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    if not app or app.get("applicant_id") != str(current_user.id):
        raise HTTPException(status_code=404, detail="Application not found or unauthorized")
        
    await db["applications"].update_one(
        {"_id": ObjectId(application_id)},
        {"$set": {"status": "withdrawn", "updated_at": datetime.now(timezone.utc)}}
    )
    
    updated_app = await db["applications"].find_one({"_id": ObjectId(application_id)})
    updated_app["id"] = str(updated_app.pop("_id"))
    return ApplicationResponse(**updated_app)

@router.post("/{application_id}/interview", response_model=ApplicationResponse)
async def schedule_interview(
    application_id: str, 
    interview_data: ApplicationInterview, 
    current_user: UserModel = Depends(get_current_user)
):
    if current_user.role != Role.RECRUITER:
        raise HTTPException(status_code=403, detail="Only recruiters can schedule interviews")
        
    db = get_database()
    try:
        app = await db["applications"].find_one({"_id": ObjectId(application_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    if not app or app.get("recruiter_id") != str(current_user.id):
        raise HTTPException(status_code=404, detail="Application not found or unauthorized")
        
    await db["applications"].update_one(
        {"_id": ObjectId(application_id)},
        {"$set": {
            "status": "interview_scheduled", 
            "interview_details": interview_data.model_dump(),
            "updated_at": datetime.now(timezone.utc)
        }}
    )
    
    updated_app = await db["applications"].find_one({"_id": ObjectId(application_id)})
    updated_app["id"] = str(updated_app.pop("_id"))
    return ApplicationResponse(**updated_app)
