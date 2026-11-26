"""Initial schema: users + vocabularies tables."""
from __future__ import annotations

import datetime as dt

from alembic import op
import sqlalchemy as sa


revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("display_name", sa.String(length=120), nullable=False, server_default="Learner"),
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.text("CURRENT_TIMESTAMP"),
        ),
        sa.UniqueConstraint("email", name="uq_users_email"),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=False)

    op.create_table(
        "vocabularies",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("jisho", sa.String(length=255), nullable=False),
        sa.Column("furigana", sa.String(length=255), nullable=False, server_default=""),
        sa.Column("romaji", sa.String(length=255), nullable=False, server_default=""),
        sa.Column("meaning_en", sa.Text(), nullable=False, server_default=""),
        sa.Column("meaning_mm", sa.Text(), nullable=False, server_default=""),
        sa.Column("level", sa.String(length=16), nullable=False, server_default="N5"),
        sa.Column("part_of_speech", sa.String(length=120), nullable=False, server_default=""),
    )
    op.create_index("ix_vocabularies_jisho", "vocabularies", ["jisho"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_vocabularies_jisho", table_name="vocabularies")
    op.drop_table("vocabularies")
    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")