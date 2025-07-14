from pydantic import BaseModel

class ProductsBase(BaseModel):
    name: str
    price: float
    stock: int
    category: str

class ProductsCreate(ProductsBase):
    pass

class ProductsModel(ProductsBase):
    class Config:
        orm_mode = True