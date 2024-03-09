# Generated by Django 5.0.2 on 2024-03-08 23:56

# Generated by Django 5.0.2 on 2024-03-08 23:47

from django.db import migrations
from inventoryAPP.models import Item, ItemTypes, Bestelling, Location, Dienst, Role, User
from django.contrib.auth.hashers import make_password

def create_roles(apps, schema_editor):
    Role.objects.create(name="superadmin", accessLevel=3)
    Role.objects.create(name="admin", accessLevel=2)
    Role.objects.create(name="scanner", accessLevel=1)
    
def create_dienst(apps, schema_editor):
    Dienst.objects.create(name="ICT")
    Dienst.objects.create(name="Facility")
    Dienst.objects.create(name="Security")
    Dienst.objects.create(name="HR")
    Dienst.objects.create(name="Finance")
    Dienst.objects.create(name="Procurement")
    Dienst.objects.create(name="Logistics")
    Dienst.objects.create(name="Legal")
    Dienst.objects.create(name="Marketing")
    Dienst.objects.create(name="Sales")
    Dienst.objects.create(name="Customer Service")
    Dienst.objects.create(name="Production")
    Dienst.objects.create(name="Quality")
    Dienst.objects.create(name="R&D")

def create_locations(apps, schema_editor):
    Location.objects.create(name="HQ", shortname="HQ", description="Headquarters", address="1, Main Street", city="Main City", state="Main State", zip="0000", country="Main Country")
    Location.objects.create(name="Warehouse", shortname="WH", description="Warehouse", address="1, Warehouse Street", city="Warehouse City", state="Warehouse State", zip="0000", country="Warehouse Country")
    Location.objects.create(name="Office", shortname="OF", description="Office", address="1, Office Street", city="Office City", state="Office State", zip="0000", country="Office Country")
    Location.objects.create(name="Factory", shortname="FA", description="Factory", address="1, Factory Street", city="Factory City", state="Factory State", zip="0000", country="Factory Country")
    Location.objects.create(name="Store", shortname="ST", description="Store", address="1, Store Street", city="Store City", state="Store State", zip="0000", country="Store Country")
    Location.objects.create(name="Lab", shortname="LB", description="Laboratory", address="1, Lab Street", city="Lab City", state="Lab State", zip="0000", country="Lab Country")
    Location.objects.create(name="Site", shortname="ST", description="Site", address="1, Site Street", city="Site City", state="Site State", zip="0000", country="Site Country")
    Location.objects.create(name="Depot", shortname="DP", description="Depot", address="1, Depot Street", city="Depot City", state="Depot State", zip="0000", country="Depot Country")
    Location.objects.create(name="Port", shortname="PT", description="Port", address="1, Port Street", city="Port City", state="Port State", zip="0000", country="Port Country")
    Location.objects.create(name="Airport", shortname="AP", description="Airport", address="1, Airport Street", city="Airport City", state="Airport State", zip="0000", country="Airport Country")
    Location.objects.create(name="Station", shortname="ST", description="Station", address="1, Station Street", city="Station City", state="Station State", zip="0000", country="Station Country")

def create_item_types(apps, schema_editor):
    ItemTypes.objects.create(name="Laptop", description="Laptop", code="LPTP", subcategory="Laptop", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Desktop", description="Desktop", code="DSTP", subcategory="Desktop", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Server", description="Server", code="SRVR", subcategory="Server", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Monitor", description="Monitor", code="MNTR", subcategory="Monitor", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Printer", description="Printer", code="PRT", subcategory="Printer", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Scanner", description="Scanner", code="SCNR", subcategory="Scanner", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Keyboard", description="Keyboard", code="KYBD", subcategory="Keyboard", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Mouse", description="Mouse", code="MS", subcategory="Mouse", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Cable", description="Cable", code="CBL", subcategory="Cable", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Adapter", description="Adapter", code="ADPT", subcategory="Adapter", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Battery", description="Battery", code="BTRY", subcategory="Battery", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Charger", description="Charger", code="CHRGR", subcategory="Charger", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Bag", description="Bag", code="BG", subcategory="Bag", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Case", description="Case", code="CS", subcategory="Case", quantity=100, isbulk=False)
    ItemTypes.objects.create(name="Cover", description="Cover", code="CVR", subcategory="Cover", quantity=100, isbulk=True)


def create_bestelling(apps, schema_editor):
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 1", date="2024-03-08", BestellingLocation_id=2)
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 2", date="2024-03-08", BestellingLocation_id=2)
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 3", date="2024-03-08", BestellingLocation_id=2)
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 4", date="2024-03-08", BestellingLocation_id=2)
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 5", date="2024-03-08", BestellingLocation_id=2)
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 6", date="2024-03-08", BestellingLocation_id=2)
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 7", date="2024-03-08", BestellingLocation_id=2)
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 8", date="2024-03-08", BestellingLocation_id=2)
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 9", date="2024-03-08", BestellingLocation_id=2)
    Bestelling.objects.create(unitPrice=1000.00, quantity=10, supplier="Supplier 10", date="2024-03-08", BestellingLocation_id=2)
    
def create_items(apps, schema_editor):
    Item.objects.create(name="Laptop 1", description="Laptop 1", code="LPTP1", date_inservice="2024-03-08", date_outservice="2024-03-08", date_scanned="2024-03-08", ItemTypes_id=1, ItemLocation_id=2, ItemBestelling_id=1)
    Item.objects.create(name="Laptop 2", description="Laptop 2", code="LPTP2", date_inservice="2024-03-08", date_outservice="2024-03-08", date_scanned="2024-03-08", ItemTypes_id=1, ItemLocation_id=2, ItemBestelling_id=2)
    Item.objects.create(name="Laptop 3", description="Laptop 3", code="LPTP3", date_inservice="2024-03-08", date_outservice="2024-03-08", date_scanned="2024-03-08", ItemTypes_id=1, ItemLocation_id=2, ItemBestelling_id=3)
    Item.objects.create(name="Laptop 4", description="Laptop 4", code="LPTP4", date_inservice="2024-03-08", date_outservice="2024-03-08", date_scanned="2024-03-08", ItemTypes_id=1, ItemLocation_id=2, ItemBestelling_id=4)
    Item.objects.create(name="Laptop 5", description="Laptop 5", code="LPTP5", date_inservice="2024-03-08", date_outservice="2024-03-08", date_scanned="2024-03-08", ItemTypes_id=1, ItemLocation_id=2, ItemBestelling_id=5)
    Item.objects.create(name="Laptop 6", description="Laptop 6", code="LPTP6", date_inservice="2024-03-08", date_outservice="2024-03-08", date_scanned="2024-03-08", ItemTypes_id=1, ItemLocation_id=2, ItemBestelling_id=6)
    
def create_users(apps, schema_editor):
    User.objects.create(name="superadmin", password=make_password("superadmin"), UserRole_id=1)
    User.objects.create(name="admin", password=make_password("admin"), UserRole_id=2)
    User.objects.create(name="scanner", password=make_password("scanner"), UserRole_id=3)



class Migration(migrations.Migration):

    dependencies = [
        ('inventoryAPP', '0001_initial'),
    ]

    operations = [
        
        migrations.RunPython(create_roles),
        migrations.RunPython(create_dienst),
        migrations.RunPython(create_locations),
        migrations.RunPython(create_item_types),
        migrations.RunPython(create_bestelling),
        migrations.RunPython(create_items),
        migrations.RunPython(create_users),
        
    ]
