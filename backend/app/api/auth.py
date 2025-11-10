from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
import jwt
from jwt.exceptions import InvalidTokenError
# from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, timedelta, timezone
from typing import Annotated
from app.schemas.app_users import AppUserCreate, AppUserResponse

router = APIRouter()

# Flow 1 - Add app users to db: Import AppUserCreate and AppUserResponse

# Flow 1 - Add app users to db: Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Flow 2 - Return token: Utility function to hash passwords
def hash_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# Flow 1 - Add app users to db: Register endpoint to create a new app user:
@router.post("/register/", response_model = AppUserResponse)
def register_app_user(app_user: AppUserCreate):
    existing_app_user = get_all_app_users(app_user.email)
    if existing_app_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = hash_password(app_user.password)
    app_user.password = hashed_password
    return add_app_user_to_db(app_user)