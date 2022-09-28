from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# routing nums = 9 digits long
# account nums = 17 digits long


order_items = db.Table(
    'order_items',
    db.Model.metadata,
    db.Column('orders', db.Integer, db.ForeignKey("orders.id"), primary_key= True),
    db.Column('food_items', db.Ineger, db.ForeignKey("food_items.id"), primary_key=True)
)


class Restaurant(db.Model):
    __tablename__ = 'restaurants'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable= False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    price_range = db.Column(db.Integer, nullable=False)
    restaurant_pic_url = db.Column(db.String, nullable=False)
    longitude = db.Column(db.Numeric(scale=2), nullable = False)
    latitude= db.Column(db.Numeric(scale=2), nullable = False)
    email = db.Column(db.String, nullable = False)
    phone_number = db.Column(db.Integer, nullable= False)
    bank_account = db.Column(db.Integer, nullable = False)
    routing_number = db.Column(db.Integer, nullable = False)
    category = db.Column(db.String, nullable = False)
    open_time = db.Column(db.Time, nullable= False)
    close_time = db.Column(db.Time, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    #relationships
    user = db.relationship("User", back_populates = "restaurants")
    food_items = db.relationship("FoodItem", back_populates = "restaurant", cascade = "all, delete")
    reviews = db.relationship("Review", back_populates = "restaurant", cascade = "all, delete" )

    def get_avg_rating(self):
        total = 0
        for review in self.reviews:
            total+= review.stars
        return "{:.2f}".format(total/len(self.reviews))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ownerId" : self.owner_id,
            "priceRange" : self.price_range,
            "restaurantPicUrl" : self.restaurantPicUrl,
            "longitude" : self.longitude,
            "latitude" : self.latitude,
            "email" : self.email,
            "phoneNumber" : self.phone_number,
            "bankAccount" : self.bank_account,
            "routingNumber" : self.routing_number,
            "category" : self.category,
            "openTime" : self.open_time,
            "closeTime" : self.close_time,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "numReviews":  len(self.reviews)
            "avgRating" : self.get_avg_rating()
        }

class FoodItem(db.Model):
    __tablename__ = "food_items"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    food_pic_url = db.Column(db.String, nullable = False)
    description = db.Column(db.String)
    # quantity = db.Column(db.Integer, nullable = False)
    price = db.Column(db.Numeric(scale=2), nullable = False)
    # order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
    category = db.Column(db.String)

    # relationships
    reviews = db.relationship("FoodItemReview", back_populates="food_item", cascade="all,delete")
    restaurant = db.relationship("Restaurant", back_populates= "food_items")
    item_orders = db.relationship("Order", back_populates= "order_food_items", secondary="order_items" )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "foodPicUrl": self.food_pic_url,
            "description": self.description,
            "quantity": self.quantity,
            "price": self.price,
            "orderId": self.orderId,
            "restaurantId": self.restaurant_id,
            "category": self.category,
            "price": self.price,
            "orderQuantity": len(item_orders),
            "category": self.category
        }

class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key = True)
    longitude = db.Column(db.Numeric(scale=2), nullable = False)
    latitude= db.Column(db.Numeric(scale=2), nullable = False)
    phone_number = db.Column(db.Integer, nullable = False)
    credit_card = db.Column(db.Integer, nullable = False)
    total_price = db.Column(db.Numeric(scale = 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    # relationships
    order_food_items = db.relationship("FoodItem", back_populates="item_orders", secondary='order_items')
    user = db.relationship("User", back_populates="orders")

    def get_total_price(self):
        # price from food item id in fooditems table * quantity
        prices = {}
        quantities = {}
        total_price=0
        # quantities => dictionary: {food_item_id: count}
        for item in self.order_food_items:
            prices[item.id] = item.price
            quantities[item.id] = item.get(item.id, 0) + 1
        for item_id,price in list(prices.items()):
            total_price+= prices[item_id] * quantities[item_id]
        return str(round(total_price, 2))


    def to_dict(self):
        return {
            "id": self.id,
            "customerId": self.customer_id,
            "longitude": self.longitude,
            "latitude": self.latitude,
            "phoneNumber": self.phone_number,
            "creditCard": self.credit_card,
            "totalPrice":  self.get_total_price()
        }


class FoodItemReview(db.Model):
    __tablename__ = "food_item_reviews"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    food_item_id = db.Column(db.Integer, db.ForeignKey("food_items.id"), primary_key=True)
    liked = db.Column(db.Boolean, nullable= False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    food_item = db.relationship("FoodItem", back_populates="reviews")
    user = db.relationship("User", back_populates="food_item_reviews")

    def to_dict():
        return {
            "id": self.id,
            "userId": self.user_id,
            "foodItemId": self.food_item_id
            "liked": self.liked,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }

class Review(db.Model):
    __tablename__= "reviews"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"). primary_key=True)
    review = db.Column(db.String)
    stars = db.Integer(db.Integer, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    restaurant = db.relationship("Restaurant", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")
