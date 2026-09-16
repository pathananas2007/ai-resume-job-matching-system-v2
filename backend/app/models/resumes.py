from datetime import datetime, timezone
from enum import Enum
from typing import Optional
from pydantic import Field
from app.models.base import MongoModel
class ResumeStatus(str, Enum):



    ACTIVE = "ACTIVE"



    ARCHIVED = "ARCHIVED"



    DELETED = "DELETED"
class AnalysisStatus(str, Enum):



    NOT_ANALYZED = "NOT_ANALYZED"



    PENDING = "PENDING"



    COMPLETED = "COMPLETED"



    FAILED = "FAILED"
class ResumeModel(MongoModel):



    user_id: str



    file_name: str



    file_type: str



    file_size: int



    storage_path: str



    original_file_name: str



    mime_type: str



        status: ResumeStatus = ResumeStatus.ACTIVE



    is_active: bool = True



    deactivated_at: Optional[datetime] = None



        analysis_status: AnalysisStatus = AnalysisStatus.NOT_ANALYZED



    analysis_id: Optional[str] = None



        uploaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))



    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))



    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))