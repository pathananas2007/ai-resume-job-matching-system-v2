from typing import List, Optional
from pydantic import Field
from app.models.base import MongoModel

class JobModel(MongoModel):
    title: str
    company: str
    location: str
    description: str
    requirements: List[str]
    salary_range: Optional[str] = None
    job_type: Optional[str] = None
    status: str = "open"
    recruiter_id: str
