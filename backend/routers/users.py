from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from models import User
from schemas.user import UserCreate, UserRead
from db import get_session

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/", response_model=list[UserRead])
def get_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()
    return users


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(
    user_data: UserCreate,
    session: Session = Depends(get_session)
):
    # Vérification unicité email / pseudo
    existing_user = session.exec(
        select(User).where(
            (User.email == user_data.email) |
            (User.pseudo == user_data.pseudo)
        )
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email ou pseudo déjà utilisé"
        )

    user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        pseudo=user_data.pseudo,
        email=user_data.email,
        password=user_data.password,  # ⚠️ à hasher plus tard
        city=user_data.city
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return user
