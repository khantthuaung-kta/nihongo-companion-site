"""Example sentence model (Japanese + Burmese)."""
from __future__ import annotations

import datetime as dt

from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Example(Base):
    __tablename__ = "examples"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    word_sense_id: Mapped[int] = mapped_column(
        Integer, nullable=False, index=True
    )
    japanese: Mapped[str] = mapped_column(Text, nullable=False)
    furigana: Mapped[str] = mapped_column(Text, nullable=False, default="")
    burmese: Mapped[str] = mapped_column(Text, nullable=False, default="")
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False
    )

    word_sense: Mapped["WordSense"] = relationship(
        "WordSense", back_populates="examples"
    )

    def __repr__(self) -> str:  # pragma: no cover - debugging only
        return f"<Example id={self.id} sense_id={self.word_sense_id}>"