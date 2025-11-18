from fastapi import APIRouter, Depends, Query, Path, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserBase, UserCreate, UserModel
from typing import Annotated, List
from app.core.auth import get_current_app_user

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
def search_user(
    id: Annotated[int | None, Query()] = None,
    name: Annotated[str | None, Query()] = None,
    email: Annotated[str | None, Query()] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_app_user)
):
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

@router.patch("/users/update/{name_or_email}/{current_name_or_email}/{new_name_or_email}")
def update_user(name_or_email: str,
                current_name_or_email: str,
                new_name_or_email: str,
                db: Session = Depends(get_db)):
    if name_or_email not in ["name", "email"]:
        raise HTTPException(status_code=400, detail="name_or_email must be 'name' or 'email'")
    if name_or_email == "name":
        user = db.query(User).filter(User.name == current_name_or_email).first()
        if not user:
            raise HTTPException(status_code=400, detail="Not user found with that name")
        user.name = new_name_or_email
    elif name_or_email == "email":
        user = db.query(User).filter(User.email == current_name_or_email).first()
        if not user:
            raise HTTPException(status_code=400, detail="Not user found with that email")
        user.email = new_name_or_email
    
    db.commit()
    db.refresh(user)
    return user


@router.delete("/users/delete/{name_or_email}/{delete_param}")
def delete_user(name_or_email: str,
                delete_param: str,
                 db: Session = Depends(get_db)):
    if name_or_email == "name":
        user = db.query(User).filter(User.name == delete_param).delete()
        if not user:
            raise HTTPException(status_code=404, detail="Not user with that name")
    elif name_or_email == "email":
        user = db.query(User).filter(User.email == delete_param).delete()
        if not user:
            raise HTTPException(status_code=404, detail="Not user with that email")
    db.commit()
    return {"Message": "User has been deleted"}