from fastapi import APIRouter, Depends, Query, Path
from sqlalchemy.orm import Session
from db.session import get_db
from models.user import User
from schemas.user import UserBase, UserCreate, UserModel, UserUpdate
from typing import Annotated, List

router = APIRouter()

@router.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.post("/users/add/", response_model = UserModel)
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
    user_attrubutes = []
    if id is not None:
        user_attrubutes.append(User.id == id)
    if email is not None:
        user_attrubutes.append(User.email == email)    
    if name is not None:
        user_attrubutes.append(User.name == name)
    
    if not user_attrubutes:
        return []
    
    user_s = db.query(User).filter(*user_attrubutes).all()
    return user_s

@router.patch("/users/update/{new_param}", response_model=UserModel)
def update_user(new_param: Annotated[str, Path()],
                user_update: UserUpdate,
                db: Session = Depends(get_db)):
    old_user = db.query(User).filter(id, name, email).all()
    if name:
        new_user = old_user.name = new_param
    if email:
        new_user = old_user.email = new_param
    return [new_user]