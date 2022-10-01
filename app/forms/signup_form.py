from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_phone_number(form, field):
    phoneNumber = field.data
    if len(phoneNumber)!= 14:
        raise ValidationError("Invalid phone number")

def valid_email(form, field):
  email = field.data
  if "@" not in email:
    raise ValidationError("Invalid email")

class SignUpForm(FlaskForm):
    # username = StringField(
    #     'username', validators=[DataRequired(), username_exists])
    firstName = StringField('First Name', validators=[DataRequired()])
    lastName = StringField('Last Name', validators=[DataRequired()] )
    phoneNumber = StringField("Phone number", validators=[DataRequired(), valid_phone_number])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired()])
