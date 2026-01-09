from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from models import User
from schemas.user import UserCreate, UserRead, UserLogin
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
        password=user_data.password,  
        city=user_data.city
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    session: Session = Depends(get_session)
):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Utilisateur non trouvé"
        )

    session.delete(user)
    session.commit()
@router.post("/login", response_model = UserRead)
def login(
    user_login : UserLogin, 
    session : Session = Depends(get_session)
) -> User | None:
    target_email = session.exec(
        select(User.email).where(User.email == user_login.email)
    ).first()

    if (target_email == None):
        raise HTTPException(
            status_code=200,
            detail="Conte introuvable"
        )
    
    target_password = session.exec(
        select(User.password).where(User.email == target_email)
    ).first()

    if (target_password != user_login.password):
        raise HTTPException(
            status_code=200,
            detail="Mot de passe invalide"
        )
    else:
        logged_user = session.exec(
            select(User).where(User.email == user_login.email)
        ).first()
        return(
            logged_user 
        )

    
