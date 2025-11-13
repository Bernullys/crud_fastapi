from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import timedelta
from typing import Annotated
from sqlalchemy.orm import Session
from app.schemas.app_users import AppUserCreate, AppUserResponse
from app.schemas.token import Token
from app.db.session import get_db
from app.core.config import settings
from app.core.auth import hash_password, authenticate_app_user, create_access_token
from app.utils.helpers import get_all_app_users, add_app_user_to_db

router = APIRouter()

# Flow 1 - Add app users to db: Import AppUserCreate and AppUserResponse
# Flow 1 - Add app users to db: Register endpoint to create a new app user:
@router.post("/register/", response_model = AppUserResponse)
def register_app_user(app_user: AppUserCreate, db: Session = Depends(get_db)):
    existing_app_user = get_all_app_users(app_user.email, db)
    
    if existing_app_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(app_user.password)
    app_user.password = hashed_password
    
    return add_app_user_to_db(app_user, db)


# Flow 2 - Return token: OAuth2 scheme for token authentication:
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/")

# Flow 2 - Return token: Path function to login
@router.post("/login/", response_model=Token)
async def token_for_login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    user = authenticate_app_user(form_data.username, form_data.password, get_db)
    
    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Incorrect username or password",
            headers = {"WWW-Authenticate": "Bearer"}
        )
    
    access_token_expires = timedelta(minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta = access_token_expires)
    
    return Token(access_token = access_token, token_type = "bearer")