# app/api/v1/router.py
from fastapi import APIRouter

from app.api.v1.auth.router import router as auth_router
from app.api.v1.users.router import router as users_router
from app.api.v1.jobs.router import router as jobs_router
from app.api.v1.resumes.router import router as resumes_router
from app.api.v1.applications.router import router as applications_router

router = APIRouter()
router.include_router(auth_router)
router.include_router(users_router)
router.include_router(jobs_router)
router.include_router(resumes_router)
router.include_router(applications_router)
