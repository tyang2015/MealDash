from flask_wtf import FlaskForm, Form
from wtforms import StringField, SelectField, IntegerField, FloatField, DecimalField, DateTimeField, FormField, FieldList
from wtforms.fields.html5 import TimeField
from wtforms.validators import DataRequired, ValidationError
from app.models import Restaurant, Order, FoodItem

def valid_longitude(form, field):
    longitude = field.data
    if longitude < -180 or longitude > 180:
        raise ValidationError("Invalid longitude")

def valid_latitude(form, field):
    latitude = field.data
    if latitude < -90 or latitude > 90:
        raise ValidationError("Invalid latitude")

def valid_phone_number(form, field):
    phone_number = field.data
    if len(phone_number)!= 14:
        raise ValidationError("Invalid phone number")


# i do not need a form validation for this - you can remove FoodForm
# just parse it from backend with request.json()
# you want as many forms as there food items in the restaurant menu
class FoodForm(Form):
  # if a customer changes this item, i need to find it by id
  id = IntegerField("Food id")
  name = StringField('Item')
  quantity = IntegerField("Quantity")
  price = FloatField("Price")
  preference = StringField("Preference")


class OrderForm(FlaskForm):
  # you will pass the restaurant id in manually yourelf when they submit order
  restaurantId = IntegerField("Restaurant id", validators=[DataRequired()])
  longitude = FloatField("Longitude", validators=[DataRequired(), valid_longitude] )
  latitude = FloatField("Latitude", validators=[DataRequired(), valid_latitude])
  phone_number = StringField("Phone number", validators=[DataRequired(), valid_phone_number])
  credit_card = StringField("Credit Card", validators=[DataRequired()])
  total_price = FloatField("Total Price", validators=[DataRequired()])
  distance = FloatField("Distance")
  duration = IntegerField("Duration")


  def __repr__(self):
    return f"Order Form: food items: {self.order_food_items}, for restaurant {self.restaurantId} "

  def get_number_food_items(self):
    food_items = FoodItem.query.filter(FoodItem.restaurantId == restaurantId).all()
    return len(food_items)

  # order_food_items = FieldList(FormField(FoodForm), min_entries=1)
  # order_food_items = FieldList(FormField(FoodForm), min_entries= get_number_food_items(restaurantId), max_entries= get_number_food_items(restaurantId))
  # order_food_items = FieldList(FormField(FoodForm), min_entries=0, max_entries= 0)
