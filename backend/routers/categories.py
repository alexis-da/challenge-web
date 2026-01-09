from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from models import Category
from schemas.category import CategoryCreate, CategoryRead
from db import get_session

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("/", response_model=list[CategoryRead])
def get_categories(session: Session = Depends(get_session)):
    categories = session.exec(select(Category)).all()
    return categories


@router.post("/", response_model=CategoryRead, status_code=status.HTTP_201_CREATED)
def create_category(
    category_data: CategoryCreate,
    session: Session = Depends(get_session)
):
    # Vérification unicité du nom
    existing_category = session.exec(
        select(Category).where(Category.name == category_data.name)
    ).first()

    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Nom de catégorie déjà utilisé"
        )

    category = Category(name=category_data.name)

    session.add(category)
    session.commit()
    session.refresh(category)

    return category


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(
    category_id: int,
    session: Session = Depends(get_session)
):
    category = session.get(Category, category_id)
    if not category:
        raise HTTPException(
            status_code=404,
            detail="Catégorie non trouvée"
        )

    session.delete(category)
    session.commit()