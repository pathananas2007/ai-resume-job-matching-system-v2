from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class JobBase(BaseModel):
    title: str
    company: str
    location: str
    description: str
    requirements: List[str]
    salary_range: Optional[str] = None
    job_type: Optional[str] = None
    status: Optional[str] = "open"

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[List[str]] = None
    salary_range: Optional[str] = None
    job_type: Optional[str] = None
    status: Optional[str] = None

class JobResponse(JobBase):
    id: str
    recruiter_id: str
    created_at: datetime
    updated_at: datetime

class JobListResponse(BaseModel):
    jobs: List[JobResponse]
    total: int
    page: int
    pages: int

class JobMatchResult(BaseModel):
    job_id: str
    resume_id: str
    match_score: float
    matched_skills: List[str]
    missing_skills: List[str]
    recommendations: List[str]
