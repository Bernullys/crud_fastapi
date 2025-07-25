from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    pass

class UserModel(UserBase):
    class Config:
        orm_mode = True

# UserModel is what you use as the response_model= in your route, because it tells FastAPI how to serialize the response (e.g., to JSON).

