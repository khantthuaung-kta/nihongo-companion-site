"""Vocabulary entry model (a Japanese word/phrase)."""
from __future__ import annotations

import datetime as dt

from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Vocabulary(Base):
    __tablename__ = "vocabularies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    jisho: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    furigana: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    romaji: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    level: Mapped[str] = mapped_column(String(16), nullable=False, default="N5")
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False
    )

    senses: Mapped[list["WordSense"]] = relationship(
        "WordSense", back_populates="vocabulary", cascade="all, delete-orphan"
    )
    saved_vocabularies: Mapped[list["SavedVocabulary"]] = relationship(
        "SavedVocabulary", back_populates="vocabulary", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:  # pragma: no cover - debugging only
        return f"<Vocabulary id={self.id} jisho={self.jisho!r}>"