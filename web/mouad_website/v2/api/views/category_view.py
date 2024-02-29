#!/usr/bin/python3
""" User view """
from models import storage
from models.category import Category
from api.views.__init__ import app_views
from flask import jsonify, abort, make_response, request


@app_views.route('/categories', methods=['GET'], strict_slashes=False)
def get_categories():
    """
    Retrieves the list of all user objects
    or a specific user
    """
    return jsonify([category.to_dict() for category in storage.all(Category).values()])


@app_views.route('categories/<int:category_id>/products', methods=['GET'], strict_slashes=False)
def get_products_by_category(category_id):
    """
    Retrieves the list of all user objects
    or a specific user
    """
    category = storage.get_by_id(Category, category_id)
    if not category:
        abort(400,  description="Category does not exists")
    products = storage.get_products_by_category(category_id)
    return jsonify([product.to_dict() for product in products])
