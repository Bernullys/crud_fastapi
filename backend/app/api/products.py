from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from models.products import Products
from schemas.products import ProductsBase, ProductsCreate, ProductsModel

router = APIRouter()

@router.get("/products/")
def get_products(db: Session = Depends(get_db)):
    return db.query(Products).all()