from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from models import Post
from schemas.post import PostCreate, PostRead
from db import get_session

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.get("/", response_model=list[PostRead])
def get_posts(session: Session = Depends(get_session)):
    posts = session.exec(select(Post)).all()
    return posts


@router.post("/", response_model=PostRead, status_code=status.HTTP_201_CREATED)
def create_post(
    post_data: PostCreate,
    session: Session = Depends(get_session)
):
    # Vérification que l'utilisateur existe
    from models import User
    user = session.exec(select(User).where(User.id == post_data.user_id)).first()
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Utilisateur non trouvé"
        )

    # Vérification que la catégorie existe
    from models import Category
    category = session.exec(select(Category).where(Category.id == post_data.category_id)).first()
    if not category:
        raise HTTPException(
            status_code=400,
            detail="Catégorie non trouvée"
        )

    post = Post(
        title=post_data.title,
        description=post_data.description,
        price=post_data.price,
        city=post_data.city,
        user_id=post_data.user_id,
        category_id=post_data.category_id,
        is_active=post_data.is_active
    )

    session.add(post)
    session.commit()
    session.refresh(post)

    return post


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(
    post_id: int,
    session: Session = Depends(get_session)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post non trouvé"
        )

    session.delete(post)
    session.commit()