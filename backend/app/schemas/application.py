from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ApplicationBase(BaseModel):
    job_id: str
    resume_id: str
    cover_letter: Optional[str] = None
    answers: Optional[dict] = None

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationStatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None

class ApplicationInterview(BaseModel):
    scheduled_at: datetime
    location_or_link: str
    notes: Optional[str] = None

class ApplicationResponse(ApplicationBase):
    id: str
    applicant_id: str
    recruiter_id: str
    status: str
    created_at: datetime
    updated_at: datetime
    match_score: Optional[float] = None

class ApplicationListResponse(BaseModel):
    applications: List[ApplicationResponse]
    total: int
    page: int
    pages: int
