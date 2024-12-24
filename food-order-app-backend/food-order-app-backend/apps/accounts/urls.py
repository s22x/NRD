from django.urls import path
from . import views

urlpatterns = [
    # path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('getall/', views.get_all_users, name='get_all_users'),  # Add this line
    path('register/', views.register, name='register'),
]