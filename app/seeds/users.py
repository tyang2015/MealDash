from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        {
           "first_name": "Demo",
           "last_name": "Demo",
           "email": "user1@gmail.com",
            "password": "password",
            "phone_number" : 6162920990
        },
        {
            "first_name": "Demo",
            "last_name": "Demo",
            "email": "user2@gmail.com",
            "password": "password",
            "phone_number" : 6269008765
        },
        {
            "first_name": "Demo",
            "last_name": "Demo",
            "email": "user3@gmail.com",
            "password": "password",
            "phone_number" : 6269998765
        },
        {
            "first_name": "Tiffany",
            "last_name": "Yang",
            "email": "tiffany@gmail.com",
            "password": "password",
            "phone_number" : 6261112222
        },
        {
            "first_name": "Randy",
            "last_name": "Chang",
            "email": "randy@gmail.com",
            "password": "password",
            "phone_number" : 6261112092
        },
        {
            "first_name": "Ananya",
            "last_name": "Bharghava",
            "email": "ananya@gmail.com",
            "password": "password",
            "phone_number" : 2349087563
        },
        {
            "first_name": "Chen",
            "last_name": "Chen",
            "email": "chen@gmail.com",
            "password": "password",
            "phone_number" : 1119008765
        },
        {
            "first_name": "Ashley",
            "last_name": "Yeh",
            "email": "ashley@gmail.com",
            "password": "password",
            "phone_number" : 6264009027
        },
        {
            "first_name": "Sabrina",
            "last_name": "Lee",
            "email": "sabrina@gmail.com",
            "password": "password",
            "phone_number" : 6268773211
        },
        {
            "first_name": "Lilith",
            "last_name": "Lee",
            "email": "lilith@gmail.com",
            "password": "password",
            "phone_number" : 6269093122
        },
        {
            "first_name": "Ben",
            "last_name": "Waldee",
            "email": "ben@gmail.com",
            "password": "password",
            "phone_number" : 2138893122
        },

    ]

    for user in users:
        newUser = User(
            first_name = user["first_name"],
            last_name = user["last_name"],
            email = user["email"],
            password = user["password"],
            phone_number = user["phone_number"]
        )
        db.session.add(newUser)
    db.session.commit()
    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)

    # db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
