from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import JWTError, jwt
from jwt.exceptions import InvalidTokenError
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Annotated
from app.models.app_users import AppUser
from app.core.config import settings
from app.schemas.token import TokenData
from app.utils.helpers import get_app_users_by_username
from app.db.session import get_db

# Flow 1 - Add app users to db: Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Flow 1 - Add app users to db: Utility function to hash password
def hash_password(plain_password):
    return pwd_context.hash(plain_password)

# Flow 2 - Return token: OAuth2 scheme for token authentication:
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/")

# Flow 2 - Return token: Utility function to verify passwords
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Flow 2 - Return token: Utility function to authenticate users:
def authenticate_app_user(user_name: str, password: str, db: Session):
    user = db.query(AppUser).filter(AppUser.user_name == user_name).first()

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None
    
    return user

# Flow 2 - Return token: Function to create JWT token
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    return encoded_jwt

# Flow 3 - Authenticate routes by user: function to return the current user from the token.
async def get_current_app_user(
        token: Annotated[str, Depends(oauth2_scheme)],
        db: Annotated[Session, Depends(get_db)]
    ):
    
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Could not validate credentials",
        headers = {"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms = [settings.ALGORITHM])
        app_user_name = payload.get("sub")

        if app_user_name is None:
            raise credentials_exception
        
        token_data = TokenData(username = app_user_name)

    except InvalidTokenError as e:
        token_decode_failed = e
        raise credentials_exception
    
    user = get_app_users_by_username(app_user_name=token_data.username, db=db) # Here I have doubts

    if user is None:
        raise credentials_exception
    
    return user