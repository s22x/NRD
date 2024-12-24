
from djongo import models
from bson import ObjectId


class Category(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=255, unique=True)  # Enforce unique names

class FoodItem(models.Model):
    # id = models.ObjectIdField(primary_key=True, editable=False)
    id = models.CharField(max_length=24, primary_key=True, default=lambda: str(ObjectId()))
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=255)  # You can use a FileField if you're storing actual image files
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    item_quantity = models.IntegerField(default=0)  # Default quantity set to 0
    is_cart = models.BooleanField(default=False)    
    category_name = models.CharField(max_length=255)  # Store the category name directly
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.name} - {self.category_name}"
