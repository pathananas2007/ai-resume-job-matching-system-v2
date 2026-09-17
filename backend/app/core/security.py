# app/core/security.py
from datetime import datetime, timedelta
from typing import Any, Union, Optional
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from fastapi.security.utils import get_authorization_scheme_param
from passlib.context import CryptContext
from app.core.config import settings
from app.core.firebase import verify_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(
    subject: Union[str, Any],
    expires_delta: timedelta = None,
) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    from app.core.database import get_database
    from app.models.user import UserModel

    try:
        payload = verify_token(token)
        # Firebase user ID is in the 'uid' field
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
    # Find user by firebase_uid instead of _id, or by email as fallback if they logged in with Google/Github
    email = payload.get("email")
    user_doc = await db["users"].find_one({"firebase_uid": user_uid})
    if not user_doc and email:
        user_doc = await db["users"].find_one({"email": email})
        # Optionally link the uid here if found by email

    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")

    user_doc["_id"] = str(user_doc["_id"])
    return UserModel(**user_doc)

async def get_optional_user(request: Request) -> Optional["UserModel"]:
    """Like get_current_user but returns None instead of 401 if no/invalid token."""
    from app.core.database import get_database
    from app.models.user import UserModel

    authorization = request.headers.get("Authorization", "")
    scheme, token = get_authorization_scheme_param(authorization)
    if not token or scheme.lower() != "bearer":
        return None
    try:
        payload = verify_token(token)
        user_uid: str = payload.get("uid")
        if not user_uid:
            return None
        db = get_database()
        email = payload.get("email")
        user_doc = await db["users"].find_one({"firebase_uid": user_uid})
        if not user_doc and email:
            user_doc = await db["users"].find_one({"email": email})

        if not user_doc:
            return None
        user_doc["_id"] = str(user_doc["_id"])
        return UserModel(**user_doc)
    except Exception:
        return None

def require_role(*roles):
    def role_checker(current_user=Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions",
            )
        return current_user
    return role_checker
