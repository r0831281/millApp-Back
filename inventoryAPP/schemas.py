from datetime import date
from ninja import Schema

class itemTypesIn(Schema):
    name: str
    description: str
    code: str
    subcategory: str
    quantity: int
    isbulk: bool

class itemTypesOut(Schema):
    id: int
    name: str
    description: str
    code: str
    subcategory: str
    quantity: int
    isbulk: bool

class RoleIn(Schema):
    name: str
    accessLevel: int
    

class RoleOut(Schema):
    id: int
    name: str
    accessLevel: int

class UserIn(Schema):
    name: str
    password: str
    UserRole: int

class UpdateUserIn(Schema):
    name: str
    UserRole: RoleOut
    
class UserOut(Schema):
    id: int
    name: str
    UserRole: RoleOut
    
class LocationIn(Schema):
    name: str
    shortname: str
    address: str
    city: str
    state: str
    zip: str
    country: str
    
class LocationOut(Schema):
    id: int
    name: str
    shortname: str
    description: str
    address: str
    city: str
    state: str
    zip: str
    country: str
      
class ItemOut(Schema):
    id: int
    name: str
    description: str
    code: str
    date_inservice: date | None
    date_outservice: date | None
    date_scanned: date | None
    ItemTypes: itemTypesOut
    ItemLocation: LocationOut
    
class ItemIn(Schema):
    name: str
    description: str
    code: str
    date_inservice: date | None
    date_outservice: date | None
    date_scanned: date | None 
    ItemTypes_id: int
    ItemLocation_id: int


class OrderOut(Schema):
    id: int
    unitPrice: float
    quantity: int
    supplier: str
    date: date
    BestellingLocation: LocationOut
    
class OrderIn(Schema):
    unitPrice: float
    quantity: int
    supplier: str
    date: date
    BestellingLocation_id: int
    
    
    