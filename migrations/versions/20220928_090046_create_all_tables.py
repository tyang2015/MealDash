"""create all tables

Revision ID: 3a50bcd2cd69
Revises: 
Create Date: 2022-09-28 09:00:46.382643

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3a50bcd2cd69'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('phone_number', sa.Integer(), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('restaurants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('price_range', sa.Integer(), nullable=False),
    sa.Column('restaurant_pic_url', sa.String(), nullable=False),
    sa.Column('longitude', sa.Numeric(scale=2), nullable=False),
    sa.Column('latitude', sa.Numeric(scale=2), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('phone_number', sa.Integer(), nullable=False),
    sa.Column('bank_account', sa.Integer(), nullable=False),
    sa.Column('routing_number', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(), nullable=False),
    sa.Column('open_time', sa.Time(), nullable=False),
    sa.Column('close_time', sa.Time(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('food_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('food_pic_url', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('price', sa.Numeric(scale=2), nullable=False),
    sa.Column('restaurant_id', sa.Integer(), nullable=True),
    sa.Column('category', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.Column('restaurant_id', sa.Integer(), nullable=True),
    sa.Column('longitude', sa.Numeric(scale=2), nullable=False),
    sa.Column('latitude', sa.Numeric(scale=2), nullable=False),
    sa.Column('phone_number', sa.Integer(), nullable=False),
    sa.Column('credit_card', sa.Integer(), nullable=False),
    sa.Column('total_price', sa.Numeric(scale=2), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('restaurant_id', sa.Integer(), nullable=True),
    sa.Column('review', sa.String(), nullable=True),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('food_item_reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('food_item_id', sa.Integer(), nullable=True),
    sa.Column('liked', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['food_item_id'], ['food_items.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_items',
    sa.Column('orders', sa.Integer(), nullable=False),
    sa.Column('food_items', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['food_items'], ['food_items.id'], ),
    sa.ForeignKeyConstraint(['orders'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('orders', 'food_items')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order_items')
    op.drop_table('food_item_reviews')
    op.drop_table('reviews')
    op.drop_table('orders')
    op.drop_table('food_items')
    op.drop_table('restaurants')
    op.drop_table('users')
    # ### end Alembic commands ###
