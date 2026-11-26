"""Aggregate all models so Alembic sees the full metadata."""
from __future__ import annotations

from app.db.base import Base
from app.models.admin_audit_log import AdminAuditLog
from app.models.burmese_translation import BurmeseTranslation
from app.models.collection import Collection
from app.models.collection_item import CollectionItem
from app.models.example import Example
from app.models.flashcard import Flashcard
from app.models.review_log import ReviewLog
from app.models.saved_vocabulary import SavedVocabulary
from app.models.study_session import StudySession
from app.models.user import User
from app.models.vocabulary import Vocabulary
from app.models.word_sense import WordSense

__all__ = [
    "AdminAuditLog",
    "Base",
    "BurmeseTranslation",
    "Collection",
    "CollectionItem",
    "Example",
    "Flashcard",
    "ReviewLog",
    "SavedVocabulary",
    "StudySession",
    "User",
    "Vocabulary",
    "WordSense",
]