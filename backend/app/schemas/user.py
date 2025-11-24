from pydantic import BaseModel, EmailStr
from typing import Optional

# Original Base
class UserBase(BaseModel):
    name: str
    email: EmailStr

# Base to Create
class UserCreate(UserBase):
    pass

# UserModel is what you use as the response_model = in your route.
# Because it tells FastAPI how to serialize the response to the frontend (e.g., to JSON).
class UserModel(UserBase):
    id: int

    class Config:
        orm_mode = True

# Schema for search:
class UserSearch(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    email: Optional[EmailStr] = None

    class Config:
        orm_mode = True


# Schema for updates:
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None