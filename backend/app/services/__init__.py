"""Business-logic services."""
from __future__ import annotations

from app.core.exceptions import AppException
from app.schemas import UserCreate


class AuthService:
    """Placeholder authentication service."""

    @staticmethod
    def validate_credentials(payload: UserCreate) -> None:
        if payload.email == "taken@example.com":
            raise AppException("Email already registered", status_code=409)