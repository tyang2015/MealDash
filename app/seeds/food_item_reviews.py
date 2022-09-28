from app.models import db, User, Restaurant, Review, FoodItemReview
from datetime import time

def seed_food_item_reviews():
    food_item_reviews = [
        {
            "user_id": 4,
            "food_item_id": 8,
            "liked": True,
        },
        {
            "user_id": 4,
            "food_item_id": 9,
            "liked": True,
        },
        {
            "user_id": 4,
            "food_item_id": 10,
            "liked": True,
        },
        {
            "user_id": 5,
            "food_item_id": 1,
            "liked": True,
        },
        {
            "user_id": 2,
            "food_item_id": 1,
            "liked": True,
        },
        {
            "user_id": 3,
            "food_item_id": 1,
            "liked": False,
        },
        {
            "user_id": 6,
            "food_item_id": 8,
            "liked": True,
        },
        {
            "user_id": 7,
            "food_item_id": 8,
            "liked": True,
        },
        {
            "user_id": 1,
            "food_item_id": 8,
            "liked": False,
        },
        {
            "user_id": 4,
            "food_item_id": 10,
            "liked": True,
        },
        {
            "user_id": 5,
            "food_item_id": 10,
            "liked": True,
        },
        {
            "user_id": 6,
            "food_item_id": 10,
            "liked": True,
        },
        {
            "user_id": 2,
            "food_item_id": 10,
            "liked": False,
        },
    ]

    for item in food_item_reviews:
        review = FoodItemReview(
            user_id = item["user_id"],
            food_item_id = item["food_item_id"],
            liked = item["liked"]
        )
        db.session.add(review)
    db.session.commit()

def undo_food_item_reviews():
    db.session.execute('TRUNCATE food_item_reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
