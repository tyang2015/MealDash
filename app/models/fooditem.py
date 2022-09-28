



# class FoodItem(db.Model):
#     __tablename__ = "food_items"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False)
#     food_pic_url = db.Column(db.String, nullable = False)
#     description = db.Column(db.String)
#     # quantity = db.Column(db.Integer, nullable = False)
#     price = db.Column(db.Numeric(scale=2), nullable = False)
#     # order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
#     restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
#     category = db.Column(db.String)

#     # relationships
#     reviews = db.relationship("FoodItemReview", back_populates="food_item", cascade="all,delete")
#     restaurant = db.relationship("Restaurant", back_populates= "food_items")
#     item_orders = db.relationship("Order", back_populates= "food_items", secondary="order_items" )

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "foodPicUrl": self.food_pic_url,
#             "description": self.description,
#             "quantity": self.quantity,
#             "price": self.price,
#             "orderId": self.orderId,
#             "restaurantId": self.restaurant_id,
#             "category": self.category,
#             "price": self.price,
#             "orderQuantity": len(item_orders),
#             "category": self.category
#         }
