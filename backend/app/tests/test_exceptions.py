"""Tests for centralized exception handling."""
from __future__ import annotations

import pytest
from fastapi import FastAPI
from httpx import AsyncClient

from app.core.exceptions import AppException, register_exception_handlers


@pytest.mark.asyncio
async def test_app_exception_handler() -> None:
    test_app = FastAPI()
    register_exception_handlers(test_app)

    @test_app.get("/_test/app-exception")
    async def _raise() -> None:
        raise AppException("Something went wrong", status_code=409)

    async with AsyncClient(app=test_app, base_url="http://testserver") as client:
        response = await client.get("/_test/app-exception")

    assert response.status_code == 409
    assert response.json()["detail"] == "Something went wrong"


@pytest.mark.asyncio
async def test_validation_error_handler() -> None:
    from pydantic import BaseModel, field_validator

    from app.schemas import UserCreate

    test_app = FastAPI()
    register_exception_handlers(test_app)

    class Body(BaseModel):
        email: str

        @field_validator("email")
        @classmethod
        def _v(cls, v: str) -> str:
            if "@" not in v:
                raise ValueError("Invalid email")
            return v

    @test_app.post("/_test/validate")
    async def _validate(body: Body) -> dict:
        return {"ok": True}

    async with AsyncClient(app=test_app, base_url="http://testserver") as client:
        response = await client.post("/_test/validate", json={"email": "bad"})

    assert response.status_code == 422
    body = response.json()
    assert body["detail"] == "Validation error"
    assert body["errors"][0]["loc"][-1] == "email"