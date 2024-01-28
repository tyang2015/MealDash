from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, DecimalField, DateTimeField
# from wtforms.fields.html5 import TimeField
from wtforms.validators import DataRequired, ValidationError

def valid_description(form, field):
    description = field.data
    if len(description)>500:
      raise ValidationError("Description length must be less than 500 chars")

def valid_price(form, field):
  price = field.data
  if price > 25000:
    raise ValidationError("Price must be less than $25,000")

FOOD_ITEM_CATEGORIES = ["Main", "Sides", "Drinks", "Desserts"]

class FoodItemForm(FlaskForm):
  name = StringField("Food Name", validators=[DataRequired()])
  food_pic_url = StringField("Food Pic Url",  validators=[DataRequired()])
  restaurant_id = IntegerField("restaurant id", validators=[DataRequired()])
  description = StringField("Description", validators=[valid_description])
  price = DecimalField("Price", validators=[DataRequired()])
  category = SelectField("Food Category", choices = FOOD_ITEM_CATEGORIES )
