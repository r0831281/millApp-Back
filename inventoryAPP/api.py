from django.http import JsonResponse
from ninja import Router, NinjaAPI

router = Router()

@router.get("/hello")
def hello_world(request):
    return JsonResponse({"message": "Hello, world!"})

@router.get("/hello/{name}")
def hello_name(request, name: str):
    return JsonResponse({"message": f"Hello, {name}!"})

api = NinjaAPI()

api.add_router("/inventory", router)