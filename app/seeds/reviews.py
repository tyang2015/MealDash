from app.models import db, User, Restaurant, Review
from datetime import time


def seed_reviews():
    reviews = [
        {
            "user_id": 1,
            "restaurant_id":  1,
            "review": "i love the beef soup!",
            "stars": 5,
        },
        {
            "user_id": 2,
            "restaurant_id":  1,
            "review": "delicious",
            "stars": 4,
        },
        {
            "user_id": 3,
            "restaurant_id":  1,
            "review": "the tea is a bit bland",
            "stars": 3,
        },
        {
            "user_id": 5,
            "restaurant_id":  2,
            "review": "very fancy and great tasting",
            "stars": 5,
        },
        {
            "user_id": 6,
            "restaurant_id":  2,
            "review": "michelin starred! how could i expect less",
            "stars": 5,
        },
        {
            "user_id": 7,
            "restaurant_id":  2,
            "review": "love the food",
            "stars": 4,
        },
        {
            "user_id": 1,
            "restaurant_id":  3,
            "review": "vegan delight!",
            "stars": 5,
        },
        {
            "user_id": 6,
            "restaurant_id":  3,
            "review": "vegan burger is delicious",
            "stars": 5,
        },
        {
            "user_id": 7,
            "restaurant_id":  4,
            "review": "delicious pho",
            "stars": 4,
        },
        {
            "user_id": 8,
            "restaurant_id":  5,
            "review": "macarons are heavenly!",
            "stars": 5,
        },
        {
            "user_id": 1,
            "restaurant_id":  7,
            "review": "ashley's cooking never disappoints",
            "stars": 5,
        },
        {
            "user_id": 4,
            "restaurant_id":  10,
            "review": "ben is ok as a person but his southern bbq is phenomenal",
            "stars": 5,
        },
        {
            "user_id": 7,
            "restaurant_id":  11,
            "review": "very authentic curry",
            "stars": 4,
        },
        {
            "user_id": 6,
            "restaurant_id":  11,
            "review": "i dont like the corn soup",
            "stars": 2,
        },
        {
            "user_id": 5,
            "restaurant_id":  12,
            "review": "really good pasta! ",
            "stars": 5,
        },
    ]
    for review in reviews:
        newReview = Review(
            user_id = review["user_id"],
            restaurant_id = review["restaurant_id"],
            review = review["review"],
            stars = review["stars"],
        )
        db.session.add(newReview)
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
