from typing import Optional, List, Union
from enum import Enum
from pydantic import BaseModel, field_validator
from .base import BaseDocumentModel
class Role(str, Enum):



    JOB_SEEKER = "JOB_SEEKER"



    RECRUITER = "RECRUITER"



    ADMIN = "ADMIN"
class UserModel(BaseDocumentModel):



    name: str



    email: str



    hashed_password: Optional[str] = None  # For email/password auth



    role: Role = Role.JOB_SEEKER



    avatar: Optional[str] = None



    headline: Optional[str] = None



    bio: Optional[str] = None



    skills: List[str] = []



    education: List[dict] = []



    experience: List[dict] = []



    projects: List[dict] = []



    certifications: List[Union[dict, str]] = []  # Accept both dicts and strings for backwards compatibility



    social_links: dict = {}



    career_targets: dict = {}



        @field_validator('certifications', mode='before')



    
@classmethod



    def normalize_certifications(cls, v):



        """Convert string certifications to dict format for backwards compatibility."""



        if not isinstance(v, list):



            return v



                normalized = []



        for cert in v:



            if isinstance(cert, str):



                # Convert string to dict format



                normalized.append({"name": cert})



            el
if isinstance(cert, dict):



                normalized.append(cert)



        return normalized