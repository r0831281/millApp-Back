from inventoryAPP.models import Location
from inventoryAPP.schemas import LocationIn, LocationOut
from typing import List
from django.http import JsonResponse
from ninja import Router
from inventoryAPP.wrappers import admin_required, superadmin_required, scanner_required
from django.core.serializers import serialize

router = Router()

@router.get("/list")
def list_locations(request):
    locations = Location.objects.all()
    locations = locations.order_by("id")
    return JsonResponse([{"id": location.id, "name": location.name, "shortname": location.shortname, "description": location.description, "address": location.address, "city": location.city, "state": location.state, "zip": location.zip, "country": location.country} for location in locations], safe=False)

@router.get("/count")
def count_locations(request):
    locations = Location.objects.all()
    return locations.count()

@router.get("/{location_id}")
def get_location(request, location_id: int):
    location = Location.objects.get(id=location_id)
    response = {"id": location.id, "name": location.name, "shortname": location.shortname, "description": location.description, "address": location.address, "city": location.city, "state": location.state, "zip": location.zip, "country": location.country}
    return JsonResponse(response)

@router.post("/create")
@admin_required
def create_location(request, location_in: LocationIn):
    location = Location.objects.create(**location_in.dict())
    return JsonResponse({"id": location.id, "name": location.name})

@router.put("/put/{location_id}")
@admin_required
def update_location(request, location_id: int, location_in: LocationIn):
    location = Location.objects.get(id=location_id)
    for key, value in location_in.dict(exclude_unset = True).items():
        setattr(location, key, value)
    location.save()
    return JsonResponse({"id": location.id, "name": location.name})

@router.delete("/{location_id}")
@admin_required
def delete_location(request, location_id: int):
    location = Location.objects.get(id=location_id)
    location.delete()
    return JsonResponse({"id": location_id, "status": "deleted"})
