from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.applications import ApplicationStatus
# ΓöÇΓöÇΓöÇ Request bodies ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇclass ApplicationCreate(BaseModel):



    """Fields the job seeker submits when applying."""



    job_id: str



    resume_id: Optional[str] = None



    cover_note: Optional[str] = None
class ApplicationStatusUpdate(BaseModel):



    """Recruiter/admin status update."""



    status: ApplicationStatus
class ApplicationInterviewUpdate(BaseModel):



    """Recruiter sets interview details."""



    interview_date: Optional[datetime] = None



    interview_time: Optional[str] = None



    interview_mode: Optional[str] = None



    interview_link: Optional[str] = None
class ApplicationNotesUpdate(BaseModel):



    """Seeker updates their own notes (applicant_notes only)."""



    applicant_notes: Optional[str] = None
# ΓöÇΓöÇΓöÇ Response bodies ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇclass ApplicationResponse(BaseModel):



    """



    Public application response ΓÇö recruiter_notes is deliberately excluded



    to prevent leaking private notes to job seekers.



    """



    id: str = Field(..., alias="_id")



    job_id: str



    applicant_id: str



    recruiter_id: str



    status: ApplicationStatus



    resume_id: Optional[str] = None



    cover_note: Optional[str] = None



    applicant_notes: Optional[str] = None  # seeker can see their own notes



    match_score: Optional[float] = None



    # null until AI computes it



    interview_date: Optional[datetime] = None



    interview_time: Optional[str] = None



    interview_mode: Optional[str] = None



    interview_link: Optional[str] = None



    withdrawn_at: Optional[datetime] = None



    created_at: datetime



    updated_at: datetime



    class Config:



        orm_mode = True



        allow_population_by_field_name = True
class ApplicationListResponse(BaseModel):



    items: List[ApplicationResponse]



    page: int



    page_size: int



    total: int



    total_pages: int