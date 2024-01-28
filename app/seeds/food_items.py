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
            "name": "Exquisite Dish #1",
            "food_pic_url": "https://theluxauthority.com/wp-content/uploads/2018/07/JAAN.png",
            "description": "colorful vegetables arranged in a line with small egg on the side",
            "price": 99.99,
            "restaurant_id": 2,
            "category": "Main"
        },
        {
            "name": "Exquisite Dish #2",
            "food_pic_url": "https://savourblackbookasia.com/wp-content/uploads/2019/07/11-1-1067x800.jpg",
            "description": "lobster with caviar and broth",
            "price": 120.99,
            "restaurant_id": 2,
            "category": "Main"
        },
        {
            "name": "Exquisite Dish #3",
            "food_pic_url": "https://wwd.com/wp-content/uploads/2022/09/Abalone-signature-dish.jpg?w=1000&h=563&crop=1",
            "description": "not quite sure but presentation is amazing!",
            "price": 180.99,
            "restaurant_id": 2,
            "category": "Main"
        },
        {
            "name": "Exquisite Dish #4",
            "food_pic_url": "https://cdn.vox-cdn.com/thumbor/u6jZbre90pzQLCWvqdYZ0tHylIE=/0x103:1440x857/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/21979353/121541684_689816908303991_3389924449216862848_o.jpg",
            "description": "Green soup with foam aand caviar",
            "price": 85.99,
            "restaurant_id": 2,
            "category": "Main"
        },
        {
            "name": "Vegan burger",
            "food_pic_url": "https://biancazapatka.com/wp-content/uploads/2020/05/veganer-bohnen-burger.jpg",
            "description": "vegan burger with impossible patty and vegan cream sauce",
            "price": 10.99,
            "restaurant_id": 3,
            "category": "Main"
        },
        {
            "name": "Vegan Chipotle Chick'n Taquitos with Avocado Crema",
            "food_pic_url": "https://i0.wp.com/www.eatfigsnotpigs.com/wp-content/uploads/2020/08/Chipotle-Chickn-Taquitos-9557.jpg?resize=2400%2C1579",
            "description": "vegan taquitos",
            "price": 10.99,
            "restaurant_id": 3,
            "category": "Main"
        },
        {
            "name": "Stuffed Sweet Potato",
            "food_pic_url": "https://sweetpotatosoul.com/wp-content/uploads/2018/03/Stuffed-Sweet-Potato-5-Ingredient-Vegan-Recipes-1-500x500.jpg",
            "description": "baked sweet potato with fried shallots and other herbs",
            "price": 7.99,
            "restaurant_id": 3,
            "category": "Sides"
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
            "category": "Desserts"
        },
        {
            "name": "Mille-feuille",
            "food_pic_url": "https://img.delicious.com.au/S_FQauzu/del/2017/02/mille-feuille-with-roast-strawberries-and-mascarpone-42029-1.jpg",
            "description": "flaky dessert with roast strawberries and mascarpone",
            "price": 10.99,
            "restaurant_id": 5,
            "category": "Desserts"
        },
        {
            "name": "Creme brulee",
            "food_pic_url": "https://www.recipetineats.com/wp-content/uploads/2016/09/Creme-Brulee_8.jpg",
            "description": "delicious custard pudding with carmelized sugar layer on top",
            "price": 8.99,
            "restaurant_id": 5,
            "category": "Desserts"
        },
        {
            "name": "Chocolate ganache",
            "food_pic_url": "https://img.delicious.com.au/3jtPw4qX/del/2021/08/chocolate-ganache-tart-with-roasted-strawberries-155957-2.jpg",
            "description": "chocolate pie with roasted strawberries",
            "price": 12.99,
            "restaurant_id": 5,
            "category": "Desserts"
        },
        {
            "name": "Kirsch",
            "food_pic_url": "https://substitutecooking.com/wp-content/uploads/2021/03/Kirsch.jpg",
            "description": "cherry liqueur",
            "price": 5.99,
            "restaurant_id": 5,
            "category": "Drinks"
        },
        {
            "name": "Raspberry mimosa cocktail",
            "food_pic_url": "https://www.eatwell101.com/wp-content/uploads/2018/02/mimosa-cocktail-recipe-2.jpg",
            "description": "champaigne infused with raspberries and mint leaves",
            "price": 8.99,
            "restaurant_id": 5,
            "category": "Drinks"
        },
        {
            "name": "Seafood Paella",
            "food_pic_url": "https://www.chocolatesandchai.com/wp-content/uploads/2022/05/Seafood-Paella-Valenciana-Featured.jpg",
            "description": "Spanish rice with seafood",
            "price": 22.99,
            "restaurant_id": 6,
            "category": "Main"
        },
        {
            "name": "Cebiche",
            "food_pic_url": "https://www.peru.travel/Contenido/Noticia/Imagen/en/1035/1.0/Principal/cebiche-peru-2.jpg",
            "description": "seafood with lime and fish stock",
            "price": 16.99,
            "restaurant_id": 6,
            "category": "Sides"
        },
        {
            "name": "Empanada",
            "food_pic_url": "https://hispanickitchen.com/wp-content/uploads/2017/07/Empanadas-de-Rajas_1500-700x500.jpg",
            "description": "Roasted poblano pepper and cheese flour dumplings",
            "price": 12.99,
            "restaurant_id": 6,
            "category": "Sides"
        },
        {
            "name": "Chupe de Camarones",
            "food_pic_url": "https://www.willflyforfood.net/wp-content/uploads/2021/06/peruvian-food-chupe-de-camarones.jpg",
            "description": "spicy Peruvian chupe made with crayfish, rocoto pepper, potatoes, vegetables, milk, and a poached egg",
            "price": 20.99,
            "restaurant_id": 6,
            "category": "Main"
        },
        {
            "name": "Chicken Enchilada",
            "food_pic_url": "https://www.recipetineats.com/wp-content/uploads/2020/03/Chicken-Enchiladas_4.jpg?resize=650,910",
            "description": "enchilada with chicken and cheese",
            "price": 12.99,
            "restaurant_id": 6,
            "category": "Main"
        },
        {
          "name": "Chicken Fajitas",
          "food_pic_url": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-750%2Fd39%2Fsheet-pan-chicken-fajitas-ee8fd752-0619%2Fsheet-pan-chicken-fajitas-ee8fd752-0619_horiz.jpg%3Fitok%3DJahqkKyF",
          "description": "chicken breast grilled with veggies, served in flour tortilla",
          "price": 16.99,
          "restaurant_id": 6,
          "category": "Main"
        },
        {
          "name": "Assorted sushi 1",
          "food_pic_url": "https://dorothy-lane-market.s3.us-east-2.amazonaws.com/general/assorted-sushi-plate-2-of-10_2880x1920.JPEG",
          "description": "sushi and salmon nigiri combination",
          "price": 16.99,
          "restaurant_id": 7,
          "category": "Main"
        },
        {
          "name": "sashimi platter 1",
          "food_pic_url": "https://images.getbento.com/accounts/25fd617895d952103480e78213c748cf/media/images/47981img-23.jpg?w=1200&fit=max&auto=compress,format",
          "description": "tuna, yellowtail, albacore, salmon, sweet shrimp, and inari",
          "price": 25.99,
          "restaurant_id": 7,
          "category": "Main"
        },
        {
          "name": "sashimi platter 2",
          "food_pic_url": "https://www.tripsavvy.com/thmb/eN9qjDJCPt42GWMRX3epHmHvY3M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-508469850-5c32728e4cedfd0001716190.jpg",
          "description": "tuna, mackerel, yellowtail, albacore, salmon, sweet shrimp, and inari",
          "price": 28.99,
          "restaurant_id": 7,
          "category": "Main"
        },
        {
          "name": "Soba noodles",
          "food_pic_url": "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/abura-soba.jpg?itok=DzKjgo8M",
          "description": "buckwheat noodles with light ponzu-mixed sauce",
          "price": 14.99,
          "restaurant_id": 7,
          "category": "Main"
        },
        {
          "name": "Unadon",
          "food_pic_url": "https://www.justonecookbook.com/wp-content/uploads/2021/07/Unadon-Eel-Rice-9592-I-2.jpg",
          "description": "Japanese eel rice",
          "price": 16.99,
          "restaurant_id": 7,
          "category": "Main"
        },
        {
          "name": "Uni maki",
          "food_pic_url": "https://live.staticflickr.com/2310/2145921299_5c0aa19bdb_b.jpg",
          "description": "sea urchin",
          "price": 12.99,
          "restaurant_id": 8,
          "category": "Sides"
        },
        {
          "name": "Salmon sashimi",
          "food_pic_url": "https://rbsushi.com/wp-content/uploads/2020/01/Untitled-design-60.png",
          "description": "raw salmon with ginger and wasabi",
          "price": 15.99,
          "restaurant_id": 8,
          "category": "Main"
        },
        {
          "name": "Assorted sushi",
          "food_pic_url": "https://www.matsuhisarestaurants.com/wp-content/uploads/2019/07/shutterstock_580685365.jpg",
          "description": "assorted sushi with eel, salmon, tuna and shrimp",
          "price": 9.99,
          "restaurant_id": 8,
          "category": "Sides"
        },
        {
          "name": "Yellowtail sashimi",
          "food_pic_url": "https://www.thefoodwonder.com/wp-content/uploads/2022/07/sashimi-types.jpg?ezimgfmt=rs:382x287/rscb1/ngcb1/notWebP",
          "description": "raw yellowtail with wasabi and ginger",
          "price": 16.99,
          "restaurant_id": 8,
          "category": "Main"
        },
        {
          "name": "Tuna sashimi",
          "food_pic_url": "https://media.istockphoto.com/id/1216834462/photo/sashimi-tuna-on-a-stone-board-black-background-top-view-close-up.jpg?s=612x612&w=0&k=20&c=B8-1T9PZIYlWMS_d8q3n44RRqred1TMw8DJSakx65E0=",
          "description": "raw tuna with wasabi and ginger",
          "price": 17.99,
          "restaurant_id": 8,
          "category": "Main"
        },
        {
          "name": "Beef wellington",
          "food_pic_url": "https://www.datocms-assets.com/32685/1647606259-bge17-03-22mattaustin-191.jpg?q=50&auto=format&dpr=1&w=800&h=800&fit=crop",
          "description": "Tender beef fillet swaddled in mushroom duxelles, serrano ham, savoy cabbage and pastry. Gordan approved!",
          "price": 18.99,
          "restaurant_id": 9,
          "category": "Main"
        },
        {
          "name": "Beef brisket",
          "food_pic_url": "https://www.theslowroasteditalian.com/wp-content/uploads/2022/05/perfect-smoked-brisket-square-2795374-500x375.jpg",
          "description": "slow cooked beef brisket with bbq sauce",
          "price": 16.99,
          "restaurant_id": 10,
          "category": "Main"
        },
        {
          "name": "Beef ribs",
          "food_pic_url": "https://betterbegrilled.com/wp-content/uploads/2019/06/20190611_194946.jpg",
          "description": "oven cooked beef ribs with bbq sauce",
          "price": 18.99,
          "restaurant_id": 10,
          "category": "Main"
        },
        {
          "name": "Cole slaw",
          "food_pic_url": "https://i.pinimg.com/originals/35/62/90/3562906f3520b908246a46c88cef1639.jpg",
          "description": "sliced carrots, cilantro, green cabbage and red onions with delicious dressing",
          "price": 18.99,
          "restaurant_id": 10,
          "category": "Main"
        },
        {
          "name": "Omurice with curry",
          "food_pic_url": "https://cdn.vox-cdn.com/thumbor/xZ2WKl3hcAjY3I5zEuyCDVgqiIE=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9858195/o.jpg",
          "description": "curry rice with omelette and pork tonkatsu",
          "price": 15.99,
          "restaurant_id": 11,
          "category": "Main"
        },
        {
          "name": "Omurice with demi glaze",
          "food_pic_url": "https://cdn.tasteatlas.com/images/dishrestaurants/d67d0e2477534774b8c62ef4c79cff2b.jpg?w=600",
          "description": "curry rice with omelette",
          "price": 13.99,
          "restaurant_id": 11,
          "category": "Main"
        },
        {
          "name": "Creamy mushroom pasta",
          "food_pic_url": "https://www.kathysvegankitchen.com/wp-content/uploads/2021/02/Creamy-mushroom-pasta-500x500.jpg",
          "description": "angel hair pasta with mushroom cream sauce",
          "price": 15.99,
          "restaurant_id": 12,
          "category": "Main"
        },
        {
          "name": "Grandma's homemade spaghetti",
          "food_pic_url": "https://www.favfamilyrecipes.com/wp-content/uploads/2021/06/Italian-Spaghetti-10-500x500.jpg",
          "description": "spaghetti with tomato, basil and onion sauce",
          "price": 15.99,
          "restaurant_id": 12,
          "category": "Main"
        },
        {
          "name": "Mushroom Risotto",
          "food_pic_url": "https://www.seriouseats.com/thmb/_Bm7MuoZztRNzPjQv2W7ACWC7OQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20220217-pressure-cooker-mushroom-risotto-mariel-delacruz-082-cd5cc0b0b13f4239aeab86d88df6a1b0.jpg",
          "description": "arborio rice dish with truffles and mixed mushrooms",
          "price": 18.99,
          "restaurant_id": 12,
          "category": "Main"
        },
        {
          "name": "Fancy Pizza",
          "food_pic_url": "https://d332juqdd9b8hn.cloudfront.net/wp-content/uploads/2019/04/2top.jpg",
          "description": "Pizza with all kinds of purple and yellow flowers and decadent cheese",
          "price": 40.99,
          "restaurant_id": 12,
          "category": "Main"
        },
        {
          "name": "Normal Pizza",
          "food_pic_url": "https://cdn.shopify.com/s/files/1/0205/9582/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?crop=center&height=800&v=1644590192&width=800",
          "description": "margherita style pizza with basil and mozzerella cheese",
          "price": 16.99,
          "restaurant_id": 12,
          "category": "Main"
        },
        {
          "name": "Tiramisu",
          "food_pic_url": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/2/4/2/RX-FNM_030111-Sugar-Fix-005_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371597326801.jpeg",
          "description": "Expresso infused cake with layers of light cream and chocolate shreds on top",
          "price": 12.99,
          "restaurant_id": 12,
          "category": "Desserts"
        },
        {
          "name": "Matcha latte",
          "food_pic_url": "https://www.thefirestonect.com/uploads/1/3/6/2/136234642/s452616796791505417_p1471_i1_w600.jpeg",
          "description": "Matcha latte served hot",
          "price": 5.99,
          "restaurant_id": 13,
          "category": "Drinks"
        },
        {
          "name": "Matcha ice cream",
          "food_pic_url": "https://i.pinimg.com/736x/d4/cf/cb/d4cfcbb1832e18fa40a0578fd4300510.jpg",
          "description": "soft swirl ice cream",
          "price": 6.99,
          "restaurant_id": 13,
          "category": "Desserts"
        },
        {
          "name": "Matcha crepe cake",
          "food_pic_url": "https://live.staticflickr.com/65535/46738736845_518e86271b_b.jpg",
          "description": "crepe cake with layers of matcha cream and matcha dust on top",
          "price": 12.99,
          "restaurant_id": 13,
          "category": "Desserts"
        },
        {
          "name": "Chicken tikka masala",
          "food_pic_url": "https://bellyfull.net/wp-content/uploads/2021/05/Chicken-Tikka-Masala-blog.jpg",
          "description": "chicken cream curry with various spices",
          "price": 16.99,
          "restaurant_id": 14,
          "category": "Main"
        },
        {
          "name": "Crispy dosa with chutney",
          "food_pic_url": "https://www.madhuseverydayindian.com/wp-content/uploads/2020/06/crispy-dosa-recipe.jpg",
          "description": "flaky indian breakfast dish with 2 seasoned dips",
          "price": 16.99,
          "restaurant_id": 14,
          "category": "Main"
        },
        {
          "name": "Saffron Rice pudding",
          "food_pic_url": "https://realandvibrant.com/wp-content/uploads/2019/06/Indian-Rice-Pudding-1.jpg",
          "description": "rice pudding with saffron spice and rose leaves",
          "price": 10.99,
          "restaurant_id": 14,
          "category": "Desserts"
        },
        {
          "name": "Swedish meatballs",
          "food_pic_url": "https://insanelygoodrecipes.com/wp-content/uploads/2021/02/Swedish-Meatballs-with-Pomegranate-and-Cream-Sauce-800x530.png",
          "description": "delicious ground beef meatballs with ligonberry",
          "price": 16.99,
          "restaurant_id": 18,
          "category": "Main"
        },
        {
          "name": "Pickled Herrings",
          "food_pic_url": "https://images.ctfassets.net/3s5io6mnxfqz/2i5kobOllwisekVz0qezWh/eff4150308056ab3f116ee6ca820be0c/AdobeStock_284125251.jpeg",
          "description": "pickled fish with onions and herbs",
          "price": 12.99,
          "restaurant_id": 18,
          "category": "Sides"
        },
        {
          "name": "Sour Herring on Toast",
          "food_pic_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbno7p0ckWpyueKw9j21csGpMOzEP660HhpZtCgiuReb8t9opGKbu5Tjr7Nw0gDf5cKzs&usqp=CAU",
          "description": "pickled fish seasoned and served with various garnishes on toast",
          "price": 12.99,
          "restaurant_id": 18,
          "category": "Main"
        },
        {
          "name": "Swedish Salmon Soup",
          "food_pic_url": "https://images.themodernproper.com/billowy-turkey/production/posts/2019/salmon-chowder-14.jpg?w=960&h=960&q=82&fm=jpg&fit=crop&dm=1599769412&s=727b6fb215e9ea9c8241bbc4417514f6",
          "description": "salmon cream soup",
          "price": 14.99,
          "restaurant_id": 18,
          "category": "Sides"
        },
        {
          "name": "Hot Dog 1",
          "food_pic_url": "https://img.taste.com.au/yRysA0eA/w1200-h630-cfill/taste/2016/11/mexican-hot-dogs-103726-1.jpeg",
          "description": "hot dog with avocado",
          "price": 11.99,
          "restaurant_id": 19,
          "category": "Main"
        },
        {
          "name": "Hot Dog 2",
          "food_pic_url": "https://img.taste.com.au/QY9SjlKM/taste/2020/06/july20_mexican-style-hotdogs-162774-1.jpg",
          "description": "hot dog with cheese and chili sauce",
          "price": 11.99,
          "restaurant_id": 19,
          "category": "Main"
        },
        {
          "name": "Steak with Garlic Butter",
          "food_pic_url": "https://www.certifiedirishangus.ie/wp-content/uploads/2020/01/GarlicButter.jpg",
          "description": "pan seared steak",
          "price": 28.99,
          "restaurant_id": 15,
          "category": "Main"
        },
        {
          "name": "Baked Salmon with Dill Sauce",
          "food_pic_url": "https://www.lecremedelacrumb.com/wp-content/uploads/2017/07/lemon-dill-salmon-101.jpg",
          "description": "salmon with dill sauce",
          "price": 26.99,
          "restaurant_id": 15,
          "category": "Main"
        },
        {
          "name": "Prime Rib",
          "food_pic_url": "https://www.rouses.com/wp-content/uploads/2017/11/Prime-Rib.jpg",
          "description": "prime rib",
          "price": 30.99,
          "restaurant_id": 15,
          "category": "Main"
        },
        {
          "name": "Chicken feet",
          "food_pic_url": "https://i.pinimg.com/originals/52/f2/28/52f2281875f799a98b98721061ef35c0.jpg",
          "description": "chicken feet simmered in chile soy sauce",
          "price": 4.99,
          "restaurant_id": 17,
          "category": "Sides"
        },
        {
          "name": "Siu mai",
          "food_pic_url": "https://i.ytimg.com/vi/pXA2H6l-wiA/maxresdefault.jpg",
          "description": "pork and shrimp dumpling, wrapped in an egg noodle-like wrapper",
          "price": 5.99,
          "restaurant_id": 17,
          "category": "Sides"
        },
        {
          "name": "Egg tart",
          "food_pic_url": "https://assets.bonappetit.com/photos/59b807037f7c9a1ef926e5f6/5:7/w_2380,h_3332,c_limit/portuguese-egg-custard-tarts.jpg",
          "description": "egg tart",
          "price": 4.99,
          "restaurant_id": 17,
          "category": "Desserts"
        },
        {
          "name": "Truffle Pasta",
          "food_pic_url": "https://img.delicious.com.au/NkqVZEnH/del/2021/06/three-williams-153685-2.jpg",
          "description": "world's best pasta made with the most expensive ingredient in the world",
          "price": 40.99,
          "restaurant_id": 16,
          "category": "Main"
        },
        {
          "name": "Venison",
          "food_pic_url": "https://ameessavorydish.com/wp-content/uploads/2011/02/Venison-tenderloin-13-e1573841973578.jpg",
          "description": "deer meat with raspberry sauce",
          "price": 20.99,
          "restaurant_id": 21,
          "category": "Main"
        },
        {
          "name": "Kardamom Bun",
          "food_pic_url": "https://thisweekfordinner.com/wp-content/uploads/2018/12/kardemummabullar-recipe-and-step-by-step-final-horiz-this-week-for-dinner-web.jpg",
          "description": "cinammon flavored bun",
          "price": 3.99,
          "restaurant_id": 21,
          "category": "Desserts"
        },
        {
          "name": "Herring on Toast",
          "food_pic_url": "https://girlheartfood.com/wp-content/uploads/2020/08/Smoked-Herring-on-Toast-4-500x500.jpg",
          "description": "herring on toast",
          "price": 8.99,
          "restaurant_id": 21,
          "category": "Sides"
        }
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
