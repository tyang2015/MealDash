from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Restaurant, FoodItem
from app.forms import LoginForm, SignUpForm, RestaurantForm, FoodItemForm
from .auth_routes import validation_errors_to_error_messages
import json
from app.config import Config

map_routes = Blueprint('maps', __name__)

@map_routes.route("/key", methods=["POST"])
def get_google_api():
  res.json({Config.googleMapsAPIKey})
