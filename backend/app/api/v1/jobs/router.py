from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from datetime import datetime, timezone
from bson import ObjectId

from app.core.database import get_database
from app.core.security import get_current_user, get_optional_user
from app.models.user import UserModel, Role
from app.models.jobs import JobModel
from app.schemas.job import JobCreate, JobUpdate, JobResponse, JobListResponse, JobMatchResult

router = APIRouter(prefix="/jobs", tags=["jobs"])

@router.get("", response_model=JobListResponse)
async def list_jobs(
    skip: int = 0, 
    limit: int = 20, 
    status: Optional[str] = None,
    current_user: Optional[UserModel] = Depends(get_optional_user)
):
    db = get_database()
    query = {}
    
    if status:
        query["status"] = status
        
    # If recruiter, maybe only show their jobs
    if current_user and current_user.role == Role.RECRUITER:
        query["recruiter_id"] = str(current_user.id)
        
    cursor = db["jobs"].find(query).skip(skip).limit(limit).sort("created_at", -1)
    jobs = await cursor.to_list(length=limit)
    
    total = await db["jobs"].count_documents(query)
    
    for job in jobs:
        job["id"] = str(job.pop("_id"))
        
    return JobListResponse(
        jobs=[JobResponse(**job) for job in jobs],
        total=total,
        page=(skip // limit) + 1,
        pages=(total + limit - 1) // limit
    )

@router.post("", response_model=JobResponse)
async def create_job(job_data: JobCreate, current_user: UserModel = Depends(get_current_user)):
    if current_user.role != Role.RECRUITER:
        raise HTTPException(status_code=403, detail="Only recruiters can create jobs")
        
    db = get_database()
    
    job_dict = job_data.model_dump()
    job_dict["recruiter_id"] = str(current_user.id)
    job_dict["created_at"] = datetime.now(timezone.utc)
    job_dict["updated_at"] = datetime.now(timezone.utc)
    
    job = JobModel(**job_dict)
    
    result = await db["jobs"].insert_one(job.model_dump(by_alias=True, exclude={"id"}))
    
    created_job = await db["jobs"].find_one({"_id": result.inserted_id})
    created_job["id"] = str(created_job.pop("_id"))
    
    return JobResponse(**created_job)

@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: str):
    db = get_database()
    
    try:
        job = await db["jobs"].find_one({"_id": ObjectId(job_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid job ID")
        
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    job["id"] = str(job.pop("_id"))
    return JobResponse(**job)

@router.put("/{job_id}", response_model=JobResponse)
async def update_job(job_id: str, job_data: JobUpdate, current_user: UserModel = Depends(get_current_user)):
    if current_user.role != Role.RECRUITER:
        raise HTTPException(status_code=403, detail="Only recruiters can update jobs")
        
    db = get_database()
    
    try:
        job = await db["jobs"].find_one({"_id": ObjectId(job_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid job ID")
        
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    if job.get("recruiter_id") != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to update this job")
        
    update_dict = {k: v for k, v in job_data.model_dump(exclude_unset=True).items() if v is not None}
    update_dict["updated_at"] = datetime.now(timezone.utc)
    
    await db["jobs"].update_one(
        {"_id": ObjectId(job_id)},
        {"$set": update_dict}
    )
    
    updated_job = await db["jobs"].find_one({"_id": ObjectId(job_id)})
    updated_job["id"] = str(updated_job.pop("_id"))
    return JobResponse(**updated_job)

@router.patch("/{job_id}", response_model=JobResponse)
async def patch_job(job_id: str, job_data: JobUpdate, current_user: UserModel = Depends(get_current_user)):
    return await update_job(job_id, job_data, current_user)

@router.delete("/{job_id}")
async def delete_job(job_id: str, current_user: UserModel = Depends(get_current_user)):
    if current_user.role != Role.RECRUITER:
        raise HTTPException(status_code=403, detail="Only recruiters can delete jobs")
        
    db = get_database()
    
    try:
        job = await db["jobs"].find_one({"_id": ObjectId(job_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid job ID")
        
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    if job.get("recruiter_id") != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to delete this job")
        
    await db["jobs"].delete_one({"_id": ObjectId(job_id)})
    
    return {"message": "Job deleted successfully"}

@router.get("/{job_id}/match", response_model=JobMatchResult)
async def get_job_match(job_id: str, resume_id: str, current_user: UserModel = Depends(get_current_user)):
    # Mock implementation of AI job matching
    return JobMatchResult(
        job_id=job_id,
        resume_id=resume_id,
        match_score=85.5,
        matched_skills=["Python", "React", "FastAPI"],
        missing_skills=["Kubernetes", "AWS"],
        recommendations=["Gain more experience with cloud deployments."]
    )
