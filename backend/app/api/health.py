"""Health check endpoints."""
from __future__ import annotations

from fastapi import APIRouter, status

from app.core.config import settings

router = APIRouter(tags=["health"])


@router.get("/health", status_code=status.HTTP_200_OK)
async def health() -> dict:
    """Liveness probe - returns static application metadata."""
    return {
        "status": "ok",
        "app": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
    }


@router.get("/ready", status_code=status.HTTP_200_OK)
async def ready() -> dict:
    """Readiness probe - basic readiness signal."""
    return {"status": "ready"}