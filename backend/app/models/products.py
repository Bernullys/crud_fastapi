from sqlalchemy import Column, Integer, String, Numeric
from app.db.base import Base

class Products(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    price = Column(Numeric(7,2),  index=False)
    stock = Column(Integer, nullable=False)
    category = Column(String(100), nullable=True)
