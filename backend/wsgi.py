"""WSGI/ASGI entrypoint for production servers (uvicorn, gunicorn)."""
from __future__ import annotations

from app.main import app

__all__ = ["app"]