from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel
from pydantic import BaseModel


class PostCreate(SQLModel):
    title: str
    description: str
    price: float
    city: str
    user_id: int
    category_id: int
    is_active: Optional[bool] = True


class PostRead(SQLModel):
    id: int
    title: str
    description: str
    price: float
    city: str
    is_active: bool
    created_at: datetime
    user_id: int
    category_id: int
    user_email: str