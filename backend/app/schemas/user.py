from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str = "JOB_SEEKER"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    full_name: Optional[str] = None
    is_verified: bool = True
    created_at: Optional[str] = None
    avatar: Optional[str] = None
    
    class Config:
        populate_by_name = True

