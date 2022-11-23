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
        {
            "user_id": 4,
            "restaurant_id":  13,
            "review": "Love the crepe cake! Tastes just like Lady M, my favorite cake shop in LA",
            "stars": 5,
        },
        {
            "user_id": 7,
            "restaurant_id":  13,
            "review": "Matcha ice cream is very smooth and has authentic matcha!",
            "stars": 5,
        },
        {
            "user_id": 8,
            "restaurant_id":  14,
            "review": "Dosa is my favorite breakfast dish! But this time I ordered, it was a bit dry.",
            "stars": 3,
        },
        {
            "user_id": 5,
            "restaurant_id":  2,
            "review": "Fanciest food I've ever eaten. With portions that didn't fill me and took a gap out of my savings",
            "stars": 2,
        },
        {
            "user_id": 9,
            "restaurant_id":  2,
            "review": "Luxury experience for sure! Lives up to the name.",
            "stars": 5,
        },
        {
            "user_id": 8,
            "restaurant_id":  3,
            "review": "Delicious vegan burger! Wish there were more onions",
            "stars": 3,
        },
        {
            "user_id": 2,
            "restaurant_id":  3,
            "review": "I can't tell that it's vegan! Pretty amazing",
            "stars": 5,
        },
        {
            "user_id": 4,
            "restaurant_id":  4,
            "review": "Randy is an annoying owner but he hired a great Thai chef!",
            "stars": 4,
        },
        {
            "user_id": 6,
            "restaurant_id":  4,
            "review": "Khao Soi is a bit bland this time. Needs more coconut flavor and lemongrass",
            "stars": 2,
        },
        {
            "user_id": 2,
            "restaurant_id":  5,
            "review": "Very delicious brulee! Light and creamy",
            "stars": 5,
        },
        {
            "user_id": 4,
            "restaurant_id":  6,
            "review": "Paella has so much flavor and is rich in seafood",
            "stars": 5,
        },
        {
            "user_id": 5,
            "restaurant_id":  7,
            "review": "As a seafood lover, it hits the spot",
            "stars": 5,
        },
        {
            "user_id": 1,
            "restaurant_id":  7,
            "review": "I am picky with Japanese food usually, but the chefs keep true to the original cuisine without extra flavors. Great find!",
            "stars": 5,
        },
        {
            "user_id": 7,
            "restaurant_id":  8,
            "review": "Delicious sashimi! Very fresh and with nice plating. Sabrina is inspirational great restaurant owner",
            "stars": 5,
        },
        {
            "user_id": 5,
            "restaurant_id":  9,
            "review": "Wellington cooked perfectly! This must be a new restaurant though, because there's no variety at all.",
            "stars": 4,
        },
        {
            "user_id": 5,
            "restaurant_id":  10,
            "review": "Very well cooked comfort food! Brisket perfectly moist and tender",
            "stars": 5,
        },
        {
            "user_id": 6,
            "restaurant_id":  14,
            "review": "Great tikka masala!",
            "stars": 5,
        }
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
