from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from bson import ObjectId
from .models import User
from datetime import datetime  # Updated import
from django.views.decorators.http import require_POST

import logging


# Configure logging for debugging
logger = logging.getLogger(__name__)

@csrf_exempt
@require_POST
def register(request):
    if request.method == 'POST':
        try:
            # Parse the request body
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            if not username or not email or not password:
                return JsonResponse({'error': 'All fields (username, email, password) are required'}, status=400)

            try:
                User.objects.get(username__iexact=username)
                return JsonResponse({'error': 'Username already exists'}, status=400)
            except User.DoesNotExist:
                pass
            
            user = User(
                username=username,
                email=email,
                password=password,
            )
            user.save()
            return JsonResponse({'message': 'User registered successfully'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            logger.error(f"Error while registering user: {str(e)}", exc_info=True)
            return JsonResponse({'error': f'Failed to register user: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            # Basic validation
            if not username or not password:
                return JsonResponse({'error': 'Username and password are required'}, status=400)

            # Authenticate user
            try:
                user = User.objects.get(username=username)

                # Verify the password
                if not password == user.password:
                    return JsonResponse({'error': 'Invalid username or password'}, status=401)

                # Generate JWT token
                payload = {
                    'user_id': user.id,
                    'username': user.username,
                    'exp': datetime.utcnow() + timedelta(seconds=settings.JWT_EXPIRATION_SECONDS),
                }
                token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

                return JsonResponse({'message': 'Login successful','user':username, 'token': token, }, status=200)

            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid username or password'}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


# Get All Users API
@csrf_exempt
def get_all_users(request):
    if request.method == 'GET':
        try:
            users = User.objects.all().values('id', 'username', 'email')
            users_list = list(users)  # Convert QuerySet to list of dictionaries
            return JsonResponse({'users': users_list}, encoder=DjangoJSONEncoder, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Failed to fetch users: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)