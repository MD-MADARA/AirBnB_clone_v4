#!/usr/bin/python3
"""
Contains the class DBStorage
"""

from models.base_model import Base
from models.order_items import OrderItem
from models.order import Order
from models.product import Product
from models.user import User
from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {
    "Product": Product, "OrderItem": OrderItem,
    "Order": Order, "User": User
}


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instatntiates database engine"""
        user = getenv('HBNB_MYSQL_USER')
        password = getenv('HBNB_MYSQL_PWD')
        host_name = getenv('HBNB_MYSQL_HOST')
        db_name = getenv('HBNB_MYSQL_DB')
        db_url = f"mysql+mysqldb://{user}:{password}@{host_name}/{db_name}"

        self.__engine = create_engine(db_url, pool_pre_ping=True)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        i = 1
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = f'(N°{i}) ' + obj.__class__.__name__ + '.' + str(obj.id)
                    new_dict[key] = obj
                    i += 1
        return (new_dict)

    def count(self, cls=None):
        """count all classes"""
        cpt = 0
        for clss in classes:
            if cls is None or cls is classes[clss]:
                objs = self.__session.query(classes[clss]).all()
                cpt += len(objs)
        return cpt

    def get_by_id(self, cls, id):
        """get object by class and id"""
        for clss in classes:
            if cls is classes[clss]:
                result = self.__session.query(cls).filter(cls.id == id).first()
                if result:
                    return result
        return None
    
    def get_user_by_email(self, email):
        """get user by email"""
        user = self.__session.query(User).filter(User.email == email).first()
        if user:
            return user
        return None


    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()
