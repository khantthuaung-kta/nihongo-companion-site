"""Flashcard model (spaced repetition state per user)."""
from __future__ import annotations

import datetime as dt

from sqlalchemy import Column, DateTime, Float, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Flashcard(Base):
    __tablename__ = "flashcards"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    vocabulary_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    box: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    ease_factor: Mapped[float] = mapped_column(default=2.5, nullable=False)
    interval_days: Mapped[int] = mapped_column(default=0, nullable=False)
    next_review_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False, index=True
    )
    last_reviewed_at: Mapped[dt.datetime | None] = mapped_column(
        DateTime, nullable=True, default=None
    )
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False
    )

    user: Mapped["User"] = relationship("User", back_populates="flashcards")
    review_logs: Mapped[list["ReviewLog"]] = relationship(
        "ReviewLog", back_populates="flashcard", cascade="all, delete-orphan"
    )

    __table_args__ = (
        UniqueConstraint("user_id", "vocabulary_id", name="uq_flashcard_user_vocab"),
    )

    def __repr__(self) -> str:  # pragma: no cover - debugging only
        return f"<Flashcard id={self.id} user_id={self.user_id} vocab_id={self.vocabulary_id} box={self.box}>"