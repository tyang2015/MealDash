from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Restaurant, FoodItem, Order, OrderFoodItem
from app.forms import LoginForm, SignUpForm, RestaurantForm, FoodItemForm, OrderForm, FoodForm
from .auth_routes import validation_errors_to_error_messages
import json


restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route("", methods = ['GET'])
# @login_required
def get_all_restaurants():
    print("hitting restaurants route!")
    restaurants = Restaurant.query.all()
    return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route("/<int:id>", methods = ["GET"])
@login_required
def get_one_restaurant(id):
    print('hitting id route in restaurants for get')
    restaurant = Restaurant.query.get(id)
    if restaurant == None:
        return {"message": "Restaurant couldn't be found"}, 404
    return restaurant.to_dict()


@restaurant_routes.route("", methods = ["POST"])
@login_required
def create_restaurant():
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('open time from form':, form.data["openTime"])
    # data =request.json=> json this
    if form.validate_on_submit():
      restaurant = Restaurant(
          name = form.data["name"],
          price_range = form.data["price_range"],
          restaurant_pic_url = form.data["restaurant_pic_url"],
          logo = form.data["logo"],
          longitude = form.data["longitude"],
          latitude = form.data["latitude"],
          email = form.data["email"],
          phone_number = form.data["phone_number"],
          bank_account = form.data["bank_account"],
          routing_number = form.data["routing_number"],
          category = form.data["category"],
          open_time = form.data["open_time"],
          close_time = form.data["close_time"],
          address = form.data["address"],
          user = current_user
      )
      db.session.add(restaurant)
      db.session.commit()
      return restaurant.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@restaurant_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_restaurant(id):
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      # print('restaurant pic url in backend: ', form.data["restaurantPicUrl"])
      restaurant = Restaurant.query.get(int(id))
      if restaurant == None:
          return {"message": "Restaurant couldn't be found"}, 404
      if restaurant.owner_id != current_user.id:
          return {"errors": "Forbidden"}, 403
      restaurant_data_bytes = request.data
      new_restaurant_data = json.loads(restaurant_data_bytes.decode('utf-8'))
      print('new restaurant data after byte conversion:', new_restaurant_data)
      for k,v in list(new_restaurant_data.items()):
        setattr(restaurant, k, v)
      print('updated restaurant from backend:', restaurant.to_dict())
      db.session.commit()
      updated_restaurant = Restaurant.query.get(id)
      # print('restaurant in bytes:', restaurant_data_bytes)
      return updated_restaurant.to_dict(),200
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@restaurant_routes.route("<int:id>", methods=['DELETE'])
@login_required
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if restaurant == None:
        return {"message": "Restaurant couldn't be found"}, 404
    if restaurant.owner_id != current_user.id:
        return {"errors": "Forbidden"}, 403
    db.session.delete(restaurant)
    db.session.commit()
    return {"message": "Successfully deleted!"}


# -------------------------------------------------------
# FEATURE 2: FOOD ITEM (per restaurant)
@restaurant_routes.route("/<int:rest_id>/fooditems", methods=['GET'])
@login_required
def get_food_items(rest_id):
  restaurant = Restaurant.query.get(rest_id)
  if restaurant == None:
      return {"message": "Restaurant couldn't be found"}, 404
  food_items = FoodItem.query.filter(FoodItem.restaurant_id == rest_id).all()
  return {"food_items": [item.to_dict() for item in food_items]}


# CREATE food item
@restaurant_routes.route("/<int:rest_id>", methods=["POST"])
@login_required
def create_food_item(rest_id):
  restaurant = Restaurant.query.get(rest_id)
  if restaurant == None:
    return {"message": "Restaurant couldn't be found"}, 404
  if restaurant.owner_id != current_user.id:
    return {"errors": "Forbidden"}, 403
  form = FoodItemForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    food_item = FoodItem(
      name = form.data["name"],
      food_pic_url = form.data["food_pic_url"],
      description = form.data["description"],
      price = form.data["price"],
      category = form.data["category"],
      restaurant_id = form.data["restaurant_id"]
    )
    db.session.add(food_item)
    db.session.commit()
    return food_item.to_dict(), 201

@restaurant_routes.route("/<int:rest_id>/fooditems/<int:food_item_id>", methods=["PUT"])
@login_required
def update_food_item(rest_id, food_item_id):
  restaurant = Restaurant.query.get(rest_id)
  food_item = FoodItem.query.get(food_item_id)
  if restaurant == None:
    return {"message": "Restaurant couldn't be found"}, 404
  if food_item == None:
    return {"message": "Food item couldnt be found"}, 404
  if restaurant.owner_id != current_user.id:
    return {"errors":"Forbidden"}, 403
  form = FoodItemForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    food_item_data = json.loads(request.data.decode('utf-8'))
    # food_item_data["restaurantId"] = rest_id
    # print("food item data: ", food_item_data)
    for k,v in food_item_data.items():
      setattr(food_item, k,v)
    db.session.commit()
    updated_food_item = FoodItem.query.get(food_item_id)
    return updated_food_item.to_dict()

@restaurant_routes.route("/<int:rest_id>/fooditems/<int:food_item_id>", methods=["Delete"])
@login_required
def delete_food_item(rest_id, food_item_id):
  restaurant = Restaurant.query.get(rest_id)
  food_item = FoodItem.query.get(food_item_id)
  if restaurant == None:
    return {"message": "Restaurant couldn't be found"}, 404
  if food_item == None:
    return {"message": "Food item couldnt be found"}, 404
  if restaurant.owner_id != current_user.id:
    return {"errors":"Forbidden"}, 403
  db.session.delete(food_item)
  db.session.commit()
  return {"message": "Successfully deleted!"}

# ------------------------------------------------

# FEATURE 3: ORDERS
@restaurant_routes.route("/orders", methods= ['GET'])
@login_required
def get_your_orders():
  restaurant_orders = Order.query.filter(Order.customer_id == current_user.id).all()
  return {"orders": [order.to_dict() for order in restaurant_orders]}



@restaurant_routes.route("/<int:id>/orders", methods = ['GET'])
@login_required
# this is just for your orders page based on specific restaurant
def get_restaurant_orders(id):
  restaurant = Restaurant.query.get(id)
  if restaurant == None:
    return {"message": "Restaurant couldn't be found"}, 404
  orders = Order.query.filter(Order.restaurant_id == id, Order.customer_id == current_user.id).all()
  return {"orders": [order.to_dict() for order in orders]}

@restaurant_routes.route("/<int:id>/orders", methods=["POST"])
@login_required
# MUST insert into 2 tables: order (first) and order food items (second)
# make authorization for this later (you CANNOT order from your restaurant)
def create_restaurant_order(id):
  restaurant = Restaurant.query.get(id)
  if restaurant == None:
    return {"message": "Restaurant couldn't be found"}, 404
  form = OrderForm()
  print("request parsed: ", request.json)
  form['csrf_token'].data = request.cookies['csrf_token']
  # form2['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    # print('form data (looking for fee):', form.data)
    order = Order(
      customer_id = current_user.id,
      restaurant_id = id,
      phone_number = form.data['phone_number'],
      credit_card = form.data['credit_card'],
      total_price = form.data['total_price'],
      distance = form.data['distance'],
      duration= form.data['duration'],
      delivery_fee = form.data['delivery_fee'],
      tip = form.data['tip'],
      delivery_method = form.data['delivery_method'],
      delivery_option = form.data['delivery_option'],
      order_completed = False,
      user_address = form.data['user_address'],
      fees = form.data['fees'],
      subtotal = form.data['subtotal'],
      user = current_user,
      restaurant = restaurant,
    )
    db.session.add(order)
    db.session.commit()
    order_food_items = create_food_items(request.json["food_items"], id, order.id)
    # final_order = order.to_dict()
    return order.to_dict(), 201
  return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# remove order_id from params (you should not enter it as user)
@restaurant_routes.route("/orders/fooditems", methods = ["POST"])
def create_food_items(food_items, id, order_id):
  for food_item in food_items:
    food_item = OrderFoodItem(
      restaurant_id = id,
      food_item_id = food_item["id"],
      order_id = order_id,
      quantity = food_item["quantity"],
      price = food_item["price"],
      preferences = food_item["preferences"],
      name = food_item["name"],
      food_pic_url = food_item["foodPicUrl"],
      description = food_item["description"],
      category = food_item["category"]
    )
    db.session.add(food_item)
    db.session.commit()
  created_food_items = OrderFoodItem.query.filter(OrderFoodItem.order_id ==order_id)
  return {'orderFoodItems': [food_item.to_dict() for food_item in created_food_items]}, 201
  # return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@restaurant_routes.route("/<int:id>/orders/<int:orderId>", methods=['PUT'])
@login_required
def update_restaurant_order(id, orderId):
  restaurant = Restaurant.query.get(id)
  order = Order.query.get(orderId)
  if restaurant == None:
    return {"message": "Restaurant couldn't be found"}, 404
  if order == None:
    return {"message": "Order couldn't be found"}, 404
  form = OrderForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
      order_data_bytes = request.data
      new_order_data = json.loads(order_data_bytes.decode('utf-8'))
      print('new order data after byte conversion:', new_order_data)
      for k,v in list(new_order_data.items()):
        setattr(order, k, v)
      db.session.commit()
      return order.to_dict(),200
  return {"errors": validation_errors_to_error_messages(form.errors)}, 400
