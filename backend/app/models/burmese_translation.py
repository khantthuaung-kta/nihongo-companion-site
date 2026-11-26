"""Burmese translation model for a word sense."""
from __future__ import annotations

import datetime as dt

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class BurmeseTranslation(Base):
    __tablename__ = "burmese_translations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    word_sense_id: Mapped[int] = mapped_column(
        Integer, nullable=False, index=True
    )
    translation_mm: Mapped[str] = mapped_column(Text, nullable=False)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False
    )

    word_sense: Mapped["WordSense"] = relationship(
        "WordSense", back_populates="translations"
    )

    def __repr__(self) -> str:  # pragma: no cover - debugging only
        return f"<BurmeseTranslation id={self.id} sense_id={self.word_sense_id}>"