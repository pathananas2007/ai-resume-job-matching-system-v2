from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class ResumeUploadResponse(BaseModel):
    id: str
    message: str
    status: str

class ResumeBase(BaseModel):
    title: str
    content: str
    parsed_data: Optional[Dict[str, Any]] = None
    status: str = "active"

class ResumeResponse(ResumeBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

class ResumeListResponse(BaseModel):
    resumes: List[ResumeResponse]
    total: int

class AnalysisResult(BaseModel):
    score: float
    feedback: List[str]
    strengths: List[str]
    weaknesses: List[str]

class SkillGapAnalysis(BaseModel):
    missing_skills: List[str]
    suggested_courses: List[str]

class LearningRecommendation(BaseModel):
    title: str
    url: str
    provider: str
    skill: str
