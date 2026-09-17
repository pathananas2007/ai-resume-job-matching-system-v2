from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from typing import List, Optional
from datetime import datetime, timezone
from bson import ObjectId

from app.core.database import get_database
from app.core.security import get_current_user
from app.models.user import UserModel
from app.schemas.resume import (
    ResumeUploadResponse, ResumeResponse, ResumeListResponse,
    AnalysisResult, SkillGapAnalysis, LearningRecommendation
)

router = APIRouter(prefix="/resumes", tags=["resumes"])

@router.post("/upload", response_model=ResumeUploadResponse)
async def upload_resume(
    file: UploadFile = File(...),
    current_user: UserModel = Depends(get_current_user)
):
    db = get_database()
    
    # Read file content simply for now
    content = (await file.read()).decode("utf-8", errors="ignore")
    
    resume_dict = {
        "user_id": str(current_user.id),
        "title": file.filename,
        "content": content,
        "parsed_data": {"extracted_skills": [], "experience_years": 0},
        "status": "active",
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
    
    result = await db["resumes"].insert_one(resume_dict)
    
    return ResumeUploadResponse(
        id=str(result.inserted_id),
        message="Resume uploaded successfully",
        status="active"
    )

@router.get("", response_model=ResumeListResponse)
async def list_resumes(current_user: UserModel = Depends(get_current_user)):
    db = get_database()
    cursor = db["resumes"].find({"user_id": str(current_user.id), "status": {"$ne": "archived"}})
    resumes = await cursor.to_list(length=100)
    
    for r in resumes:
        r["id"] = str(r.pop("_id"))
        
    return ResumeListResponse(
        resumes=[ResumeResponse(**r) for r in resumes],
        total=len(resumes)
    )

@router.get("/{resume_id}", response_model=ResumeResponse)
async def get_resume(resume_id: str, current_user: UserModel = Depends(get_current_user)):
    db = get_database()
    try:
        resume = await db["resumes"].find_one({"_id": ObjectId(resume_id), "user_id": str(current_user.id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    resume["id"] = str(resume.pop("_id"))
    return ResumeResponse(**resume)

@router.delete("/{resume_id}")
async def delete_resume(resume_id: str, current_user: UserModel = Depends(get_current_user)):
    db = get_database()
    try:
        result = await db["resumes"].delete_one({"_id": ObjectId(resume_id), "user_id": str(current_user.id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    return {"message": "Resume deleted"}

@router.post("/{resume_id}/archive")
async def archive_resume(resume_id: str, current_user: UserModel = Depends(get_current_user)):
    db = get_database()
    try:
        await db["resumes"].update_one(
            {"_id": ObjectId(resume_id), "user_id": str(current_user.id)},
            {"$set": {"status": "archived", "updated_at": datetime.now(timezone.utc)}}
        )
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    return {"message": "Resume archived"}

@router.post("/{resume_id}/analyze", response_model=AnalysisResult)
@router.get("/{resume_id}/analysis", response_model=AnalysisResult)
@router.post("/{resume_id}/refresh", response_model=AnalysisResult)
async def analyze_resume(resume_id: str, current_user: UserModel = Depends(get_current_user)):
    # Mock AI analysis
    return AnalysisResult(
        score=85.0,
        feedback=["Strong technical skills", "Good experience layout"],
        strengths=["Python", "System Design"],
        weaknesses=["Missing cloud certifications"]
    )

@router.get("/{resume_id}/skill-gaps", response_model=SkillGapAnalysis)
async def get_skill_gaps(resume_id: str, target_job: Optional[str] = None, current_user: UserModel = Depends(get_current_user)):
    # Mock skill gap
    return SkillGapAnalysis(
        missing_skills=["AWS", "Docker"],
        suggested_courses=["AWS Solutions Architect", "Docker Mastery"]
    )

@router.get("/{resume_id}/recommendations", response_model=List[LearningRecommendation])
async def get_recommendations(resume_id: str, current_user: UserModel = Depends(get_current_user)):
    # Mock recommendations
    return [
        LearningRecommendation(
            title="Docker for Beginners",
            url="https://example.com/docker",
            provider="Coursera",
            skill="Docker"
        )
    ]
