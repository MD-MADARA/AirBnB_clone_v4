#!/usr/bin/python3
""" holds class Category"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Category(BaseModel, Base):
    """Representation of a Category """
    __tablename__ = 'categories'
    type = Column(String(128), nullable=False)
    name = Column(String(128), nullable=False)
    products = relationship("Product", backref="category")
