from ninja import Router
from django.http import JsonResponse
from inventoryAPP.models import Bestelling

router = Router()

#bestelling routes

@router.get("/orders")
def list_orders(request):
    orders = Bestelling.objects.all()
    return orders

@router.get("/orders/{order_id}")
def get_order(request, order_id: int):
    order = Bestelling.objects.get(id=order_id)
    response = {"id": order.id, "date": order.date, "status": order.status}
    return JsonResponse(response)

@router.post("/orders")
def create_order(request):
    order = Bestelling.objects.create()
    return JsonResponse({"id": order.id, "date": order.date, "status": order.status})

@router.put("/orders/{order_id}")
def update_order(request, order_id: int):
    order = Bestelling.objects.get(id=order_id)
    order.status = "completed"
    order.save()
    return JsonResponse({"id": order.id, "date": order.date, "status": order.status})

@router.delete("/orders/{order_id}")
def delete_order(request, order_id: int):
    order = Bestelling.objects.get(id=order_id)
    order.delete()
    return JsonResponse({"id": order_id, "status": "deleted"})
