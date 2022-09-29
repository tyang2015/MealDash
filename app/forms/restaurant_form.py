from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, DecimalField, DateTimeField
from wtforms.fields.html5 import TimeField
from wtforms.validators import DataRequired, ValidationError
from app.models import Restaurant

def valid_email(form, field):
    email = field.data
    if "@" not in email:
        raise ValidationError("Invalid email")

def valid_longitude(form, field):
    longitude = field.data
    if longitude < -180 or longitude > 180:
        raise ValidationError("Invalid longitude")

def valid_latitude(form, field):
    latitude = field.data
    if latitude < -90 or latitude > 90:
        raise ValidationError("Invalid latitude")
# 1 to 3
def valid_price_range(form, field):
    priceRange = field.data
    if priceRange < 1 or priceRange> 3:
        raise ValidationError("Invalid price range")

def valid_phone_number(form, field):
    phoneNumber = field.data
    if len(str(phoneNumber))!= 10:
        raise ValidationError("Invalid phone number")

def valid_bank_account(form, field):
    bankAccount = field.data
    if len(str(bankAccount)) < 8 or len(str(bankAccount))> 17:
        raise ValidationError("Invalid Bank account Number")

def valid_routing_number(form, field):
    routingNumber = field.data
    if len(str(routingNumber)) != 9:
        raise ValidationError("Invalid Routing Number")

# # 00:00:00 => 8 digits
# def valid_open_time(form, field):
#     openTime = field.data

CATEGORY_CHOICES = ["Asian", "American","Breakfast", "Vegan", "Mexican", "Japanese", "Italian", "French","Dessert", "FastFood"]

class RestaurantForm(FlaskForm):
    name = StringField("Post Url", validators=[DataRequired()])
    priceRange = IntegerField("Price Range", validators=[DataRequired(), valid_price_range])
    restaurantPicUrl  = StringField("Restaurant Pic Url", validators=[DataRequired()])
    longitude = DecimalField("Longitude", validators=[DataRequired(), valid_longitude] )
    latitude = DecimalField("Latitude", validators=[DataRequired(), valid_latitude])
    email = StringField("Email", validators=[DataRequired(), valid_email])
    phoneNumber = IntegerField("Phone number", validators=[DataRequired(), valid_phone_number])
    bankAccount = IntegerField("Bank Account", validators=[DataRequired(), valid_bank_account])
    routingNumber = IntegerField("Routing Number", validators = [DataRequired(), valid_routing_number])
    category = SelectField("Category", choices=CATEGORY_CHOICES, validators = [DataRequired()])
    openTime = TimeField("Opening Time", validators = [DataRequired()])
    closeTime = TimeField("Closing Time", validators = [DataRequired()])
