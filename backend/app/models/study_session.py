"""Study session model (aggregates review events per user)."""
from __future__ import annotations

import datetime as dt

from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class StudySession(Base):
    __tablename__ = "study_sessions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    mode: Mapped[str] = mapped_column(String(32), nullable=False, default="flashcard")
    cards_reviewed: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    correct_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    duration_seconds: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    started_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False, index=True
    )

    user: Mapped["User"] = relationship("User", back_populates="study_sessions")

    def __repr__(self) -> str:  # pragma: no cover - debugging only
        return f"<StudySession id={self.id} user_id={self.user_id} mode={self.mode!r}>"