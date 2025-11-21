from fastapi import APIRouter, Depends, Query, Path, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserBase, UserCreate, UserModel, UserSearch, UserUpdate
from typing import Annotated, List
from app.core.auth import get_current_app_user
from app.crud.users import crud_get_users, crud_add_users, crud_search_users, crud_update_users, crud_delete

router = APIRouter()

@router.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return crud_get_users(db)


@router.post("/users/add/", response_model = UserModel)
def add_user(new_user: UserCreate, db: Session = Depends(get_db)):
    return crud_add_users(db, new_user)


@router.get("/users/search/", response_model=List[UserModel])
def search_user(
    id: Annotated[int | None, Query()] = None,
    name: Annotated[str | None, Query()] = None,
    email: Annotated[str | None, Query()] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_app_user)
):
    search_data = UserSearch(id = id, name = name, email = email)

    return crud_search_users(db, search_data)


@router.patch("/users/update/{name_or_email}", response_model=UserModel)
def update_user_route(
    name_or_email: str,
    update_data: UserUpdate,
    db: Session = Depends(get_db)
):
    try:
        updated_user = crud_update_users(db, name_or_email, update_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    if not updated_user:
        raise HTTPException(status_code=400, detail="User not found")
    
    return updated_user
    


@router.delete("/users/delete/{name_or_email}")
def delete_user(
    name_or_email: str,
    db: Session = Depends(get_db)
):
    user = crud_delete(db, name_or_email)

    if not user:
        raise HTTPException(status_code=404, detail="Not user with that name or email")
    
    db.commit()

    return {"Message": "User has been deleted"}