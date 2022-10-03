from app.models import db, Order
from datetime import time
from .food_items import food_items_list
import random
# orders_list = []

def random_food_items():
  max_range = random.randint(1,8)
  all_food_items = []
  # same food item can appear in multiple orders
  for i in range(max_range):
    food_item = random.choice(food_items_list)
    all_food_items.append(food_item)
  return all_food_items


def seed_orders():
    # global orders_list
    orders = [
        {
            "customer_id": 4,
            "restaurant_id": 4,
            "longitude": 10,
            "latitude": 10,
            "phone_number": "(626) 111-2222",
            "credit_card": "1111222231110987",
            "total_price": 20.80
        },
        {
            "customer_id": 4,
            "restaurant_id": 5,
            "longitude": 5,
            "latitude": 10,
            "phone_number": "(626) 111-2222",
            "credit_card": "1111222231110987",
            "total_price": 15.50
        },
        {
            "customer_id": 5,
            "restaurant_id": 1,
            "longitude": 5,
            "latitude": 12,
            "phone_number": "(626) 111-2092",
            "credit_card": "9088222231110987",
            "total_price": 40.99
        },
        {
            "customer_id": 6,
            "restaurant_id": 2,
            "longitude": 7,
            "latitude": 20,
            "phone_number": "(234) 908-7563",
            "credit_card": "6666222231110987",
            "total_price": 20.80
        },
        {
            "customer_id": 7,
            "restaurant_id": 3,
            "longitude": 12,
            "latitude": 10,
            "phone_number": "(111) 900-8765",
            "credit_card": "5555222231110987",
            "total_price": 30.80
        },
        {
            "customer_id": 8,
            "restaurant_id": 5,
            "longitude": 10,
            "latitude": 10,
            "phone_number": "(626) 400-9027",
            "credit_card": "9000222231110987",
            "total_price": 20.80
        },
    ]
    for order in orders:
        newOrder = Order(
            customer_id = order["customer_id"],
            restaurant_id = order["restaurant_id"],
            longitude = order["longitude"],
            latitude = order["latitude"],
            phone_number = order["phone_number"],
            credit_card = order["credit_card"],
            total_price = order["total_price"],
            order_food_items = random_food_items()
        )
        # orders_list.append(newOrder)
        db.session.add(newOrder)
    db.session.commit()

def undo_orders():
    db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
    db.session.commit()
