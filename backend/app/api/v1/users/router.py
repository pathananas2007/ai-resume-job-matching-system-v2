from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any, Optional, List
from pydantic import BaseModel, Field

from app.core.database import get_database
from app.core.security import get_current_user
from app.models.user import UserModel
from app.schemas.user import UserResponse

router = APIRouter(prefix="/users", tags=["users"])

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    skills: Optional[List[str]] = None
    
    class Config:
        extra = "allow" # allow extra fields for flexible update

class AppearanceUpdate(BaseModel):
    theme: Optional[str] = None
    fontSize: Optional[str] = None
    compactMode: Optional[bool] = None

@router.get("/me", response_model=UserResponse)
async def read_user_me(current_user: UserModel = Depends(get_current_user)):
    user_dict = current_user.model_dump()
    user_dict["id"] = str(current_user.id)
    return UserResponse(**user_dict)

@router.put("/me", response_model=UserResponse)
async def update_user_me(update_data: UserUpdate, current_user: UserModel = Depends(get_current_user)):
    db = get_database()
    
    update_dict = {k: v for k, v in update_data.model_dump(exclude_unset=True).items() if v is not None}
    
    if not update_dict:
        return await read_user_me(current_user)
        
    await db["users"].update_one(
        {"_id": current_user.id},
        {"$set": update_dict}
    )
    
    # fetch updated
    updated_user = await db["users"].find_one({"_id": current_user.id})
    updated_user["id"] = str(updated_user["_id"])
    return UserResponse(**updated_user)

@router.put("/me/appearance", response_model=UserResponse)
async def update_appearance(update_data: AppearanceUpdate, current_user: UserModel = Depends(get_current_user)):
    db = get_database()
    
    update_dict = {f"appearance.{k}": v for k, v in update_data.model_dump(exclude_unset=True).items() if v is not None}
    
    if update_dict:
        await db["users"].update_one(
            {"_id": current_user.id},
            {"$set": update_dict}
        )
        
    updated_user = await db["users"].find_one({"_id": current_user.id})
    updated_user["id"] = str(updated_user["_id"])
    return UserResponse(**updated_user)

@router.get("/profile/suggestions/{resume_id}")
async def get_profile_suggestions(resume_id: str, current_user: UserModel = Depends(get_current_user)):
    # Mock implementation of profile suggestions based on resume
    return {
        "suggestions": [
            {"type": "skill", "value": "Add 'FastAPI' to your skills based on your resume."},
            {"type": "experience", "value": "Flesh out the descriptions for your most recent role."}
        ]
    }

@router.post("/profile/apply-suggestions", response_model=UserResponse)
async def apply_profile_suggestions(suggestions: List[Dict[str, Any]], current_user: UserModel = Depends(get_current_user)):
    # Mock implementation, just return user
    return await read_user_me(current_user)
