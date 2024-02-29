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

for i in range(34):
    data = {
        "title": generate_mens_tshirt_title(),
        "price": fake.random_int(min=100, max=300),
        "description": fake.text(),
        "discount": int(fake.random_int(min=100, max=1000)) / 10,
        "category_name": "t-shirts",
        "category_type": "men",
        "img_url": f"men_T-shirt/men_T-shirt_{i}.WEBP"
    }
    new = Product(**data)
    new.save()
