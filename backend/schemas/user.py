from typing import Optional
from sqlmodel import SQLModel, Field
from pydantic import EmailStr


class UserCreate(SQLModel):
    first_name: str
    last_name: str
    pseudo: str
    email: EmailStr
    password: str
    city: Optional[str] = None

class UserRead(SQLModel):
    id: int
    first_name: str
    last_name: str
    pseudo: str
    email: EmailStr
    city: Optional[str]
    is_admin: bool

