from django.db import models
from bson import ObjectId

class User(models.Model):
    id = models.CharField(max_length=24, primary_key=True, default=lambda: str(ObjectId()))
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Store plain password (not recommended)
    # created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username