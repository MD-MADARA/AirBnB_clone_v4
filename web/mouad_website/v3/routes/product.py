#!/usr/bin/python3
from routes.__init__ import view_blueprint
from flask import render_template

@view_blueprint.route('/product/<int:id>', strict_slashes=False)
def prduct(id):
    return render_template('product.html')
