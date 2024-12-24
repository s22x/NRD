from django.urls import path
from . import views

app_name="food"

urlpatterns = [
    path('list/', views.all_foods, name='food-list'),
    path('insert/', views.insert_food_item, name='insert-food-item'),
    path('category/', views.food_by_category, name='food_items_by_category'),
    path('categories', views.all_categories, name='all_categories'),
    path('cart/update', views.cart_update, name='cart_update'),
    path('cart/list', views.carts_list, name='carts_list'),
    # path('delete_all/', views.delete_all_food_items, name='delete_all_food_items'),
]