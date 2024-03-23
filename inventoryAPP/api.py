from urllib.error import HTTPError
from django.http import JsonResponse
from ninja import Router, NinjaAPI
from inventoryAPP.models import Item, ItemTypes, Bestelling, Location, Dienst, User, Role
from inventoryAPP.schemas import ItemIn, UserIn, ItemOut, UserOut
from typing import List
import inventoryAPP.auth
from django.contrib.auth.hashers import make_password
from inventoryAPP.auth import AuthBearer
from inventoryAPP.wrappers import admin_required, superadmin_required, scanner_required
import inventoryAPP.itemsApi
import inventoryAPP.locationApi


router = Router()

@router.get("/hello")
def hello_world(request):
    return JsonResponse({"message": "Hello, world!"})


@router.get("/hello/{name}")
@superadmin_required
def hello_name(request, name: str):
    return JsonResponse({"message": f"Hello, {name}!"})


#user crud routes

@router.get("/users/{user_id}")
@admin_required
def get_user(request, user_id: int):
    user = User.objects.get(id=user_id)
    response = {"id": user.id, "name": user.name, "role" : user.UserRole.name}
    return JsonResponse(response)

@router.get("/users", response=List[UserOut])
@admin_required
def list_users(request):
    users = User.objects.select_related("UserRole")
    users = users.order_by("id")
    return users

@router.put("/users/{user_id}")
@admin_required
def update_user(request, user_id: int, user_in: UserIn):
    user = User.objects.get(id=user_id)
    user.name = user_in.name
    user.password = make_password(user_in.password)
    user.UserRole = Role.objects.get(id=user_in.UserRole_id)
    user.save()
    return JsonResponse({"id": user.id, "name": user.name})

@router.delete("/users/{user_id}")
@superadmin_required
def delete_user(request, user_id: int):
    user = User.objects.get(id=user_id)
    user.delete()
    return JsonResponse({"id": user_id, "status": "deleted"})


@router.post("/users")
@superadmin_required
def create_user(request, user_in: UserIn):
    user_in.password = make_password(user_in.password)
    user = User.objects.create(**user_in.dict())
    return JsonResponse({"id": user.id, "name": user.name})


api = NinjaAPI(auth=AuthBearer(), csrf=False)

api.add_router("/v1", router)
api.add_router("/auth", inventoryAPP.auth.router)
api.add_router("/items", inventoryAPP.itemsApi.router)
api.add_router("/locations", inventoryAPP.locationApi.router)

