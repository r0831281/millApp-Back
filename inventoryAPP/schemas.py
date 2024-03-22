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


class ItemIn(Schema):
    id: int
    name: str
    description: str

class ItemOut(Schema):
    id: int
    name: str
    description: str
    code: str
    date_inservice: date
    date_outservice: date
    date_scanned: date
    ItemTypes: itemTypesOut


class roleIn(Schema):
    name: str
    accessLevel: int
    

class roleOut(Schema):
    id: int
    name: str
    accessLevel: int

class UserIn(Schema):
    name: str
    password: str
    UserRole_id: int

    
class UserOut(Schema):
    id: int
    name: str
    UserRole_id: int