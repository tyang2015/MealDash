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
    price_range = field.data
    if price_range < 1 or price_range> 3:
        raise ValidationError("Invalid price range")

def valid_phone_number(form, field):
    phone_number = field.data
    if len(phone_number)!= 14:
        raise ValidationError("Invalid phone number")

def valid_bank_account(form, field):
    bank_account = field.data
    if len(bank_account) < 8 or len(bank_account)> 17:
        raise ValidationError("Invalid Bank account Number")

def valid_routing_number(form, field):
    routing_number = field.data
    if len(routing_number) != 9:
        raise ValidationError("Invalid Routing Number")

# def logo_exists(form, field):
#   logo = field.data
#   existingLogo = Restaurant.query.filter(Restaurant.logo == logo).first()
#   if existingLogo:
#     raise ValidationError("Logo already registered by another user")

# # 00:00:00 => 8 digits
# def valid_open_time(form, field):
#     openTime = field.data

CATEGORY_CHOICES = ["Asian", "American","Breakfast", "Vegan", "Mexican", "Japanese", "Italian", "French", "FastFood", "Ethiopian", "Mediterranean"]

class RestaurantForm(FlaskForm):
    name = StringField("Post Url", validators=[DataRequired()])
    price_range = IntegerField("Price Range", validators=[DataRequired(), valid_price_range])
    restaurant_pic_url = StringField("Restaurant Pic Url", validators=[DataRequired()])
    logo = StringField("Logo", validators=[DataRequired()])
    longitude = DecimalField("Longitude", validators=[DataRequired(), valid_longitude] )
    latitude = DecimalField("Latitude", validators=[DataRequired(), valid_latitude])
    email = StringField("Email", validators=[DataRequired(), valid_email])
    phone_number = StringField("Phone number", validators=[DataRequired(), valid_phone_number])
    bank_account = StringField("Bank Account", validators=[DataRequired(), valid_bank_account])
    routing_number = StringField("Routing Number", validators = [DataRequired(), valid_routing_number])
    category = SelectField("Category", choices=CATEGORY_CHOICES, validators = [DataRequired()])
    open_time = StringField("Opening Time", validators = [DataRequired()])
    close_time = StringField("Closing Time", validators = [DataRequired()])
    # remove after monday
    address = StringField("Address")
