from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    pass

# UserModel is what you use as the response_model= in your route, because it tells FastAPI how to serialize the response (e.g., to JSON).
class UserModel(UserBase):
    class Config:
        orm_mode = True


# Schema for updates:
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None