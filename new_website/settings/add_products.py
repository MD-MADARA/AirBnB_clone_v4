#!/usr/bin/python3
from models.product import Product
from faker import Faker


fake = Faker()

def generate_womens_suit_title():
    prefix = fake.random_element(['Elegant', 'Stylish', 'Chic', 'Fashionable', 'Sophisticated'])
    suffix = fake.random_element(['Suit', 'Blazer', 'Formal Wear', 'Business Attire', 'Professional Outfit'])
    return f"{prefix} {suffix}"

def generate_mens_tshirt_title():
    prefix = fake.random_element(['Casual', 'Cool', 'Graphic', 'Vintage', 'Urban'])
    suffix = fake.random_element(['T-shirt', 'Top', 'Shirt', 'Tee'])
    return f"{prefix} {suffix}"

def generate_mens_sweater_title():
    prefix = fake.random_element(['Warm', 'Cozy', 'Stylish', 'Classic', 'Knit'])
    suffix = fake.random_element(['Sweater', 'Pullover', 'Knitwear', 'Jumper'])
    return f"{prefix} {suffix}"

def generate_mens_shorts_title():
    prefix = fake.random_element(['Casual', 'Sporty', 'Stylish', 'Active', 'Comfortable'])
    suffix = fake.random_element(['Shorts', 'Bottoms', 'Trunks', 'Sport Shorts'])
    return f"{prefix} {suffix}"

def generate_womens_jeans_title():
    prefix = fake.random_element(['Classic', 'Skinny', 'High-Waisted', 'Distressed', 'Bootcut'])
    suffix = fake.random_element(['Jeans', 'Denim', 'Pants'])
    return f"{prefix} {suffix}"

def generate_mens_jeans_title():
    prefix = fake.random_element(['Classic', 'Straight', 'Slim Fit', 'Relaxed Fit', 'Rugged'])
    suffix = fake.random_element(['Jeans', 'Denim', 'Pants'])
    return f"{prefix} {suffix}"

def generate_womens_dress_title():
    prefix = fake.random_element(['Elegant', 'Floral', 'Maxi', 'Wrap', 'A-Line'])
    suffix = fake.random_element(['Dress', 'Gown', 'Frock', 'Maxi', 'Tunic'])
    return f"{prefix} {suffix}"

# 25 Men Short
for i in range(25):
    data = {
        "title": generate_mens_shorts_title(),
        "price": fake.pyfloat(min_value=10, max_value=40, right_digits=2),
        "description": fake.text(),
        "discount": fake.random_int(min=50, max=75),
        "category_name": "Short",
        "category_type": "Men",
    }
    new = Product(**data)
    new.save()

# 115 Women Suit
for i in range(115):
    data = {
        "title": generate_womens_suit_title(),
        "price": fake.pyfloat(min_value=30, max_value=200, right_digits=2),
        "description": fake.text(),
        "discount": fake.random_int(min=30, max=75),
        "category_name": "Suit",
        "category_type": "Women",
    }
    new = Product(**data)
    new.save()

# 34 Men T-shirt
for i in range(34):
    data = {
        "title": generate_mens_tshirt_title(),
        "price": fake.pyfloat(min_value=5, max_value=60, right_digits=2),
        "description": fake.text(),
        "discount": fake.random_int(min=25, max=65),
        "category_name": "T-shirt",
        "category_type": "Men",
    }
    new = Product(**data)
    new.save()

# 7 Men Sweater
for i in range(7):
    data = {
        "title": generate_mens_sweater_title(),
        "price": fake.pyfloat(min_value=5, max_value=60, right_digits=2),
        "description": fake.text(),
        "discount": fake.random_int(min=25, max=65),
        "category_name": "Sweater",
        "category_type": "Men",
    }
    new = Product(**data)
    new.save()

# 1 Women Sweater
for i in range(1):
    data = {
        "title": "Solid Ribbed Knit Sweater",
        "price": 18.09,
        "description": fake.text(),
        "discount": 31,
        "category_name": "Sweater",
        "category_type": "Women",
    }
    new = Product(**data)
    new.save()

# 92 Women Jeans
for i in range(92):
    data = {
        "title": generate_womens_jeans_title(),
        "price": fake.pyfloat(min_value=20, max_value=50, right_digits=2),
        "description": fake.text(),
        "discount": fake.random_int(min=25, max=65),
        "category_name": "Jeans",
        "category_type": "Women",
    }
    new = Product(**data)
    new.save()

# 64 Men Jeans
for i in range(64):
    data = {
        "title": generate_mens_jeans_title(),
        "price": fake.pyfloat(min_value=20, max_value=50, right_digits=2),
        "description": fake.text(),
        "discount": fake.random_int(min=25, max=65),
        "category_name": "Jeans",
        "category_type": "Men",
    }
    new = Product(**data)
    new.save()

# 27 Women Dress
for i in range(27):
    data = {
        "title": generate_womens_dress_title(),
        "price": fake.pyfloat(min_value=50, max_value=100, right_digits=2),
        "description": fake.text(),
        "discount": fake.random_int(min=25, max=40),
        "category_name": "Dress",
        "category_type": "Women",
    }
    new = Product(**data)
    new.save()
