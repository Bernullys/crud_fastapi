from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserSearch, UserUpdate

'''
✅ Por qué en la RUTA usas Depends(get_db) y en la FUNCIÓN CRUD solo db: Session

✔ 1. En la ruta (routers/) FastAPI necesita saber cómo obtener la sesión
Por eso escribes:
def get_users(db: Session = Depends(get_db)):

Aquí FastAPI entiende:
db es un parámetro que debe ser creado mediante get_db()

FastAPI abrirá una sesión y la cerrará automáticamente

✔ 2. En el servicio/CRUD (services/) no usas Depends

Ejemplo:

def get_all_users(db: Session):
    return db.query(User).all()

Aquí no estás dentro de FastAPI, por lo tanto:
No necesitas dependencias
Solo recibes la db que ya viene creada por la ruta

🎯 Resumen ultra corto
Lugar	    Por qué se usa
Ruta	    FastAPI necesita Depends(get_db) para crear la sesión automáticamente
Servicio	Ya recibe db: Session lista para usar, no necesita dependencias

'''

# Return all users:
def crud_get_users(db: Session):
    return db.query(User).all()

# Add users
def crud_add_users(db: Session, new_user = UserCreate):
    db_user = User(name = new_user.name, email = new_user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Search user by any attribute
def crud_search_users(db: Session, searched_user = UserSearch):
    
    user_attributes = []

    if searched_user.id is not None:
        user_attributes.append(User.id == searched_user.id)

    if searched_user.email is not None:
        user_attributes.append(User.email == searched_user.email)

    if searched_user.name is not None:
        user_attributes.append(User.name == searched_user.name)
    
    if not user_attributes:
        return []
    
    user = db.query(User).filter(*user_attributes).all()
    
    return user

# Update user name or email
def crud_update_users(db: Session, name_or_email: str, update_user = UserUpdate):
    
    user = (
        db.query(User)
        .filter((User.name == name_or_email) | (User.email == name_or_email))
        .first()
    )

    if not user:
        return None
    
    data = update_user.dict(exclude_unset=True)

    if "email" in data:
        email_exits = (
            db.query(User)
            .filter(User.email == data["email"], User.id != user.id)
            .first()
        )
        if email_exits:
            raise ValueError("Email already in use")
    
    for key, value in data.items():
        setattr(user, key, value)
    
    db.commit()
    db.refresh(user)
    return user

# Delete user by name or email
def crud_delete(db: Session, name_or_email: str):

    user = (
        db.query(User)
        .filter((User.name == name_or_email) | (User.email == name_or_email))
        .first()
    )

    if not user:
        return None
    
    db.delete(user)
    return user


