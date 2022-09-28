from app.models import db, User, Restaurant
from datetime import time


def seed_restaurants():
    restaurants = [
        {
            "name": "Tiff's Taiwanese Breakfast",
            "owner_id": 4,
            "price_range": 2,
            "restaurant_pic_url": "https://cdn.vox-cdn.com/thumbor/4bABnrUWHq7qpRHpObaWmjzlnoA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/14636664/Taipei_PhonePhotos_14.jpg",
            "longitude": 50,
            "latitude": -50,
            "email": "tiffany@gmail.com",
            "phone_number": 6261112222,
            "bank_account": 123456789,
            "routing_number": 123456789,
            "category": "Asian",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "Tiff's Michelin Star Restaurant",
            "owner_id": 4,
            "price_range": 2,
            "restaurant_pic_url": "https://robbreport.com/wp-content/uploads/2019/03/auberge_may2014_food_1016.jpg",
            "longitude": 50,
            "latitude": -50,
            "email": "tiffany@gmail.com",
            "phone_number": 6261112222,
            "bank_account": 123456789,
            "routing_number": 123456789,
            "category": "Japanese",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "tiff's vegan delight",
            "owner_id": 4,
            "price_range": 2,
            "restaurant_pic_url": "https://static.thehoneycombers.com/wp-content/uploads/sites/4/2018/07/The-Shady-Shack-vegetarian-vegan-restaurant-in-Bali.jpg",
            "longitude": 50,
            "latitude": -50,
            "email": "tiffany@gmail.com",
            "phone_number": 6261112222,
            "bank_account": 123456789,
            "routing_number": 123456789,
            "category": "American",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "Randy's Pho House",
            "owner_id": 5,
            "price_range": 2,
            "restaurant_pic_url": "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/v1622728130/The-Best-Food-In-Vietnam-Main/The-Best-Food-In-Vietnam-Main.jpg",
            "longitude": 60,
            "latitude": -50,
            "email": "randy@gmail.com",
            "phone_number": 6261112092,
            "bank_account": 123453789,
            "routing_number": 123456789,
            "category": "Asian",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "Ananya's French Bakery",
            "owner_id": 6,
            "price_range": 2,
            "restaurant_pic_url": "https://www.gannett-cdn.com/presto/2022/03/29/PIND/e727e3e6-c73b-4d85-8c1f-0b66b0bbb1b8-_FINALS-19.jpg?width=592&format=pjpg&auto=webp&quality=70",
            "longitude": 10,
            "latitude": -50,
            "email": "ananya@gmail.com",
            "phone_number": 6264112222,
            "bank_account": 323456779,
            "routing_number": 625556789,
            "category": "French",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "Chen Dining",
            "owner_id": 7,
            "price_range": 3,
            "restaurant_pic_url": "https://cdn.vox-cdn.com/thumbor/NylXhUxHg2ZLh31jMbOi9hcMURI=/0x0:5760x3840/1200x900/filters:focal(2420x1460:3340x2380)/cdn.vox-cdn.com/uploads/chorus_image/image/66683596/Atlas_Kitchen_30.0.jpg",
            "longitude": 70,
            "latitude": -50,
            "email": "chen@gmail.com",
            "phone_number": 6251112222,
            "bank_account": 223456999,
            "routing_number": 123432189,
            "category": "Asian",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "Ashley's Japanese Garden",
            "owner_id": 8,
            "price_range": 3,
            "restaurant_pic_url": "https://cdn.pasadenamag.com/wp-content/uploads/sites/69/2021/06/Sunset-Sushi-3.jpg",
            "longitude": 10,
            "latitude": -50,
            "email": "ashley@gmail.com",
            "phone_number": 6264092222,
            "bank_account": 123522789,
            "routing_number": 273456989,
            "category": "Japanese",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "Sabrina's Sushi",
            "owner_id": 9,
            "price_range": 3,
            "restaurant_pic_url": "https://cdn.vox-cdn.com/thumbor/laQ0Mx0jUiZFTstGclCLiHp1IU4=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22520959/kinkan.jpg",
            "longitude": 20,
            "latitude": -30,
            "email": "sabrina@gmail.com",
            "phone_number": 6269022222,
            "bank_account": 123459839,
            "routing_number": 151456789,
            "category": "Japanese",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "Lilith Place",
            "owner_id": 10,
            "price_range": 2,
            "restaurant_pic_url": "https://www.wanderingsunsets.com/wp-content/uploads/2020/03/Copy-of-fall-canada-768x600.png",
            "longitude": 80,
            "latitude": -50,
            "email": "lilith@gmail.com",
            "phone_number": 6266932222,
            "bank_account": 326456789,
            "routing_number": 144456789,
            "category": "French",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "Ben's Southern BBQ",
            "owner_id": 11,
            "price_range": 2,
            "restaurant_pic_url": "https://media-cdn.tripadvisor.com/media/photo-s/1a/be/3a/8a/que-for-two.jpg",
            "longitude": 32,
            "latitude": -50,
            "email": "ben@gmail.com",
            "phone_number": 9091112222,
            "bank_account": 909456789,
            "routing_number": 909456789,
            "category": "American",
            "open_time": time(hour = 9),
            "close_time": time(hour = 18)
        },
        {
            "name": "Ben's Curry Place",
            "owner_id": 11,
            "price_range": 2,
            "restaurant_pic_url": "https://tiffycooks.com/wp-content/uploads/2021/05/Screen-Shot-2021-05-21-at-1.34.23-AM.png",
            "longitude": 9,
            "latitude": -50,
            "email": "ben@gmail.com",
            "phone_number": 9091112222,
            "bank_account": 909456789,
            "routing_number": 909456789,
            "category": "Asian",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
        {
            "name": "Ben's Italian Restaurant",
            "owner_id": 5,
            "price_range": 2,
            "restaurant_pic_url": "https://media.gq-magazine.co.uk/photos/5d4c358fd204430008491403/4:3/w_1136,h_852,c_limit/05-gq-19mar19_b.jpg",
            "longitude": 10,
            "latitude": -50,
            "email": "ben@gmail.com",
            "phone_number": 9091112222,
            "bank_account": 909456789,
            "routing_number": 909456789,
            "category": "Asian",
            "open_time": time(hour = 8),
            "close_time": time(hour = 17)
        },
    ]

    for restaurant in restaurants:
        restaurant = Restaurant(
            name = restaurant["name"],
            owner_id= restaurant["owner_id"],
            price_range = restaurant["price_range"],
            restaurant_pic_url = restaurant["restaurant_pic_url"],
            longitude = restaurant["longitude"],
            latitude = restaurant["latitude"],
            email = restaurant['email'],
            phone_number = restaurant["phone_number"],
            bank_account = restaurant["bank_account"],
            routing_number = restaurant["routing_number"],
            category = restaurant["category"],
            open_time = restaurant["open_time"],
            close_time = restaurant["close_time"]
        )
        db.session.add(restaurant)
    db.session.commit()


def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
