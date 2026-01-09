from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from models import Review, User, Post
from schemas.review import ReviewCreate, ReviewRead
from db import get_session

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.get("/", response_model=list[ReviewRead])
def get_reviews(session: Session = Depends(get_session)):
    reviews = session.exec(select(Review)).all()
    return reviews


@router.post("/", response_model=ReviewRead, status_code=status.HTTP_201_CREATED)
def create_review(
    review_data: ReviewCreate,
    session: Session = Depends(get_session)
):
    # Vérification que le reviewer existe
    reviewer = session.exec(select(User).where(User.id == review_data.reviewer_id)).first()
    if not reviewer:
        raise HTTPException(
            status_code=400,
            detail="Reviewer non trouvé"
        )

    # Vérification que le post existe
    post = session.exec(select(Post).where(Post.id == review_data.post_id)).first()
    if not post:
        raise HTTPException(
            status_code=400,
            detail="Post non trouvé"
        )

    # Vérification que le reviewer n'a pas déjà reviewé ce post
    existing_review = session.exec(
        select(Review).where(
            (Review.reviewer_id == review_data.reviewer_id) &
            (Review.post_id == review_data.post_id)
        )
    ).first()

    if existing_review:
        raise HTTPException(
            status_code=400,
            detail="Vous avez déjà reviewé ce post"
        )

    review = Review(
        reviewer_id=review_data.reviewer_id,
        post_id=review_data.post_id,
        review=review_data.review,
        rating=review_data.rating
    )

    session.add(review)
    session.commit()
    session.refresh(review)

    return review


@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(
    review_id: int,
    session: Session = Depends(get_session)
):
    review = session.get(Review, review_id)
    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review non trouvée"
        )

    session.delete(review)
    session.commit()