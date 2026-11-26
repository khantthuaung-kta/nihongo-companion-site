"""Word sense model (one vocabulary entry may have multiple senses)."""
from __future__ import annotations

import datetime as dt

from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class WordSense(Base):
    __tablename__ = "word_senses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    vocabulary_id: Mapped[int] = mapped_column(
        Integer, nullable=False, index=True
    )
    part_of_speech: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    reading: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    meaning_en: Mapped[str] = mapped_column(Text, nullable=False, default="")
    meaning_mm: Mapped[str] = mapped_column(Text, nullable=False, default="")
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False
    )

    vocabulary: Mapped["Vocabulary"] = relationship(
        "Vocabulary", back_populates="senses"
    )
    translations: Mapped[list["BurmeseTranslation"]] = relationship(
        "BurmeseTranslation", back_populates="word_sense",
        cascade="all, delete-orphan",
    )
    examples: Mapped[list["Example"]] = relationship(
        "Example", back_populates="word_sense", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:  # pragma: no cover - debugging only
        return f"<WordSense id={self.id} vocab_id={self.vocabulary_id}>"