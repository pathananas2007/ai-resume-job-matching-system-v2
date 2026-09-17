# app/models/user.py
from enum import Enum
from typing import List, Optional, Union
from pydantic import field_validator
from .base import BaseDocumentModel

class Role(str, Enum):
    JOB_SEEKER = "JOB_SEEKER"
    RECRUITER = "RECRUITER"
    ADMIN = "ADMIN"

class UserModel(BaseDocumentModel):
    firebase_uid: Optional[str] = None
    name: str
    email: str
    hashed_password: Optional[str] = None
    role: Role = Role.JOB_SEEKER
    avatar: Optional[str] = None
    headline: Optional[str] = None
    bio: Optional[str] = None
    skills: List[str] = []
    education: List[dict] = []
    experience: List[dict] = []
    projects: List[dict] = []
    certifications: List[Union[dict, str]] = []
    social_links: dict = {}
    career_targets: dict = {}

    @field_validator("certifications", mode="before")
    @classmethod
    def normalize_certifications(cls, v):
        if not isinstance(v, list):
            return v
        normalized = []
        for cert in v:
            if isinstance(cert, str):
                normalized.append({"name": cert})
            elif isinstance(cert, dict):
                normalized.append(cert)
        return normalized
