from passlib.context import CryptContext
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from models.app_users import AppUser
from core.config import settings

# Flow 1 - Add app users to db: Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Flow 1 - Add app users to db: Utility function to hash password
def hash_password(plain_password):
    return pwd_context.hash(plain_password)

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