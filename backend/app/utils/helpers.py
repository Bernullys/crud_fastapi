from sqlalchemy.orm import Session
from app.models.app_users import AppUser
from app.schemas.app_users import AppUserCreate

# Function to check the existing emails in the database so when someone creates an app user don't have the same email.

def get_all_app_users(email: str, db: Session):
    return db.query(AppUser).filter(AppUser.email == email).first()

# Function to add an app user to the database, using the /register endpoint.

def add_app_user_to_db(new_app_user: AppUserCreate, db: Session):
    app_user = AppUser(name = new_app_user.name,
                       email = new_app_user.email,
                       user_name = new_app_user.user_name,
                        password = new_app_user.password )
    db.add(app_user)
    db.commit()
    db.refresh(app_user)
    return app_user