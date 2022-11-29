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
            "name": "Ashley's Mexican Fine Dining",
            "owner_id": 8,
            "price_range": 3,
            "restaurant_pic_url": "https://cdn.vox-cdn.com/thumbor/NylXhUxHg2ZLh31jMbOi9hcMURI=/0x0:5760x3840/1200x900/filters:focal(2420x1460:3340x2380)/cdn.vox-cdn.com/uploads/chorus_image/image/66683596/Atlas_Kitchen_30.0.jpg",
            "logo": "https://restaurant.eatapp.co/hubfs/Modern-Restaurant-Logo.jpg",
            "longitude": -118.40,
            "latitude": 34.14,
            "email": "ashley@gmail.com",
            "phone_number": "(625) 141-2222",
            "bank_account": "223456999",
            "routing_number": "123432189",
            "category": "Mexican",
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
            "longitude": -117.85,
            "latitude": 33.91,
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
            "longitude": -117.81,
            "latitude": 34.13,
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
            "longitude": -117.85,
            "latitude": 33.67,
            "email": "ben@gmail.com",
            "phone_number": "(909) 111-2222",
            "bank_account": "909456789",
            "routing_number": "909456789",
            "category": "Japanese",
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
            "longitude": -117.87,
            "latitude": 33.89,
            "email": "ben@gmail.com",
            "phone_number": "(909) 111-2222",
            "bank_account": "909456789",
            "routing_number": "909456789",
            "category": "Italian",
            "open_time": "08:00:00",
            "close_time": "17:00:00",
            "address": "Popeyes Louisiana Kitchen, Yorba Linda Boulevard, Fullerton, CA, USA"
        },
        {
          "name": "Ananya's Matcha Garden",
          "owner_id": 6,
          "price_range": 3,
          "restaurant_pic_url": "https://glitz.beautyinsider.sg/wp-content/uploads/2022/03/3rd-6-2-1024x536.png",
          "logo": "https://t4.ftcdn.net/jpg/05/34/69/87/360_F_534698790_r2IKkgQTthvoESblhBYv4haTdqZlTx1d.jpg",
          "longitude": -122.42,
          "latitude": 37.76,
          "email": "ananya@gmail.com",
          "phone_number": "(909) 111-2222",
          "bank_account": "976456789",
          "routing_number": "911456789",
          "category": "Japanese",
          "open_time": "09:00:00",
          "close_time": "18:00:00",
          "address": "Mission Dolores, San Francisco, CA"
        },
        {
          "name": "Emily's Indian Bistro",
          "owner_id": 12,
          "price_range": 4,
          "restaurant_pic_url": "https://res.cloudinary.com/sagacity/image/upload/c_crop,h_3333,w_5000,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/KricketClub_Amber-Fouts_057A6492_ixhaqc.jpg",
          "logo": "https://dynamic.brandcrowd.com/asset/logo/6cc0fdef-3fe7-4d1d-900d-e7f884b7bb8d/logo-search-grid-1x?v=637936305229930000",
          "longitude": -122.42,
          "latitude": 37.76,
          "email": "emily@gmail.com",
          "phone_number": "(909) 111-2222",
          "bank_account": "909456789",
          "routing_number": "909456789",
          "category": "Asian",
          "open_time": "09:00:00",
          "close_time": "18:00:00",
          "address": "3049 20th St, San Francisco, CA 94110"
        },
        {
          "name": "Randy's American Dream",
          "owner_id": 4,
          "price_range": 3,
          "restaurant_pic_url": "https://www.maczfit.pl/blog/wp-content/uploads/2021/03/fast_food-960x639.jpeg",
          "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSF3DJHdVeFLiPOAbyHTrCPnQ2HNeCDus6qbCf9qZM7yg28V_Eo-qrvjC-QngCrMTigHE&usqp=CAU",
          "longitude": -122.45,
          "latitude": 37.72,
          "email": "randy@gmail.com",
          "phone_number": "(919) 111-2222",
          "bank_account": "929456789",
          "routing_number": "909433389",
          "category": "American",
          "open_time": "09:00:00",
          "close_time": "18:00:00",
          "address": "1540 Ocean Ave, San Francisco, CA 94112"
        },
        {
          "name": "Ashley's Italian Theatre and Dining",
          "owner_id": 8,
          "price_range": 2,
          "restaurant_pic_url": "https://media.timeout.com/images/105856825/image.jpg",
          "logo": "https://cdn2.vectorstock.com/i/1000x1000/35/21/seafood-restaurant-logo-red-crab-silhouette-emblem-vector-20193521.jpg",
          "longitude": -122.43,
          "latitude": 37.72,
          "email": "ashley@gmail.com",
          "phone_number": "(908) 111-2222",
          "bank_account": "949456789",
          "routing_number": "911456789",
          "category": "Italian",
          "open_time": "09:00:00",
          "close_time": "18:00:00",
          "address": "4476 Mission St #1950, San Francisco, CA 94112"
        },
        {
          "name": "Sabrina's Dim Sum",
          "owner_id": 9,
          "price_range": 3,
          "restaurant_pic_url": "https://www.theglassmagazine.hk/wp-content/uploads/2020/01/dimsum.jpg",
          "logo": "https://cdn5.vectorstock.com/i/thumb-large/18/49/b-letter-mark-fork-food-restaurant-logo-icon-vector-37541849.jpg",
          "longitude": -122.40,
          "latitude": 37.72,
          "email": "sabrina@gmail.com",
          "phone_number": "(908) 111-2222",
          "bank_account": "949456789",
          "routing_number": "911456789",
          "category": "Asian",
          "open_time": "09:00:00",
          "close_time": "18:00:00",
          "address": "2520 San Bruno Ave, San Francisco, CA 94134"
        },
        {
          "name": "Tiff's Swedish/Asian Fusion",
          "owner_id": 4,
          "price_range": 3,
          "restaurant_pic_url": "https://foodandnutrition.org/wp-content/uploads/MGTSweden-780x520.jpg",
          "logo": "https://img.myloview.com/posters/vintage-restaurant-logo-design-inspiration-vector-illustration-700-148963696.jpg",
          "longitude": -90.06,
          "latitude": 29.95,
          "email": "tiffany@gmail.com",
          "phone_number": "(908) 111-2222",
          "bank_account": "949456789",
          "routing_number": "911456789",
          "category": "Asian",
          "open_time": "09:00:00",
          "close_time": "18:00:00",
          "address": "Bourbon St, New Orleans, LA 70130"
        },
        {
          "name": "Ananya's Mexican Hot Dogs",
          "owner_id": 6,
          "price_range": 2,
          "restaurant_pic_url": "https://www.foodandwine.com/thmb/Au_zD0Qmb5sD5NWLOuktc5MPg1E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chorizo-and-kimchi-dogs-FT-RECIPE0819-74abcc92e9154e729c7e98e248daa3c7.jpg",
          "logo": "https://i.pinimg.com/736x/2e/e7/0f/2ee70fdf94cc1e52b17fa738f1e4fd62.jpg",
          "longitude": -74.00,
          "latitude": 40.74,
          "email": "ananya@gmail.com",
          "phone_number": "(908) 111-2222",
          "bank_account": "949456789",
          "routing_number": "911456789",
          "category": "Mexican",
          "open_time": "09:00:00",
          "close_time": "18:00:00",
          "address": "200 Magazine St, New Orleans, LA 70130"
        },
        {
          "name": "Madame B's Sanctuary",
          "owner_id": 1,
          "price_range": 3,
          "restaurant_pic_url": "https://media-cdn.tripadvisor.com/media/photo-s/15/11/fe/1c/sushi-boats-order-your.jpg",
          "logo": "https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_51207186-e1571403645427.png?auto=format&q=60&fit=max&w=930",
          "longitude": -73.98,
          "latitude": 40.72,
          "email": "emily@gmail.com",
          "phone_number": "(908) 111-2222",
          "bank_account": "949456789",
          "routing_number": "911456789",
          "category": "Japanese",
          "open_time": "09:00:00",
          "close_time": "18:00:00",
          "address": "179 E Houston St, New York, NY 10002"
        },
        {
          "name": "Tiff's Inspiration from Gamla Stan",
          "owner_id": 4,
          "price_range": 3,
          "restaurant_pic_url": "https://ubiquinol.org/sites/default/files/swedish-food-2.jpg",
          "logo": "https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/2660/posts/32688/image-upload/restaurant_logo_templates_9NMUUK.jpeg",
          "longitude": -120.14028974222194,
          "latitude": 34.595098799788275,
          "email": "tiffany@gmail.com",
          "phone_number": "(908) 111-2222",
          "bank_account": "949456789",
          "routing_number": "911456789",
          "category": "Asian",
          "open_time": "09:00:00",
          "close_time": "18:00:00",
          "address": "1660 Copenhagen Dr, Solvang, CA 93463"
        }
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
