from django.http import JsonResponse
from ninja import Router, NinjaAPI
from inventoryAPP.models import Item
from inventoryAPP.schemas import ItemIn

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
    return JsonResponse({"id": item.id, "name": item.name})

@router.post("/items")
def create_item(request, item_in: ItemIn):
    item = Item.objects.create(**item_in.dict())
    return JsonResponse({"id": item.id, "name": item.name})

api = NinjaAPI()

api.add_router("/inventory", router)