from typing import Optional, List
from pydantic import BaseModel
from .base import BaseDocumentModel
class ResumeModel(BaseDocumentModel):



    user_id: str



    content: str



    parsed_data: dict = {}



    class JobModel(BaseDocumentModel):



    title: str



    company: str



    description: str



    requirements: List[str] = []



    recruiter_id: str
class ApplicationModel(BaseDocumentModel):



    user_id: str



    job_id: str



    status: str



    score: Optional[int] = None
class NotificationModel(BaseDocumentModel):



    user_id: str



    title: str



    message: str



    type: str



    read: bool = False
class AnalyticsModel(BaseDocumentModel):



    user_id: str



    event_type: str



    data: dict = {}
class LearningProgressModel(BaseDocumentModel):



    user_id: str



    course_id: str



    status: str



    progress: int = 0
class SavedJobModel(BaseDocumentModel):



    user_id: str



    job_id: str
class SavedResourceModel(BaseDocumentModel):



    user_id: str



    resource_id: str