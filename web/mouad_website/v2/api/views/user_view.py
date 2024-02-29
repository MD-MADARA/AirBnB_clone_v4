#!/usr/bin/python3
""" User view """
from models import storage
from models.user import User
from api.views.__init__ import app_views
from flask import jsonify, abort, make_response, request


@app_views.route('/users/<int:id>', methods=['GET'], strict_slashes=False)
@app_views.route('/users', methods=['GET'], strict_slashes=False)


def get_users(id=None):
    """
    Retrieves the list of all user objects
    or a specific user
    """
    if id:
        user = storage.get_by_id(User, id)
        if not user:
            abort(404)
        return jsonify(user.to_dict())
    else:
        return jsonify([user.to_dict() for user in storage.all(User).values()])



@app_views.route('/users/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_user(id):
    """
    Deletes a user Object
    """
    user = storage.get_by_id(User, id)
    if not user:
        abort(404)

    user.delete()
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def post_user():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    if 'email' not in data:
        abort(400, description="Missing email")
    if 'password' not in data:
        abort(400, description="Missing password")
    if 'first_name' not in data:
        abort(400, description="Missing first_name")
    if 'last_name' not in data:
        abort(400, description="Missing last_name")
    if 'address' not in data:
        abort(400, description="Missing address")
    if 'phone' not in data:
        abort(400, description="Missing Phone")

    if storage.get_user_by_email(data.get("email")):
        #if user aleready exists
        abort(400, description="Email already exists")

    instance = User(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates a user
    """
    user = storage.get_by_id(User, user_id)

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'email', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore and hasattr(user, key):
            setattr(user, key, value)
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)
