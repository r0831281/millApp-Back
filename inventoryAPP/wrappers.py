from django.http import HttpResponseForbidden
import functools


def admin_required(func):
    @functools.wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.auth.get("user"):
            if request.auth.get("user").UserRole.accessLevel < 2:
                return HttpResponseForbidden("You are not authorized for this action")
            return func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("You are not authorized for this action")
    return wrapper

def superadmin_required(func):
    @functools.wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.auth.get("user").UserRole.accessLevel < 3:
            return HttpResponseForbidden("You are not authorized for this action")
        return func(request, *args, **kwargs)
    return wrapper

def scanner_required(func):
    @functools.wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.auth:
            if request.auth.get("user").UserRole.accessLevel:
                return HttpResponseForbidden("You are not authorized for this action")
            return func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("You are not authorized for this action")
    return wrapper

