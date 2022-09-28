from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    # username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.Integer, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # relationships
    restaurants = db.relationship("Restaurant", back_populates="user", cascade="all,delete")
    reviews = db.relationship("Review", back_populates="user", cascade="all,delete")
    food_item_reviews = db.relationship("FoodItemReview", back_populates="user", cascade="all, delete")
    orders = db.relationship("Order", back_populates= "user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "reviews": [review.to_dict() for review in self.reviews],
            "foodItemReviews": [item_review.to_dict() for item_review in self.food_item_reviews],
            "restaurantsOwned": [restaurant.to_dict() for restaurant in self.restaurants],
            "orders": [order.to_dict() for order in self.orders]
        }
