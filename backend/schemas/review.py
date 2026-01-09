from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel
from pydantic import Field


class ReviewCreate(SQLModel):
    reviewer_id: int
    post_id: int
    review: str
    rating: int = Field(ge=1, le=5)


class ReviewRead(SQLModel):
    id: int
    reviewer_id: int
    post_id: int
    review: str
    rating: int
    created_at: datetime