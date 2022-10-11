from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()
# routing nums = 9 digits long
# account nums = 17 digits long


# order_items = db.Table(
#     'order_items',
#     db.Model.metadata,
#     db.Column('orders', db.Integer, db.ForeignKey("orders.id")),
#     db.Column('food_items', db.Integer, db.ForeignKey("food_items.id"))
# )


class Restaurant(db.Model):
    __tablename__ = 'restaurants'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable= False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    price_range = db.Column(db.Integer, nullable=False)
    restaurant_pic_url = db.Column(db.String, nullable=False)
    # added here
    logo = db.Column(db.String, nullable=False)
    longitude = db.Column(db.Numeric(scale=2), nullable = False)
    latitude= db.Column(db.Numeric(scale=2), nullable = False)
    email = db.Column(db.String, nullable = False)
    phone_number = db.Column(db.String, nullable= False)
    bank_account = db.Column(db.String, nullable = False)
    routing_number = db.Column(db.String, nullable = False)
    category = db.Column(db.String, nullable = False)
    # OPEN TIME AND CLOSE TIME TO CHANGE DATATYPE?
    address = db.Column(db.String, nullable= False)
    open_time = db.Column(db.String, nullable= False)
    close_time = db.Column(db.String, nullable = False)
    # ADDED HERE FOR PROJECT - remove after monday
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    #relationships
    user = db.relationship("User", back_populates = "restaurants")
    food_items = db.relationship("FoodItem", back_populates = "restaurant", cascade = "all, delete")
    reviews = db.relationship("Review", back_populates = "restaurant", cascade = "all, delete" )
    orders = db.relationship("Order", back_populates = "restaurant", cascade = "all, delete" )
    order_food_items = db.relationship("OrderFoodItem", back_populates="restaurant", cascade = "all, delete")
    def get_avg_rating(self):
        total = 0
        for review in self.reviews:
            total+= review.stars
        if len(self.reviews)> 0:
            return "{:.2f}".format(total/len(self.reviews))
        else:
            return "0"


    def to_dict(self):
      return {
          "id": self.id,
          "name": self.name,
          "ownerId" : self.owner_id,
          "priceRange" : self.price_range,
          "restaurantPicUrl" : self.restaurant_pic_url,
          "logo": self.logo,
          "longitude" : str(self.longitude),
          "latitude" : str(self.latitude),
          "email" : self.email,
          "phoneNumber" : self.phone_number,
          "bankAccount" : self.bank_account,
          "routingNumber" : self.routing_number,
          "category" : self.category,
          "openTime" : str(self.open_time),
          "closeTime" : str(self.close_time),
          "createdAt": self.created_at,
          "updatedAt": self.updated_at,
          "numReviews":  len(self.reviews),
          "avgRating" : self.get_avg_rating(),
          # "User": self.convert_user_to_dict()
      }

    def convert_user_to_dict(self):
        return {
            "id": self.user.id,
            "firstName": self.user.first_name,
            "lastName": self.user.last_name,
            "email": self.user.email,
            "phoneNumber": self.user.phone_number
        }

class FoodItem(db.Model):
    __tablename__ = "food_items"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    food_pic_url = db.Column(db.String, nullable = False)
    description = db.Column(db.String)
    price = db.Column(db.Numeric(scale=2), nullable = False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
    category = db.Column(db.String)
    # relationships
    order_food_items = db.relationship("OrderFoodItem", back_populates="food_item", cascade = "all, delete")
    reviews = db.relationship("FoodItemReview", back_populates="food_item", cascade="all, delete")
    restaurant = db.relationship("Restaurant", back_populates= "food_items")
    # item_orders = db.relationship("Order", back_populates= "order_food_items", secondary=order_items )

    def to_dict(self):
      return {
        "id": self.id,
        "name": self.name,
        "foodPicUrl": self.food_pic_url,
        "description": self.description,
        "price": str(self.price),
        # "orderId": self.orderId,
        "restaurantId": self.restaurant_id,
        "category": self.category,
        # "orderQuantity":
        # "orderQuantity": len(self.item_orders),
        "Orders": [order.id for order in self.order_food_items],
        "Reviews": [review.id for review in self.reviews],
        "Restaurant": self.to_dict_for_restaurant()
      }

    def to_dict_for_order(self):
      return {
        "id": self.id,
        "name": self.name,
        "foodPicUrl": self.food_pic_url,
        "description": self.description,
        "price": str(self.price),
        "restaurantId": self.restaurant_id,
        "category": self.category,
        "category": self.category,
      }

    def to_dict_for_restaurant(self):
      return {
        "id": self.restaurant.id,
        "name": self.restaurant.name,
        "email": self.restaurant.email,
        "restaurantPicUrl": self.restaurant.restaurant_pic_url,
        "phoneNumber": self.restaurant.phone_number,
        "address": self.restaurant.address,
        "openTime": self.restaurant.open_time,
        "closeTime": self.restaurant.close_time,
        "category": self.restaurant.category
      }

class Order(db.Model):
  __tablename__ = "orders"
  id = db.Column(db.Integer, primary_key=True)
  customer_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
  # consider removing longitude and latitude, temporarily removed null constraint
  # longitude = db.Column(db.Numeric(scale=2))
  # latitude= db.Column(db.Numeric(scale=2))
  phone_number = db.Column(db.String, nullable = False)
  credit_card = db.Column(db.String, nullable = False)
  total_price = db.Column(db.Numeric(scale = 2), nullable=False)
  distance = db.Column(db.Numeric)
  duration = db.Column(db.Integer)
  # added
  delivery_fee = db.Column(db.Numeric(scale=2))
  tip = db.Column(db.Numeric(scale=2))
  delivery_method = db.Column(db.String)
  delivery_option = db.Column(db.String)

  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow)

  # relationships
  # order_food_items = db.relationship("FoodItem", back_populates="item_orders", secondary=order_items)

  user = db.relationship("User", back_populates="orders")
  restaurant = db.relationship("Restaurant", back_populates = "orders")
  order_food_items = db.relationship("OrderFoodItem", back_populates="food_item_order",cascade = "all, delete" )

  def restaurant_to_dict(self):
    return {
      "id": self.restaurant.id,
      "name": self.restaurant.name,
      "email": self.restaurant.email,
      "phoneNumber": self.restaurant.phone_number,
      "address": self.restaurant.address,
      "openTime": self.restaurant.open_time,
      "closeTime": self.restaurant.close_time,
      "category": self.restaurant.category
    }

  def get_total_price(self):
      prices = {}
      quantities = {}
      total_price=0
      # quantities => dictionary: {food_item_id: count}
      for item in self.order_food_items:
          prices[item.id] = item.price
          quantities[item.id] = quantities.get(item.id, 0) + 1
      for item_id,price in list(prices.items()):
          total_price+= prices[item_id] * quantities[item_id]
      return str(round(total_price, 2))

  def to_dict(self):
    return {
        "id": self.id,
        "restaurantId": self.restaurant_id,
        "customerId": self.customer_id,
        # "longitude": str(self.longitude),
        # "latitude": str(self.latitude),
        "phoneNumber": self.phone_number,
        "creditCard": self.credit_card,
        "totalPrice": self.total_price,
        "distance": str(self.distance),
        "duration": self.duration,
        "deliveryFee": self.delivery_fee,
        "tip": self.tip,
        "deliveryMethod": self.delivery_method,
        "deliveryOption": self.delivery_option,
        # "totalPrice":  self.get_total_price(),
        # "orderFoodItems": [foodItem.to_dict_for_order() for foodItem in self.order_food_items],
        "user": self.convert_user_to_dict(),
        "restaurant": self.restaurant_to_dict()
    }

  def convert_user_to_dict(self):
    return {
      'id': self.user.id,
      'firstName': self.user.first_name,
      'lastName': self.user.last_name,
      'email': self.user.email,
      'phoneNumber': self.user.phone_number
    }

class OrderFoodItem(db.Model):
  __tablename__ = "order_food_items"
  id = db.Column(db.Integer, primary_key=True)
  restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
  # CONSIDER Removing name,food_pic_url, description, category later after fixing submittedCartItems to get order food item data
  name = db.Column(db.String)
  food_pic_url = db.Column(db.String)
  description = db.Column(db.String)
  category = db.Column(db.String)
  food_item_id = db.Column(db.Integer, db.ForeignKey("food_items.id"))
  order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
  quantity = db.Column(db.Integer)
  price = db.Column(db.Numeric(scale=2), nullable = False)
  preferences = db.Column(db.String)

  restaurant = db.relationship("Restaurant", back_populates="order_food_items")
  food_item = db.relationship("FoodItem", back_populates="order_food_items")
  food_item_order = db.relationship("Order", back_populates="order_food_items")

  def to_dict(self):
    return {
      "id" : self.id,
      "quantity" : self.quantity,
      "price" : self.price,
      "preferences": self.preferences,
      "Restaurant": self.restaurant_to_dict()
    }

  def restaurant_to_dict(self):
    return {
      "id": self.restaurant.id,
      "name": self.restaurant.name,
      "email": self.restaurant.email,
      "phoneNumber": self.restaurant.phone_number,
      "address": self.restaurant.address,
      "openTime": self.restaurant.open_time,
      "closeTime": self.restaurant.close_time,
      "category": self.restaurant.category
    }




class FoodItemReview(db.Model):
    __tablename__ = "food_item_reviews"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    food_item_id = db.Column(db.Integer, db.ForeignKey("food_items.id"))
    liked = db.Column(db.Boolean, nullable= False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    food_item = db.relationship("FoodItem", back_populates="reviews")
    user = db.relationship("User", back_populates="food_item_reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "foodItemId": self.food_item_id,
            "liked": self.liked,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }

class Review(db.Model):
    __tablename__= "reviews"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
    review = db.Column(db.String)
    stars = db.Column(db.Integer, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    restaurant = db.relationship("Restaurant", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "restaurantId": self.restaurant_id,
            "review": self.review,
            "stars": self.stars,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
