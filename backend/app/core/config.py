"""Centralized, environment-driven application configuration."""
from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables / .env file."""

    model_config = SettingsConfigDict(
        env_file="../.env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    # Application
    app_name: str = "Nihongo Companion"
    app_version: str = "0.1.0"
    environment: str = "development"
    debug: bool = False

    # API
    api_v1_prefix: str = "/api/v1"
    backend_cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    # Database
    database_url: str = "postgresql+asyncpg://nihongo:nihongo@localhost:5432/nihongo"
    db_pool_size: int = 5
    db_max_overflow: int = 10
    db_echo: bool = False

    # Auth
    secret_key: str = "change-me-in-production-use-openssl-rand-hex-64"
    access_token_expire_minutes: int = 60 * 24  # 1 day
    algorithm: str = "HS256"

    # Frontend (used by backend for generating absolute URLs / CORS)
    frontend_url: str = "http://localhost:5173"


settings = Settings()