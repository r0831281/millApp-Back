from ninja import Router
from django.http import JsonResponse
from inventoryAPP.models import Item, ItemTypes, UserItem
from inventoryAPP.schemas import ItemIn, itemTypesIn, ItemOut, itemTypesOut, UserItemIn, UserItemOut
import datetime
from inventoryAPP.wrappers import admin_required, scanner_required, superadmin_required
from django.core.serializers import serialize
from typing import List

router = Router()

@router.get("/list", response=List[ItemOut])
def list_items(request):
    items = Item.objects.select_related("ItemTypes", "ItemLocation")
    items = items.order_by("id")
    return items

@router.get("/count")
def count_items(request):
    items = Item.objects.all()
    return items.count()

@router.get("/{item_id}")
def get_item(request, item_id: int):
    item = Item.objects.get(id=item_id)
    response = {"id": item.id, "name": item.name, "description": item.description, "code": item.code, "date_inservice": item.date_inservice, "date_outservice": item.date_outservice, "date_scanned": item.date_scanned}
    if item.ItemTypes:
        response["type"] = item.ItemTypes.name
    return JsonResponse(response)


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
    for key, value in item_in.dict(exclude_unset = True).items():
        setattr(item, key, value)
    item.save()
    return JsonResponse({"id": item.id, "name": item.name})

@router.post("/create/")
@admin_required
def create_item(request, item_in: ItemIn):
    if item_in.ItemTypes_id and item_in.ItemLocation_id:
        item = Item.objects.create(**item_in.dict())
        return JsonResponse({"id": item.id, "name": item.name})
    else:
        return JsonResponse({"error": "Item type and location are required"}, status=400)

@router.delete("/{item_id}")
@admin_required
def delete_item(request, item_id: int):
    print(item_id)
    item = Item.objects.get(id=item_id)
    item.delete()
    return JsonResponse({"id": item_id, "status": "deleted"})

@router.get("/types/list/", response=List[itemTypesOut])
def list_types(request):
    types = ItemTypes.objects.all()
    types.order_by("id")
    return types

@router.get("/types/{type_id}")
def get_type(request, type_id: int):
    itemType = ItemTypes.objects.get(id=type_id)
    response = {"id": itemType.id, "name": itemType.name, "description": itemType.description, "code": itemType.code, "subcategory": itemType.subcategory, "quantity": itemType.quantity, "isbulk": itemType.isbulk}
    return JsonResponse(response)

@router.post("/types/add/")
@admin_required
def create_type(request, item_in: itemTypesIn):
        itemType = ItemTypes.objects.create(**item_in.dict())
        return JsonResponse({"id": itemType.id, "name": itemType.name})

@router.put("/types/{type_id}")
@admin_required
def update_type(request, type_id: int, item_in: itemTypesIn):
    itemType = ItemTypes.objects.get(id=type_id)
    for key, value in item_in.dict(exclude_unset = True).items():
        setattr(itemType, key, value)
    itemType.save()
    return JsonResponse({"id": itemType.id, "name": itemType.name})

@router.delete("/types/{type_id}")
@admin_required
def delete_type(request, type_id: int):
    itemType = ItemTypes.objects.get(id=type_id)
    itemType.delete()
    return JsonResponse({"id": type_id, "status": "deleted"})


@router.post("/types/bulk/{type_id}")
@admin_required
def create_bulk(request, type_id: int, amount: int):
    itemType = ItemTypes.objects.get(id=type_id)
    for i in range(amount):
        item = Item(name=itemType.name, description=itemType.name + " from bulk type " + itemType.description , code=itemType.code, ItemTypes=itemType)
        print(item.description)
        item.save()
    return JsonResponse({"id": itemType.id, "name": itemType.name})


#userItem crud routes

@router.get("/userItems/list/", response=List[UserItemOut])
@admin_required
def list_userItems(request):
    items = UserItem.objects.all()
    return items

@router.get("/userItems/{userItem_id}", response=List[UserItemOut])
@admin_required
def get_userItem(request, userItem_id: int):
    items = UserItem.objects.filter(user_id=userItem_id)
    return items

@router.post("/userItems/create/")
@admin_required
def create_userItem(request, item_in: UserItemIn):
    item = UserItem.objects.create(**item_in.dict())
    return item

@router.put("/userItems/{userItem_id}")
@admin_required
def update_userItem(request, userItem_id: int, item_in: UserItemIn):
    item = UserItem.objects.get(id=userItem_id)
    for key, value in item_in.dict(exclude_unset = True).items():
        setattr(item, key, value)
    item.save()
    return item

@router.delete("/userItems/{userItem_id}")
@admin_required
def delete_userItem(request, userItem_id: int):
    item = UserItem.objects.get(id=userItem_id)
    item.delete()
    return JsonResponse({"id": userItem_id, "status": "deleted"})


@router.get("/userItems/{user_id}")
@admin_required
def get_userItems(request, user_id: int):
    items = Item.objects.filter(user_id=user_id)
    return items

