from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, DecimalField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

def valid_rating(form,field):
  stars = field.data
  if (stars<1 or stars>5):
    raise ValidationError("Invalid star rating")

class ReviewForm(FlaskForm):
  review = StringField("Review content")
  stars = IntegerField("stars", validators=[DataRequired()])
