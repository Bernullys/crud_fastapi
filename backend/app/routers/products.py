from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.products import Products
from app.schemas.products import ProductsBase, ProductsCreate, ProductsModel

router = APIRouter()

@router.get("/products/")
def get_products(db: Session = Depends(get_db)):
    return db.query(Products).all()