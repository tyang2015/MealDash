from app.models import db, Order
from datetime import time
from .food_items import food_items_list
from .order_food_items import order_food_items_list
import random
# orders_list = []

# def random_food_items():
#   max_range = random.randint(1,8)
#   all_food_items = []
#   # same food item can appear in multiple orders
#   for i in range(max_range):
#     food_item = random.choice(food_items_list)
#     all_food_items.append(food_item)
#   return all_food_items

def random_food_items():
  max_range = random.randint(1,5)
  all_food_items = []
  # same food item can appear in multiple orders
  for i in range(max_range):
    food_item = random.choice(order_food_items_list)
    all_food_items.append(food_item)
  return all_food_items


def seed_orders():
    # global orders_list
    orders = [
        {
            "customer_id": 4,
            "restaurant_id": 4,
            # "longitude": 10,
            # "latitude": 10,
            "phone_number": "(626) 111-2222",
            "credit_card": "1111222231110987",
            "total_price": 20.80,
            "distance": 3.9,
            "duration": 8,
            "delivery_fee": 1.50,
            "tip": 2.50,
            "delivery_method": "Delivery",
            "delivery_option": "Hand it to me",
            "order_completed": True,
            "user_address": "15225 Whittier Blvd, Whittier, CA 90603",
            "fees": 2.80,
            "subtotal": 14.80
        },
        {
            "customer_id": 4,
            "restaurant_id": 5,
            # "longitude": 5,
            # "latitude": 10,
            "phone_number": "(626) 111-2222",
            "credit_card": "1111222231110987",
            "total_price": 15.50,
            "distance": 4.3,
            "duration": 25,
            "delivery_fee": 1.50,
            "tip": 2.50,
            "delivery_method": "Pickup",
            "delivery_option": "",
            "order_completed": True,
            "user_address": "1420 S Azusa Ave, West Covina, CA 91791",
            'fees': 2.00,
            "subtotal": 9.50
        },
        {
            "customer_id": 4,
            "restaurant_id": 5,
            # "longitude": 5,
            # "latitude": 12,
            "phone_number": "(626) 111-2092",
            "credit_card": "9088222231110987",
            "total_price": 40.99,
            "distance": 7.9,
            "duration": 16,
            "delivery_fee": 2.50,
            "tip": 3.50,
            "delivery_method": "Delivery",
            "delivery_option": "Leave at my door",
            "order_completed": True,
            "user_address": "2276 E 16th St, Los Angeles, CA 90021",
            "fees": 2.00,
            "subtotal": 32.99
        },
        {
            "customer_id": 4,
            "restaurant_id": 5,
            # "longitude": 5,
            # "latitude": 12,
            "phone_number": "(626) 111-2092",
            "credit_card": "9088222231110987",
            "total_price": 35.99,
            "distance": 7.9,
            "duration": 16,
            "delivery_fee": 3.50,
            "tip": 3.50,
            "delivery_method": "Delivery",
            "delivery_option": "Hand it to me",
            "order_completed": True,
            "user_address": "1151 Oxford Rd, San Marino, CA 91108",
            "fees": 2.00,
            "subtotal": 26.99
        },
        {
            "customer_id": 6,
            "restaurant_id": 2,
            # "longitude": 7,
            # "latitude": 20,
            "phone_number": "(234) 908-7563",
            "credit_card": "6666222231110987",
            "total_price": 20.80,
            "distance": 10.9,
            "duration": 35,
            "delivery_fee": 2.50,
            "tip": 3.50,
            "delivery_method": "Delivery",
            "delivery_option": "Leave at my door",
            "order_completed": True,
            "user_address": "2600 Ocean Park Blvd, Santa Monica, CA 90405",
            "fees": 2.00,
            "subtotal": 12.80
        },
        {
            "customer_id": 7,
            "restaurant_id": 3,
            # "longitude": 12,
            # "latitude": 10,
            "phone_number": "(111) 900-8765",
            "credit_card": "5555222231110987",
            "total_price": 30.80,
            "distance": 2.9,
            "duration": 10,
            "delivery_fee": 1.50,
            "tip": 3.50,
            "delivery_method": "Delivery",
            "delivery_option": "Leave at my door",
            "order_completed": True,
            "user_address": "14105 Don Julian Rd, La Puente, CA 91746",
            "fees": 2.00,
            "subtotal": 23.80
        },
        {
            "customer_id": 8,
            "restaurant_id": 1,
            # "longitude": 10,
            # "latitude": 10,
            "phone_number": "(626) 400-9027",
            "credit_card": "9000222231110987",
            "total_price": 20.80,
            "distance": 3.9,
            "duration": 10,
            "delivery_fee": 1.50,
            "tip": 3.50,
            "delivery_method": "Delivery",
            "delivery_option": "Leave at my door",
            "order_completed": True,
            "user_address": "14105 Don Julian Rd, La Puente, CA 91746",
            "fees": 2.00,
            "subtotal": 13.80
        },
        {
            "customer_id": 6,
            "restaurant_id": 1,
            # "longitude": 10,
            # "latitude": 10,
            "phone_number": "(626) 400-9027",
            "credit_card": "9000222231110987",
            "total_price": 20.80,
            "distance": 3.9,
            "duration": 10,
            "delivery_fee": 1.50,
            "tip": 3.50,
            "delivery_method": "Delivery",
            "delivery_option": "Leave at my door",
            "order_completed": True,
            "user_address": "N California Ave, La Puente, CA 91744",
            "fees": 2.00,
            "subtotal": 13.80
        },
        {
            "customer_id": 7,
            "restaurant_id": 1,
            # "longitude": 10,
            # "latitude": 10,
            "phone_number": "(626) 400-9027",
            "credit_card": "9000222231110987",
            "total_price": 20.80,
            "distance": 3.9,
            "duration": 10,
            "delivery_fee": 1.50,
            "tip": 3.50,
            "delivery_method": "Pickup",
            "delivery_option": "",
            "order_completed": True,
            "user_address": "618 Shoppers Ln, Covina, CA 91723",
            "fees": 2.00,
            "subtotal": 13.80
        }
    ]
    for order in orders:
        newOrder = Order(
            customer_id = order["customer_id"],
            restaurant_id = order["restaurant_id"],
            # longitude = order["longitude"],
            # latitude = order["latitude"],
            phone_number = order["phone_number"],
            credit_card = order["credit_card"],
            total_price = order["total_price"],
            distance = order['distance'],
            duration = order['duration'],
            delivery_fee= order['delivery_fee'],
            tip = order['tip'],
            delivery_method = order["delivery_method"],
            delivery_option = order['delivery_option'],
            order_completed = order["order_completed"],
            user_address = order["user_address"],
            subtotal = order["subtotal"],
            fees = order["fees"],
            order_food_items = random_food_items()
        )
        # orders_list.append(newOrder)
        db.session.add(newOrder)
    db.session.commit()

def undo_orders():
    db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
    db.session.commit()
