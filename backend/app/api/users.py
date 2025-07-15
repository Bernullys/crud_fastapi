from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from db.session import get_db
from models.user import User
from schemas.user import UserBase, UserCreate, UserModel
from typing import Annotated, List

router = APIRouter()

@router.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.post("/users/", response_model = UserModel)
def add_user(new_user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(name = new_user.name, email = new_user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users/search/", response_model=List[UserModel])
def search_user(id: Annotated[int | None, Query()] = None,
                name: Annotated[str | None, Query()] = None,
                email: Annotated[str | None, Query()] = None,
                db: Session = Depends(get_db)):
    if id is not None:
        user_search = db.query(User).filter(User.id == id).first()
        return user_search
    if email is not None:
        user_search = db.query(User).filter(User.email == email)
        return user_search
    if name is not None:
        users_search = db.query(User).filter(User.name == name).all()
        return users_search
    return []