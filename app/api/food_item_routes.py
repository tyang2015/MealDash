from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Restaurant, FoodItem
from app.forms import LoginForm, SignUpForm, RestaurantForm
from .auth_routes import validation_errors_to_error_messages
import json

food_item_routes = Blueprint('food_items', __name__)

# @food_item_routes.route("", methods=['GET'])
# @login_required
# def get_all_food_items
