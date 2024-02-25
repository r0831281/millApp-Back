from datetime import date
from ninja import Schema

class ItemIn(Schema):
    name: str
    description: str
    code: str
    date_inservice: date
    date_outservice: date
    date_scanned: date