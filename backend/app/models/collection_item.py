"""Collection item (vocabulary inside a collection)."""
from __future__ import annotations

import datetime as dt

from sqlalchemy import Column, DateTime, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class CollectionItem(Base):
    __tablename__ = "collection_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    collection_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    vocabulary_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime, default=dt.datetime.utcnow, nullable=False
    )

    collection: Mapped["Collection"] = relationship("Collection", back_populates="items")
    vocabulary: Mapped["Vocabulary"] = relationship("Vocabulary")

    __table_args__ = (
        UniqueConstraint("collection_id", "vocabulary_id", name="uq_collection_item_vocab"),
    )

    def __repr__(self) -> str:  # pragma: no cover - debugging only
        return f"<CollectionItem id={self.id} collection_id={self.collection_id} vocab_id={self.vocabulary_id}>"