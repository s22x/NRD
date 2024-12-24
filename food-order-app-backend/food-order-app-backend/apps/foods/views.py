# views.py
from django.http import JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
from .models import FoodItem, Category
from bson import ObjectId  # Import ObjectId from bson
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt  # Import csrf_exempt
from decimal import Decimal
from bson import Decimal128
import json

import logging
logger = logging.getLogger(__name__)

def insert_food_item(request):
    from apps.foods.models import Category, FoodItem

    food_items_data = [
    {"name": "Chicken Burger", "price": 5.99, "description": "Tasty beef burger", "category": "Burgers"},
    {"name": "Chicken Fries", "price": 2.99, "description": "Crispy french fries", "category": "Sides"},
    # Add more items as needed
    ]

    for item in food_items_data:
        category = Category.objects.filter(name=item["category"]).first()
        if not category:
            category = Category(name=item["category"])
            category.save()
        food_item = FoodItem(name=item["name"], price=item["price"], description=item["description"], category=category)
        food_item.save()
    print(f'Added food item: {food_item.name}')
    print("All food items added successfully!")

def all_foods(request):
    # Get all food items from the FoodItem model
    food_items = FoodItem.objects.all()

    # Prepare the food data in a list format
    data = []
    for food in food_items:
        item_data = {
            'id': str(ObjectId(food.id)),  # Convert ObjectId to string explicitly
            'name': food.name,
            'image': food.image,
            'price': float(str(food.price)),  # Convert Decimal128 to string, then to float
            'description': food.description,
            'is_cart': food.is_cart,
            'item_quantity': food.item_quantity,
            'category_name': food.category_name,  # Include the category name
            'created_at': food.created_at
        }
        data.append(item_data)

    return JsonResponse({"food_items": data})


def food_by_category(request):
    # Retrieve category names from query parameters
    category_names = request.GET.getlist('category')  # Example: ?category=Salad&category=Soup
    
    # Fetch food items for the retrieved categories
    food_items = FoodItem.objects.filter(category_name__in=category_names)
    
    # Prepare response data
    data = []
    for food in food_items:
        item_data = {
            'id': str(ObjectId(food.id)),  # Convert ObjectId to string explicitly
            'name': food.name,
            'image': food.image,
            'item_quantity': food.item_quantity,
            'is_cart': food.is_cart,
            'price': float(str(food.price)),  # Convert Decimal128 to string, then to float
            'description': food.description,
            'created_at': food.created_at
        }
        data.append(item_data)
    
    # Return JSON response
    return JsonResponse({"categories": category_names, "food_items": data})



def all_categories(request):
    # Get all categories from the Category model
    categories = Category.objects.all()

    # Prepare the category data in a list format
    category_list = []
    for category in categories:
        category_list.append({
            'id': str(ObjectId(category.id)),  # Convert ObjectId to string explicitly
            'name': category.name
        })

    return JsonResponse({"categories": category_list})

# @require_POST
# def cart_update(request):
#     # Parse JSON data from the request body
#     try:
#         data = json.loads(request.body)
#         food_item_id = data.get('food_item_id')
#         quantity = data.get('quantity')
#         is_cart = data.get('is_cart')
#     except (ValueError, KeyError):
#         return JsonResponse({"error": "Invalid data format"}, status=400)

#     # Validate quantity and is_cart
#     if quantity is None or not isinstance(quantity, int) or quantity < 0:
#         return JsonResponse({"error": "Quantity must be a non-negative integer"}, status=400)
#     if not isinstance(is_cart, bool):
#         return JsonResponse({"error": "is_cart must be a boolean"}, status=400)

#     # Retrieve the food item
#     food_item = get_object_or_404(FoodItem, id=food_item_id)

#     # Update the fields
#     food_item.item_quantity = quantity
#     food_item.is_cart = is_cart
#     food_item.save()

#     # Return the updated data
#     return JsonResponse({
#         "food_item_id": food_item.id,
#         "is_cart": food_item.is_cart,
#         "item_quantity": food_item.item_quantity
#     })

@csrf_exempt  # Exempt this view from CSRF verification
@require_POST
def cart_update(request):
    # Parse JSON data from the request body
    data = json.loads(request.body)
    try:
        data = json.loads(request.body.decode('utf-8'))  # Decode byte string to string before parsing
        food_item_id = data.get('food_item_id') or ''
        quantity = data.get('quantity')
        is_cart = data.get('is_cart')
    except (ValueError, KeyError):
        print(f'Error: {ValueError, KeyError}')
        return JsonResponse({"error": "Invalid data format"}, status=400)
    # Validate quantity and is_cart
    if quantity is None or not isinstance(quantity, int) or quantity < 0:
        return JsonResponse({"error": "Quantity must be a non-negative integer"}, status=400)
    if not isinstance(is_cart, bool):
        return JsonResponse({"error": "is_cart must be a boolean"}, status=400)
    
    # Retrieve the food item
    food_item = get_object_or_404(FoodItem, id=ObjectId(food_item_id))    
    # food_item = get_object_or_404(FoodItem, id=food_item_id)

    # Update the fields
    food_item.item_quantity = quantity     # Changed to 'quantity' to match the model field
    food_item.is_cart = is_cart        # Changed to 'adcard' to match the model field
    # Assuming `food_item.price` is the field with a Decimal128 type
    food_item.price = Decimal(food_item.price.to_decimal())
    # food_item.save()
    food_item.save()

    # Return the updated data
    return JsonResponse({
        "food_item_id": str(ObjectId(food_item.id)),  # Convert ObjectId to string explicitly),
        "is_cart": food_item.is_cart,
        "quantity": food_item.item_quantity
    })



def carts_list(request):
    food_items = FoodItem.objects.all()  # Fetch all food items
    # Filter in Python for items where is_cart is True
    food_items = [food for food in food_items if food.is_cart]    
    data = []
    for food in food_items:
        item_data = {
            'id': str(ObjectId(food.id)),  # Convert ObjectId to string explicitly
            'name': food.name,
            'image': food.image,
            'item_quantity': food.item_quantity,
            'is_cart': food.is_cart,
            'price': float(str(food.price)),  # Convert Decimal128 to string, then to float
            'description': food.description,
            'created_at': food.created_at
        }
        data.append(item_data)

    return JsonResponse({"cart_items": data})


# def delete_all_food_items(request):
#     FoodItem.objects.all().delete()  # Delete all food items
#     return JsonResponse({"message": "All food items deleted successfully!"})