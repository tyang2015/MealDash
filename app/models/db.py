from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# routing nums = 9 digits long
# account nums = 17 digits long

class Restaurants(db.Model):
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
    category = db.Column(db.String)
    open_time = db.Column(db.Time, nullable= False)
    close_time = db.Column(db.Time, nullable = False)
