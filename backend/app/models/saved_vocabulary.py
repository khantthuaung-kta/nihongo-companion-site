"""Saved vocabulary model (user owns saved words)."""
from __future__ import annotations

import datetime as dt

from sqlalchemy import Column, DateTime, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class SavedVocabulary(Base):
    __tablename__ = "saved_vocabularies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    vocabulary_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    note: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False
    )

    user: Mapped["User"] = relationship("User", back_populates="saved_vocabularies")
    vocabulary: Mapped["Vocabulary"] = relationship(
        "Vocabulary", back_populates="saved_vocabularies"
    )

    __table_args__ = (
        UniqueConstraint("user_id", "vocabulary_id", name="uq_saved_vocab_user_vocab"),
    )

    def __repr__(self) -> str:  # pragma: no cover - debugging only
        return f"<SavedVocabulary id={self.id} user_id={self.user_id} vocab_id={self.vocabulary_id}>"