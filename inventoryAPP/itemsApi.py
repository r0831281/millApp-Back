from ninja import Router
from django.http import JsonResponse
from inventoryAPP.models import Item, ItemTypes
from inventoryAPP.schemas import ItemIn, itemTypesIn, ItemOut
import datetime
from inventoryAPP.wrappers import admin_required, scanner_required, superadmin_required

router = Router()

@router.get("/list")
def list_items(request):
    items = Item.objects.all()
    return JsonResponse([{"id": item.id, "name": item.name} for item in items], safe=False)

@router.get("/add/{item_id}")
def get_item(request, item_id: int):
    item = Item.objects.get(id=item_id)
    response = {"id": item.id, "name": item.name, "description": item.description, "code": item.code, "date_inservice": item.date_inservice, "date_outservice": item.date_outservice, "date_scanned": item.date_scanned}
    if item.ItemTypes:
        response["type"] = item.ItemTypes.name
    return JsonResponse(response)

@router.post("/create")
@admin_required
def create_item(request, item_in: ItemIn):
    if item_in.ItemTypes_id:
        item = Item.objects.create(**item_in.dict())
        item.date_scanned = None
        return JsonResponse({"id": item.id, "name": item.name})
    else:
        return JsonResponse({"error": "Item type is required"}, status=400)
    
@router.post("/scan/{item_id}")
@scanner_required
def scan_item(request, item_id: int):
    item = Item.objects.get(id=item_id)
    item.date_scanned = datetime.datetime.now()
    item.save()
    return JsonResponse({"id": item.id, "name": item.name, "date_scanned": item.date_scanned})

@router.put("/put/{item_id}")
@admin_required
def update_item(request, item_id: int, item_in: ItemIn):
    item = Item.objects.get(id=item_id)
    item.name = item_in.name
    item.description = item_in.description
    item.code = item_in.code
    item.date_inservice = item_in.date_inservice
    item.date_outservice = item_in.date_outservice
    item.ItemTypes_id = item_in.ItemTypes_id
    item.save()
    return JsonResponse({"id": item.id, "name": item.name})

@router.delete("/{item_id}")
@admin_required
def delete_item(request, item_id: int):
    item = Item.objects.get(id=item_id)
    item.delete()
    return JsonResponse({"id": item_id, "status": "deleted"})

@router.get("/types/list/")
def list_types(request):
    types = ItemTypes.objects.all()
    return JsonResponse([{"id": itemType.id, "name": itemType.name} for itemType in types], safe=False)

@router.get("/types/{type_id}")
def get_type(request, type_id: int):
    itemType = ItemTypes.objects.get(id=type_id)
    response = {"id": itemType.id, "name": itemType.name, "description": itemType.description, "code": itemType.code, "subcategory": itemType.subcategory, "quantity": itemType.quantity, "isbulk": itemType.isbulk}
    return JsonResponse(response)

@router.post("/types/add/")
@admin_required
def create_type(request, item_in: itemTypesIn):
    if item_in.isbulk:
        amount = item_in.quantity
        itemType = ItemTypes.objects.create(**item_in.dict())
        for i in range(amount):
            item = Item(name=itemType.name, code=itemType.code, ItemTypes=itemType)
            item.save()
        return JsonResponse({"id": itemType.id, "name": itemType.name})
    else:
        itemType = ItemTypes.objects.create(**item_in.dict())
        return JsonResponse({"id": itemType.id, "name": itemType.name})
