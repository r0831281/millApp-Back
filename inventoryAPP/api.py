from urllib.error import HTTPError
from django.http import JsonResponse
from ninja import Router, NinjaAPI
from inventoryAPP.models import Item, ItemTypes, Bestelling, Location, Dienst, User, Role
from inventoryAPP.schemas import ItemIn, UserIn, ItemOut
from typing import List
import inventoryAPP.auth
from django.contrib.auth.hashers import make_password
from inventoryAPP.auth import AuthBearer
from inventoryAPP.wrappers import admin_required, superadmin_required, scanner_required


router = Router()

@router.get("/hello")
def hello_world(request):
    return JsonResponse({"message": "Hello, world!"})


@router.get("/hello/{name}")
@superadmin_required
def hello_name(request, name: str):
    return JsonResponse({"message": f"Hello, {name}!"})


@router.get("/items", auth=None)
def list_items(request):
    items = Item.objects.all()
    return JsonResponse([{"id": item.id, "name": item.name} for item in items], safe=False)

@router.get("/items/{item_id}")
def get_item(request, item_id: int):
    item = Item.objects.get(id=item_id)
    response = {"id": item.id, "name": item.name, "description": item.description, "code": item.code, "date_inservice": item.date_inservice, "date_outservice": item.date_outservice, "date_scanned": item.date_scanned}
    if item.ItemTypes:
        response["type"] = item.ItemTypes.name
    return JsonResponse(response)

@router.post("/items")
def create_item(request, item_in: ItemIn):
    if item_in.ItemTypes_id:
        item = Item.objects.create(**item_in.dict())
        return JsonResponse({"id": item.id, "name": item.name})
    else:
        return JsonResponse({"error": "Item type is required"}, status=400)
    


#user crud routes

@router.get("/users/{user_id}")
@admin_required
def get_user(request, user_id: int):
    user = User.objects.get(id=user_id)
    response = {"id": user.id, "name": user.name, "role" : user.UserRole.name}
    return JsonResponse(response)

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
@admin_required
def delete_user(request, user_id: int):
    user = User.objects.get(id=user_id)
    user.delete()
    return JsonResponse({"id": user_id, "status": "deleted"})

@router.get("/users")
@admin_required
def list_users(request):
    users = User.objects.all()
    requester = request.auth.get("user")
    response = [{"id": user.id, "name": user.name, "role" : user.UserRole.name} for user in users] + [{"requester": requester.name, "role" : requester.UserRole.name}]
    return JsonResponse(response, safe=False)


@router.post("/users")
def create_user(request, user_in: UserIn):
    user_in.password = make_password(user_in.password)
    user = User.objects.create(**user_in.dict())
    return JsonResponse({"id": user.id, "name": user.name})


api = NinjaAPI(auth=AuthBearer())

api.add_router("/inventory", router)
api.add_router("/auth", inventoryAPP.auth.router)
