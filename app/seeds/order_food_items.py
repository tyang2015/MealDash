from app.models import db, User, FoodItem, OrderFoodItem
from datetime import time
# from .orders import orders_list
import random

order_food_items_list = []

def seed_order_food_items():
  global order_food_items_list
  order_food_items = [
    {
      "order_id": 1,
      "restaurant_id": 1,
      "food_item_id": 1,
      "quantity": 3,
      "price": 15.99,
      "preferences": "less salt on food",
      "name": "chicken soup",
      "food_pic_url": "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2018/12/michelin-restaurants-in-the-world-og.jpg",
      "description": 'delicious soup',
      "category": "Sides"
    },
    {
      "order_id": 1,
      "restaurant_id": 1,
      "food_item_id": 1,
      "quantity": 2,
      "price": 5.99,
      "preferences": "less sugar",
      "name": "baked potato",
      "food_pic_url": "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2018/12/michelin-restaurants-in-the-world-og.jpg",
      "description": 'delicious potato',
      "category": "Sides"
    },
    {
      "order_id": 2,
      "restaurant_id": 1,
      "food_item_id": 2,
      "quantity": 1,
      "price": 16.99,
      "preferences": "more seasoning with added Sides",
      "name": "pesto pasta with chicken",
      "food_pic_url": "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2018/12/michelin-restaurants-in-the-world-og.jpg",
      "description": 'pasta',
      "category": "Main"
    },
    {
      "order_id": 3,
      "restaurant_id": 1,
      "food_item_id": 2,
      "quantity": 5,
      "price": 16.99,
      "preferences": "more asparagus",
      "name": "chipotle pasta",
      "food_pic_url": "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2018/12/michelin-restaurants-in-the-world-og.jpg",
      "description": 'pasta',
      "category": "Main"
    },
    {
      "order_id": 4,
      "restaurant_id": 1,
      "food_item_id": 4,
      "quantity": 2,
      "price": 20.99,
      "preferences": "Less olive oil and more sundried tomatoes",
      "name": "ribeye steak",
      "food_pic_url": "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2018/12/michelin-restaurants-in-the-world-og.jpg",
      "description": '',
      "category": "Main"
    },
    {
      "order_id": 4,
      "restaurant_id": 1,
      "food_item_id": 3,
      "quantity": 2,
      "price": 10.99,
      "preferences": "more onions",
      "name": "margherita pizza",
      "food_pic_url": "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2018/12/michelin-restaurants-in-the-world-og.jpg",
      "description": 'meat toppings on pizza too',
      "category": "Main"
    },
    {
      "order_id": 5,
      "quantity": 2,
      "price": 12.99,
      "restaurant_id": 4,
      "food_item_id": 8,
      "preferences": "add extra anchovies",
      "name": "veggie pizza",
      "food_pic_url": "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2018/12/michelin-restaurants-in-the-world-og.jpg",
      "description": 'pizza with veggies',
      "category": "Main"
    },
    {
      "order_id": 6,
      "quantity": 2,
      "price": 12.99,
      "restaurant_id": 4,
      "food_item_id": 9,
      "preferences": "more beef and hoison",
      "name": "french fries",
      "food_pic_url": "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2018/12/michelin-restaurants-in-the-world-og.jpg",
      "description": '',
      "category": "Sides"
    },
  ]

  for item in order_food_items:
    ordered_food_item = OrderFoodItem(
      order_id= item["order_id"],
      quantity = item['quantity'],
      price = item['price'],
      restaurant_id = item['restaurant_id'],
      food_item_id = item['food_item_id'],
      preferences = item['preferences'],
      name = item['name'],
      food_pic_url = item['food_pic_url'],
      description = item['description'],
      category = item['category']
    )
    db.session.add(ordered_food_item)
    order_food_items_list.append(ordered_food_item)
  db.session.commit()
  print('order food items seeded!')


def undo_order_food_items():
    db.session.execute('TRUNCATE order_food_items RESTART IDENTITY CASCADE;')
    db.session.commit()
