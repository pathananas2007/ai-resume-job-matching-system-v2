"""Configuration module for loading environment variables"""
from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # AI Provider Configuration
    ai_provider: str = "gemini"

    # Gemini API Configuration (MUST be set via .env)
    gemini_api_key: str = ""

    # Firebase Configuration (Optional)
    firebase_project_id: str = ""
    firebase_private_key_id: str = ""
    firebase_private_key: str = ""
    firebase_client_email: str = ""
    firebase_client_id: str = ""

    # MongoDB Configuration
    mongodb_uri: str = ""
    mongodb_db_name: str = ""

    # JWT Configuration
    jwt_secret: str = "your-secret-key-change-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 10080

    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    environment: str = "development"

    # CORS Configuration
    allowed_origins: str = "http://localhost:3000,http://localhost:3001,http://localhost:5173,http://localhost:3002"
    cors_origins: str = "http://localhost:3000,http://localhost:3001,http://localhost:5173,http://localhost:3002"

    # OAuth Configuration - Google
    google_client_id: str = ""
    google_client_secret: str = ""
    google_redirect_uri: str = "http://localhost:8000/api/v1/auth/oauth/google/callback"

    # OAuth Configuration - GitHub
    github_client_id: str = ""
    github_client_secret: str = ""
    github_redirect_uri: str = "http://localhost:8000/api/v1/auth/oauth/github/callback"

    # API Configuration
    api_version: str = "v1"
    api_prefix: str = "/api"

    class Config:
        env_file = ".env"
        case_sensitive = False

    @property
    def origins_list(self) -> List[str]:
        """Convert comma-separated origins to list"""
        return [origin.strip() for origin in self.allowed_origins.split(",")]

    @property
    def is_production(self) -> bool:
        """Check if running in production"""
        return self.environment.lower() == "production"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
