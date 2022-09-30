from app.models import db, User, FoodItem
from datetime import time
# from .orders import orders_list
import random

food_items_list = []

# def random_orders_list():
#   # how many orders (num is random) it will have
#   max_range = random.randint(0,5)
#   # orders = set()
#   final_orders = []
#   # same food item can appear in multiple orders
#   for i in range(max_range):
#     order = random.choice(orders_list)
#     final_orders.append(order)
#   return final_orders

def seed_food_items():
    global food_items_list
    food_items = [
        {
            "name": "Beef Noodle Soup",
            "food_pic_url": "https://assets.bonappetit.com/photos/5e46caf4baec0e000820349c/1:1/w_2560%2Cc_limit/0220-French-Onion-Soup-single-lede.jpg",
            "description": "beef noodle soup with good broth",
            "price": 12.99,
            "restaurant_id": 1,
            "category": "Main"
        },
        {
            "name": "Ba wan",
            "food_pic_url": "http://i2.cdn.turner.com/cnnnext/dam/assets/150520113255-best-taiwanese-food--12ba-wan-exlarge-169.jpg",
            "description": "taiwanese meatball with glutinous wrapping",
            "price": 6.99,
            "restaurant_id": 1,
            "category": "Main"
        },
        {
            "name": "Xiao long bao",
            "food_pic_url": "https://a.cdn-hotels.com/gdcs/production99/d1717/a69cb3c1-1930-410b-9097-583ecb3c4dc3.jpg",
            "description": "small juicy pork dumplings",
            "price": 12.99,
            "restaurant_id": 1,
            "category": "Main"
        },
        {
            "name": "tofu and thousand year egg",
            "food_pic_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrrnAvkg4lU9xpRz9ACF5NUiyhC8y6N27M9Q&usqp=CAU",
            "description": "tofu with preserved eggs, topped with soy sauce and oyster sauce",
            "price": 10.99,
            "restaurant_id": 1,
            "category": "Main"
        },
        {
            "name": "Boba",
            "food_pic_url": "https://www.honestfoodtalks.com/wp-content/uploads/2021/09/Boba-tea-recipe-using-fresh-tapioca-pearls-1024x1024.jpeg",
            "description": "boba milk tea",
            "price": 4.99,
            "restaurant_id": 1,
            "category": "Drinks"
        },
        {
            "name": "Oolong Tea",
            "food_pic_url": "https://www.lipton.com/content/dam/unilever/lipton_international/global/general_image/worldtea_teatype_puerh_ooolang_img1_1460x593-1437923-jpg.jpg",
            "description": "oolong tea",
            "price": 4.99,
            "restaurant_id": 1,
            "category": "Drinks"
        },
        {
            "name": "Jasmine Tea",
            "food_pic_url": "https://cdn.shopify.com/s/files/1/0415/5182/3016/articles/5dbdee2cc2ce783b6156f649_5ae9ff6e873cad3113dcc848_yun-niang-fresh-in-mind-2123308_960_720_960x.jpeg?v=1596650969",
            "description": "jasmine tea",
            "price": 4.99,
            "restaurant_id": 1,
            "category": "Drinks"
        },
        {
            "name": "Khao Soi",
            "food_pic_url": "https://assets.bonappetit.com/photos/57adf6d053e63daf11a4e015/master/pass/chicken-khao-soi1.jpg",
            "description": "thai curry like broth with egg noodles",
            "price": 16.99,
            "restaurant_id": 4,
            "category": "Main"
        },
        {
            "name": "Pho",
            "food_pic_url": "https://www.recipetineats.com/wp-content/uploads/2019/04/Beef-Pho_6.jpg",
            "description": "beef noodle soup with vermicilli noodles",
            "price": 12.99,
            "restaurant_id": 4,
            "category": "Main"
        },
        {
            "name": "Macaron",
            "food_pic_url": "https://sugargeekshow.com/wp-content/uploads/2018/01/french-macaron-recipe-500x375.jpg",
            "description": "delicious french pastry with filling",
            "price": 3.99,
            "restaurant_id": 5,
            "category": "Main"
        },

    ]

    for item in food_items:
        food = FoodItem(
            name= item["name"],
            food_pic_url= item["food_pic_url"],
            description = item["description"],
            price = item["price"],
            restaurant_id = item["restaurant_id"],
            category = item["category"],
            # added here
            # orders = random_orders_list()
        )
        food_items_list.append(food)
        db.session.add(food)
    db.session.commit()
    print('food items seeded!')


def undo_food_items():
    db.session.execute('TRUNCATE food_items RESTART IDENTITY CASCADE;')
    db.session.commit()
