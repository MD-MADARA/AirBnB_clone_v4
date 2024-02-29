from flask import Blueprint

view_blueprint = Blueprint('view_blueprint', __name__)

from routes.product import *
