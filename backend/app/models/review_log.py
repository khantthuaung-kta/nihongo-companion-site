"""Review log model (history of each flashcard review)."""
from __future__ import annotations

import datetime as dt

from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ReviewLog(Base):
    __tablename__ = "review_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    flashcard_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    quality: Mapped[int] = mapped_column(Integer, nullable=False)
    box_before: Mapped[int] = mapped_column(Integer, nullable=False)
    box_after: Mapped[int] = mapped_column(Integer, nullable=False)
    reviewed_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False, index=True
    )

    flashcard: Mapped["Flashcard"] = relationship("Flashcard", back_populates="review_logs")

    def __repr__(self) -> str:  # pragma: no cover - debugging only
        return f"<ReviewLog id={self.id} flashcard_id={self.flashcard_id} quality={self.quality}>"