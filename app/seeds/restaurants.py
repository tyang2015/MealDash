from app.models import db, User, Restaurant
from datetime import time


def seed_restaurants():
    restaurants = [
        {
            "name": "Tiff's Taiwanese Breakfast",
            "owner_id": 4,
            "price_range": 2,
            "restaurant_pic_url": "https://cdn.vox-cdn.com/thumbor/4bABnrUWHq7qpRHpObaWmjzlnoA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/14636664/Taipei_PhonePhotos_14.jpg",
            "logo": "https://s3.amazonaws.com/thumbnails.venngage.com/template/6114cd0a-e706-4e1b-85b5-8aca4c480570.png",
            "longitude": -117.92,
            "latitude": 33.99,
            "email": "tiffany@gmail.com",
            "phone_number": "(626) 111-2222",
            "bank_account": "123456789",
            "routing_number": "123456789",
            "category": "Asian",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Frank & Son Collectible Show, Gale Avenue, Rowland Heights, CA, USA"
        },
        {
            "name": "Tiff's Michelin Star Restaurant",
            "owner_id": 4,
            "price_range": 2,
            "restaurant_pic_url": "https://robbreport.com/wp-content/uploads/2019/03/auberge_may2014_food_1016.jpg",
            "logo": "https://marketplace.canva.com/EAESMsqG9rI/3/0/1600w/canva-grey-%26-green-elegant-minimal-good-taste-food-restaurant-logo-jeSR74GRMC8.jpg",
            "longitude": -118.43,
            "latitude": 34.00,
            "email": "tiffany@gmail.com",
            "phone_number": "(626) 111-2222",
            "bank_account": "123456789",
            "routing_number": "123456789",
            "category": "Japanese",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Ginger's Divine Ice Creams, West Washington Boulevard, Los Angeles, CA, USA"
        },
        {
            "name": "tiff's vegan delight",
            "owner_id": 4,
            "price_range": 2,
            "restaurant_pic_url": "https://static.thehoneycombers.com/wp-content/uploads/sites/4/2018/07/The-Shady-Shack-vegetarian-vegan-restaurant-in-Bali.jpg",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQHjDgKeproadlPd_Gkxr9OBE0IeQrws6Byyp1oRaDzn9ZVKXU1HoAL5XaeQUZPAZct8&usqp=CAU",
            "longitude": -117.89,
            "latitude": 33.91,
            "email": "tiffany@gmail.com",
            "phone_number": "(626) 111-2222",
            "bank_account": "123456789",
            "routing_number": "123456789",
            "category": "American",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "The Cheesecake Factory, Brea Mall, Brea, CA, USA"

        },
        {
            "name": "Randy's Pho House",
            "owner_id": 5,
            "price_range": 2,
            "restaurant_pic_url": "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/v1622728130/The-Best-Food-In-Vietnam-Main/The-Best-Food-In-Vietnam-Main.jpg",
            "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlsAYECocKD5MyKULBRmTWCxjEhm6Oir6YjMYA5ANPQLb0tj08leGtTk9_xH4fe6ey1vs&usqp=CAU",
            "longitude": -117.95,
            "latitude": 33.76,
            "email": "randy@gmail.com",
            "phone_number": "(626) 111-2092",
            "bank_account": "123453789",
            "routing_number": "123456789",
            "category": "Asian",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "iLanet Coffee, Brookhurst Street, Garden Grove, CA, USA"
        },
        {
            "name": "Ananya's French Bakery",
            "owner_id": 6,
            "price_range": 2,
            "restaurant_pic_url": "https://www.gannett-cdn.com/presto/2022/03/29/PIND/e727e3e6-c73b-4d85-8c1f-0b66b0bbb1b8-_FINALS-19.jpg?width=592&format=pjpg&auto=webp&quality=70",
            "logo": "https://www.designfreelogoonline.com/wp-content/uploads/2019/05/food-logo-maker-e1626401320735.jpg",
            "longitude": -117.91,
            "latitude": 33.99,
            "email": "ananya@gmail.com",
            "phone_number": "(626) 411-2222",
            "bank_account": "323456779",
            "routing_number": "625556789",
            "category": "French",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Blossom Soju & Beer, Fullerton Road, Rowland Heights, CA, USA"
        },
        {
            "name": "Chen Dining",
            "owner_id": 7,
            "price_range": 3,
            "restaurant_pic_url": "https://cdn.vox-cdn.com/thumbor/NylXhUxHg2ZLh31jMbOi9hcMURI=/0x0:5760x3840/1200x900/filters:focal(2420x1460:3340x2380)/cdn.vox-cdn.com/uploads/chorus_image/image/66683596/Atlas_Kitchen_30.0.jpg",
            "logo": "https://restaurant.eatapp.co/hubfs/Modern-Restaurant-Logo.jpg",
            "longitude": -118.40,
            "latitude": 34.14,
            "email": "chen@gmail.com",
            "phone_number": "(625) 141-2222",
            "bank_account": "223456999",
            "routing_number": "123432189",
            "category": "Asian",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "GRANVILLE, Ventura Boulevard, Studio City, CA, USA"
        },
        {
            "name": "Ashley's Japanese Garden",
            "owner_id": 8,
            "price_range": 3,
            "restaurant_pic_url": "https://cdn.pasadenamag.com/wp-content/uploads/sites/69/2021/06/Sunset-Sushi-3.jpg",
            "logo": "https://i.pinimg.com/originals/e7/7e/b0/e77eb0c0f0864c44f5ed50ff27ba6926.jpg",
            "longitude": -117.90,
            "latitude": 33.99,
            "email": "ashley@gmail.com",
            "phone_number": "(626) 409-2222",
            "bank_account": "123522789",
            "routing_number": "273456989",
            "category": "Japanese",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Hong Kong Plaza, Colima Road, Rowland Heights, CA, USA"

        },
        {
            "name": "Sabrina's Sushi",
            "owner_id": 9,
            "price_range": 3,
            "restaurant_pic_url": "https://cdn.vox-cdn.com/thumbor/laQ0Mx0jUiZFTstGclCLiHp1IU4=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22520959/kinkan.jpg",
            "logo": "https://www.zilliondesigns.com/blog/wp-content/uploads/Restaurant-Logo-32.jpg",
            "longitude": -118.14,
            "latitude": 34.15,
            "email": "sabrina@gmail.com",
            "phone_number": "(626) 902-2222",
            "bank_account": "123459839",
            "routing_number": "151456789",
            "category": "Japanese",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Tender Greens, East Colorado Boulevard, Pasadena, CA, USA"

        },
        {
            "name": "Lilith Place",
            "owner_id": 10,
            "price_range": 2,
            "restaurant_pic_url": "https://www.wanderingsunsets.com/wp-content/uploads/2020/03/Copy-of-fall-canada-768x600.png",
            "logo": "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_72730158-e1571110735270.png?auto=format&q=60&fit=max&w=930",
            "longitude": 33.91,
            "latitude": -117.85,
            "email": "lilith@gmail.com",
            "phone_number": "(626) 693-2222",
            "bank_account": "326456789",
            "routing_number": "144456789",
            "category": "French",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Mendocino Farms, East Imperial Highway, Brea, CA, USA"

        },
        {
            "name": "Ben's Southern BBQ",
            "owner_id": 11,
            "price_range": 2,
            "restaurant_pic_url": "https://media-cdn.tripadvisor.com/media/photo-s/1a/be/3a/8a/que-for-two.jpg",
            "logo": "http://www.designhill.com/design-blog/wp-content/uploads/2021/11/34.png",
            "longitude": 34.13,
            "latitude": -117.81,
            "email": "ben@gmail.com",
            "phone_number": "(909) 111-2222",
            "bank_account": "909456789",
            "routing_number": "909456789",
            "category": "American",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Pinnacle Peak Steakhouse- San Dimas, West Foothill Boulevard, San Dimas, CA, USA"

        },
        {
            "name": "Ben's Curry Place",
            "owner_id": 11,
            "price_range": 2,
            "restaurant_pic_url": "https://tiffycooks.com/wp-content/uploads/2021/05/Screen-Shot-2021-05-21-at-1.34.23-AM.png",
            "logo": "https://designwithred.com/wp-content/uploads/2020/09/restaurant-logo-2-DesignwithRed.jpg",
            "longitude": 33.67,
            "latitude": -117.85,
            "email": "ben@gmail.com",
            "phone_number": "(909) 111-2222",
            "bank_account": "909456789",
            "routing_number": "909456789",
            "category": "Asian",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Lady M Cake Boutique - Irvine, Michelson Drive b, Irvine, CA"

        },
        {
            "name": "Ben's Italian Restaurant",
            "owner_id": 5,
            "price_range": 2,
            "restaurant_pic_url": "https://media.gq-magazine.co.uk/photos/5d4c358fd204430008491403/4:3/w_1136,h_852,c_limit/05-gq-19mar19_b.jpg",
            "logo": "https://www.logodesign.net/logo/pizza-slice-with-crown-2698ld.png?size=2&industry=restaurant-food",
            "longitude": 33.89,
            "latitude": -117.87,
            "email": "ben@gmail.com",
            "phone_number": "(909) 111-2222",
            "bank_account": "909456789",
            "routing_number": "909456789",
            "category": "Asian",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Popeyes Louisiana Kitchen, Yorba Linda Boulevard, Fullerton, CA, USA"
        },
    ]

    for restaurant in restaurants:
        restaurant = Restaurant(
            name = restaurant["name"],
            owner_id= restaurant["owner_id"],
            price_range = restaurant["price_range"],
            restaurant_pic_url = restaurant["restaurant_pic_url"],
            logo = restaurant["logo"],
            longitude = restaurant["longitude"],
            latitude = restaurant["latitude"],
            email = restaurant['email'],
            phone_number = restaurant["phone_number"],
            bank_account = restaurant["bank_account"],
            routing_number = restaurant["routing_number"],
            category = restaurant["category"],
            open_time = restaurant["open_time"],
            close_time = restaurant["close_time"],
            address = restaurant['address']
        )
        db.session.add(restaurant)
    db.session.commit()


def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
