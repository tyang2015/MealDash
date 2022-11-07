from flask.cli import AppGroup
from .users import seed_users, undo_users
from .food_item_reviews import seed_food_item_reviews, undo_food_item_reviews
from .food_items import seed_food_items, undo_food_items
from .orders import seed_orders, undo_orders
from .restaurants import seed_restaurants, undo_restaurants
from .reviews import seed_reviews, undo_reviews
from .order_food_items import seed_order_food_items, undo_order_food_items


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_restaurants()
    seed_food_items()
    # seed_orders()
    # seed_order_food_items()
    # seed_food_item_reviews()
    seed_reviews()
    print('successfully seeded!')


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_restaurants()
    undo_food_items()
    # undo_orders()
    # undo_order_food_items()
    # undo_food_item_reviews()
    undo_reviews()
