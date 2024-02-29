#!/usr/bin/python3
""" User view """
from api.views.__init__ import app_views
from flask import jsonify
from models import storage
from models.category import Category
from models.order_items import OrderItem
from models.order import Order
from models.product import Product
from models.user import User


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def objects_stats():
    """ Retrieves the number of each objects by type """
    classes = {
    "Category": Category, "Product": Product, 
    "OrderItem": OrderItem, "Order": Order,
    "User": User
    }

    stats = {}
    for key, value in classes.items():
        stats[key] = storage.count(value)

    return jsonify(stats)
