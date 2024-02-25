from django.http import JsonResponse
from ninja import Router, NinjaAPI
from inventoryAPP.models import Item, ItemTypes, Bestelling, Location, Dienst, User, Role
from inventoryAPP.schemas import ItemIn, UserIn, ItemOut
from typing import List
import inventoryAPP.auth
from django.contrib.auth.hashers import make_password

router = Router()

@router.get("/hello")
def hello_world(request):
    return JsonResponse({"message": "Hello, world!"})

@router.get("/hello/{name}")
def hello_name(request, name: str):
    return JsonResponse({"message": f"Hello, {name}!"})


@router.get("/items")
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
    item = Item.objects.create(**item_in.dict())
    return JsonResponse({"id": item.id, "name": item.name})

@router.get("/users")
def list_users(request):
    users = User.objects.all()
    return JsonResponse([{"id": user.id, "name": user.name, "pass" : user.password} for user in users], safe=False)
@router.post("/users")
def create_user(request, user_in: UserIn):
    user_in.password = make_password(user_in.password)
    user = User.objects.create(**user_in.dict())
    return JsonResponse({"id": user.id, "name": user.name})

from inventoryAPP.auth import AuthBearer

api = NinjaAPI(auth=AuthBearer())

api.add_router("/inventory", router)
api.add_router("/auth", inventoryAPP.auth.router)