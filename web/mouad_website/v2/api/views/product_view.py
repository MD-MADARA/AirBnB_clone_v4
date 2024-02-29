#!/usr/bin/python3
""" User view """
from models import storage
from models.product import Product
from api.views.__init__ import app_views
from flask import jsonify, abort, make_response, request


@app_views.route('/products/<int:id>', methods=['GET'], strict_slashes=False)
@app_views.route('/products', methods=['GET'], strict_slashes=False)
def get_products(id=None):
    """
    Retrieves the list of all user objects
    or a specific user
    """
    if id:
        product = storage.get_by_id(Product, id)
        if not product:
            abort(404)
        return jsonify(product.to_dict())
    else:
        return jsonify([product.to_dict() for product in storage.all(Product).values()])



@app_views.route('/products/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_product(id):
    """
    Deletes a user Object
    """
    product = storage.get_by_id(Product, id)
    if not product:
        abort(404)

    product.delete()
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/products', methods=['POST'], strict_slashes=False)
def post_product():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    if 'brand' not in data:
        abort(400, description="Missing brand")
    if 'price' not in data:
        abort(400, description="Missing price")
    if 'description' not in data:
        abort(400, description="Missing description")
    if 'category_id' not in data:
        abort(400, description="Missing category_id")

    instance = Product(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/products/<int:id>', methods=['PUT'], strict_slashes=False)
def put_product(id):
    """
    Updates a product
    """
    product = storage.get_by_id(Product, id)

    if not product:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore and hasattr(product, key):
            setattr(product, key, value)
    storage.save()
    return make_response(jsonify(product.to_dict()), 200)
