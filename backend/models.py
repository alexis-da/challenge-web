from typing import Optional, List
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    first_name: str
    last_name: str
    pseudo: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    password: str

    city: Optional[str] = None
    is_admin: bool = False

    # Relations
    posts: List["Post"] = Relationship(back_populates="user")
    reviews: List["Review"] = Relationship(back_populates="reviewer")
    messages: List["Message"] = Relationship(back_populates="user")

class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

    posts: List["Post"] = Relationship(back_populates="category")

class Post(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    title: str
    description: str
    price: float
    city: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    user_id: int = Field(foreign_key="user.id")
    category_id: int = Field(foreign_key="category.id")

    # Relations
    user: User = Relationship(back_populates="posts")
    category: Category = Relationship(back_populates="posts")
    photos: List["Photo"] = Relationship(back_populates="post")
    reviews: List["Review"] = Relationship(back_populates="post")
    chats: List["Chat"] = Relationship(back_populates="post")

class Photo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    post_id: int = Field(foreign_key="post.id")
    link: str

    post: Post = Relationship(back_populates="photos")

class Review(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    reviewer_id: int = Field(foreign_key="user.id")
    post_id: int = Field(foreign_key="post.id")

    review: str
    rating: int = Field(ge=1, le=5)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    reviewer: User = Relationship(back_populates="reviews")
    post: Post = Relationship(back_populates="reviews")

class Chat(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    buyer_id: int = Field(foreign_key="user.id")
    post_id: int = Field(foreign_key="post.id")

    messages: List["Message"] = Relationship(back_populates="chat")
    post: Post = Relationship(back_populates="chats")

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    chat_id: int = Field(foreign_key="chat.id")
    user_id: int = Field(foreign_key="user.id")

    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    chat: Chat = Relationship(back_populates="messages")
    user: User = Relationship(back_populates="messages")
