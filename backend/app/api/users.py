from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from models.user import User

router = APIRouter()

@router.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

