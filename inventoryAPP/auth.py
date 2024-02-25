from ninja import Router, Form 
from inventoryAPP.models import User, Role
from typing import List
from ninja.security import HttpBearer
from inventoryAPP import envsettings
from ninja.errors import ValidationError
import datetime
from django.contrib.auth.hashers import check_password, make_password
from jose import jwt

router = Router()


def create_token(username):
    jwt_signing_key = getattr(envsettings, "JWT_SIGNING_KEY", "not_a_secret_key")
    jwt_access_expire = getattr(envsettings, "JWT_ACCESS_EXPIRY", 60)
    payload = {"username": username}
    access_expire = datetime.datetime.now() + datetime.timedelta(minutes=jwt_access_expire)
    payload.update({"exp": access_expire})
    token = jwt.encode(payload, key=jwt_signing_key, algorithm="HS256")
    return token

class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        jwt_signing_key = getattr(envsettings, "JWT_SIGNING_KEY", None)
        try:
            payload = jwt.decode(token, key=jwt_signing_key, algorithms=["HS256"])
        except Exception as e:
            return {"error": str(e)}
        username: str = payload.get("username", None)
        user_model = User.objects.filter(name=username).first()

        if not user_model:
            return None

        # Include user_model in the return for additional information if needed
        return {"sub": username, "user": user_model}
    
    def has_permission(self, request, view) -> bool:
        user_model = self.authenticate(request, request.headers.get("Authorization")).get("user")
        if user_model and user_model.has_perm(view.get_required_permission()):
            return True
        return False

@router.post("/sign_in", auth=None)
def sign_in(request, username: str = Form(...), password: str = Form(...)):
    user_model = User.objects.filter(name=username).first()

    passwords_match = check_password(password, user_model.password)
    if not passwords_match:
        raise ValidationError([{"error": "Wrong password"}])

    token = create_token(user_model.name)
    return {"token": token}

@router.post("/sign_up", auth=None)
def sign_up(request, username: str = Form(...), password: str = Form(...)):
    user_model = User.objects.filter(name=username).first()
    if user_model:
        raise ValidationError([{"error": "User already exists"}])

    user = User.objects.create(name=username, password=make_password(password), UserRole=Role.objects.get(id=1))
    token = create_token(user.name)
    return {"token": token}