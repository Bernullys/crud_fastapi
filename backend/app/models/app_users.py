from sqlalchemy import Column, Integer, String
from app.db.base import Base

class AppUser(Base):
    __tablename__ = "app_users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    user_name = Column(String(10), nullable=False)
    hashed_password = Column(String(255), nullable=False)