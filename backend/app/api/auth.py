from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
import jwt
from jwt.exceptions import InvalidTokenError
# from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, timedelta, timezone
from typing import Annotated
from models.app_users import AppUser
from schemas.app_users import AppUserCreate, AppUserResponse
from sqlalchemy.orm import Session
from utils.helpers import get_all_app_users, add_app_user_to_db
from db.session import get_db

router = APIRouter()

# Flow 1 - Add app users to db: Import AppUserCreate and AppUserResponse

# Flow 1 - Add app users to db: Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Flow 1 - Add app users to db: Utility function to hash password
def hash_password(plain_password):
    return pwd_context.hash(plain_password)

# Flow 1 - Add app users to db: Register endpoint to create a new app user:
@router.post("/register/", response_model = AppUserResponse)
def register_app_user(app_user: AppUserCreate, db: Session = Depends(get_db)):
    existing_app_user = get_all_app_users(app_user.email, db)
    if existing_app_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = hash_password(app_user.password)
    app_user.password = hashed_password
    return add_app_user_to_db(app_user, db)


# Flow 2 - Return token: Utility function to verify passwords
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Flow 2 - Return token: Utility function to authenticate users:
def authenticate_app_user(app_user_name: str, password: str):
    if get_all_app_users(app_user_name.user_name) == False:
        return False
    user = get_user(app_user_name)
    if not verify_password(password, user["password"]):
        return False
    return user


'''
Excelente 🔐 — estás avanzando con la autenticación por JWT, y tu idea es correcta, pero la función authenticate_app_user necesita algunos ajustes para funcionar correctamente con SQLAlchemy, tu esquema de usuarios, y el contexto de hashing de contraseñas.

Vamos paso a paso 👇

🚫 Problemas en tu función actual

Confusión de parámetros:

Estás recibiendo app_user_name: str pero lo tratas como si fuera un objeto con .user_name.

Lo correcto sería pasar dos parámetros: user_name y password.

get_all_app_users no devuelve False, sino un usuario o None.

Por lo tanto, debes chequear if not user: en lugar de == False.

No estás pasando la sesión de base de datos (db: Session).

La consulta a la base de datos la haces con SQLAlchemy, por lo que necesitas db como argumento.

get_user no está definido, pero ya puedes reutilizar get_all_app_users o crear una función get_user_by_username.

✅ Versión correcta y funcional

Suponiendo que:

Tienes un campo user_name en tu modelo.

Ya tienes configurado pwd_context (por ejemplo, de passlib.context import CryptContext).

La función se usará para autenticar antes de generar el JWT.

utils/security.py
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from models.app_users import AppUser
from crud.app_users import get_all_app_users  # o una función get_user_by_username

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Verifica si la contraseña en texto plano coincide con la hash
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Función para autenticar al usuario
def authenticate_app_user(user_name: str, password: str, db: Session):
    # Buscar usuario por nombre de usuario
    user = db.query(AppUser).filter(AppUser.user_name == user_name).first()
    
    if not user:
        return None  # Usuario no encontrado

    if not verify_password(password, user.password):
        return None  # Contraseña incorrecta

    return user  # Retorna el objeto de usuario si todo está bien

🧠 Cómo usarla en tu endpoint de login
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.session import get_db
from utils.security import authenticate_app_user, create_access_token  # esta última genera el JWT
from schemas.auth import LoginRequest, TokenResponse

router = APIRouter()

@router.post("/login/", response_model=TokenResponse)
def login_for_access_token(form_data: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_app_user(form_data.user_name, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    access_token = create_access_token({"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

🔐 create_access_token (para completar el flujo JWT)

Por si todavía no la tienes:

from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "tu_clave_secreta_aqui"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

✅ En resumen

Tu función debería verse así:

def authenticate_app_user(user_name: str, password: str, db: Session):
    user = db.query(AppUser).filter(AppUser.user_name == user_name).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user
'''