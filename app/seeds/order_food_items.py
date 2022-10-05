from app.models import db, User, FoodItem, OrderFoodItem
from datetime import time
# from .orders import orders_list
import random

def seed_order_food_items():
  order_food_items = [
    {
      "order_id": 1,
      "restaurant_id": 1,
      "food_item_id": 1,
      "quantity": 3,
      "price": 15.99,
      "preference": "less salt on food"
    },
    {
      "order_id": 1,
      "restaurant_id": 1,
      "food_item_id": 1,
      "quantity": 2,
      "price": 5.99,
      "preference": "less sugar"
    },
    {
      "order_id": 2,
      "restaurant_id": 1,
      "food_item_id": 2,
      "quantity": 1,
      "price": 16.99,
      "preference": "more seasoning with added sides"
    },
    {
      "order_id": 3,
      "restaurant_id": 1,
      "food_item_id": 2,
      "quantity": 5,
      "price": 5.99,
      "preference": "less salt on food"
    },
    {
      "order_id": 4,
      "restaurant_id": 1,
      "food_item_id": 4,
      "quantity": 2,
      "price": 8.99,
      "preference": "Less olive oil and more sundried tomatoes"
    },
    {
      "order_id": 4,
      "restaurant_id": 1,
      "food_item_id": 3,
      "quantity": 2,
      "price": 10.99,
      "preference": "more onions"
    },
    {
      "order_id": 5,
      "quantity": 2,
      "price": 12.99,
      "restaurant_id": 4,
      "food_item_id": 8,
      "preference": "add extra anchovies"
    },
    {
      "order_id": 6,
      "quantity": 2,
      "price": 12.99,
      "restaurant_id": 4,
      "food_item_id": 9,
      "preference": "more beef and hoison"
    },
  ]

  for item in order_food_items:
    ordered_food_item = OrderFoodItem(
      order_id= item["order_id"],
      quantity = item['quantity'],
      price = item['price'],
      restaurant_id = item['restaurant_id'],
      food_item_id = item['food_item_id'],
      preference = item['preference']
    )
    db.session.add(ordered_food_item)
  db.session.commit()
  print('order food items seeded!')


def undo_order_food_items():
    db.session.execute('TRUNCATE order_food_items RESTART IDENTITY CASCADE;')
    db.session.commit()
