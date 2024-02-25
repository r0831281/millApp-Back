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
    name: str
    description: str
    code: str
    date_inservice: date
    date_outservice: date
    date_scanned: date
    ItemTypes_id: int = None

class ItemOut(Schema):
    id: int
    name: str
    description: str
    code: str
    date_inservice: date
    date_outservice: date
    date_scanned: date
    ItemTypes: itemTypesOut = None  


class roleIn(Schema):
    name: str
    accessLevel: int

class roleOut(Schema):
    id: int
    name: str



class UserIn(Schema):
    name: str
    password: str
    UserRole_id: int
    
class UserOut(Schema):
    id: int
    name: str
    UserRole_id: int