# app/api/v1/auth/router.py
from fastapi import APIRouter, HTTPException, status, Depends, Request
from pydantic import BaseModel
from typing import Optional

from app.schemas.user import UserResponse
from app.models.user import UserModel, Role
from app.core.security import get_current_user
from app.core.database import get_database

router = APIRouter(prefix="/auth", tags=["auth"])

class SyncRequest(BaseModel):
    full_name: str
    email: str
    role: str
    company_name: Optional[str] = None

from fastapi.security import OAuth2PasswordBearer
from app.core.firebase import verify_token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

@router.post("/sync", response_model=UserResponse)
async def sync_user(sync_data: SyncRequest, token: str = Depends(oauth2_scheme)):
    """
    Sync a newly registered Firebase user with MongoDB.
    """
    try:
        payload = verify_token(token)
        user_uid: str = payload.get("uid")
        if not user_uid:
            raise HTTPException(status_code=401, detail="Invalid token")
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    db = get_database()
    
    # Check if user already exists
    existing_user = await db["users"].find_one({"firebase_uid": user_uid})
    if existing_user:
        existing_user["id"] = str(existing_user["_id"])
        return UserResponse(**existing_user)

    existing_user_by_email = await db["users"].find_one({"email": sync_data.email})
    if existing_user_by_email:
        # Link firebase_uid
        await db["users"].update_one({"_id": existing_user_by_email["_id"]}, {"$set": {"firebase_uid": user_uid}})
        existing_user_by_email["id"] = str(existing_user_by_email["_id"])
        return UserResponse(**existing_user_by_email)

    try:
        role = Role(sync_data.role.upper())
    except ValueError:
        role = Role.JOB_SEEKER
        
    user_dict = {
        "firebase_uid": user_uid,
        "name": sync_data.full_name,
        "email": sync_data.email,
        "role": role,
        "skills": [],
        "education": [],
        "experience": [],
        "projects": [],
        "certifications": [],
        "social_links": {},
        "career_targets": {}
    }
    
    user = UserModel(**user_dict)
    
    result = await db["users"].insert_one(user.model_dump(by_alias=True, exclude={"id"}))
    user_dict["_id"] = result.inserted_id
    user_dict["id"] = str(result.inserted_id)
    
    return UserResponse(**user_dict)

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: UserModel = Depends(get_current_user)):
    user_dict = current_user.model_dump()
    user_dict["id"] = str(current_user.id)
    return UserResponse(**user_dict)

