from models import Item

# create 10 test items
for i in range(10):
    item = Item()
    item.name = "Item %s" % i
    item.description = "Description %s" % i
    item.code = "Code %s" % i
    item.date_inservice = "2016-01-01"
    item.date_outservice = "2016-01-01"
    item.date_scanned = "2016-01-01"
    item.save()
    print ("Item %s saved" % i)