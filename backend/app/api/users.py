from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from models.user import User
from schemas.user import UserBase, UserCreate, UserModel

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