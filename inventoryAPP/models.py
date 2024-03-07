from django.db import models
# Create your models here.
#item model id, name, description, code, date inservice, date outservice, date scanned
class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    code = models.CharField(max_length=100)
    date_inservice = models.DateField(blank=True, null=True)
    date_outservice = models.DateField(blank=True, null=True)
    date_scanned = models.DateField(blank=True, null=True)
    
    ItemTypes = models.ForeignKey('ItemTypes', on_delete=models.PROTECT, null=False, default=0)
    ItemLocation = models.ForeignKey('Location', on_delete=models.PROTECT, null=True)
    ItemBestelling = models.ForeignKey('Bestelling', on_delete=models.PROTECT, null=True)
    def __str__(self):
        return self.name
    
class ItemTypes(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    code = models.CharField(max_length=100)
    subcategory = models.CharField(max_length=100, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    isbulk = models.BooleanField(default=False)
    def __str__(self):
        return self.name
    
class Bestelling(models.Model):
    id = models.AutoField(primary_key=True)
    unitPrice = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    supplier = models.CharField(max_length=100)
    BestellingLocation = models.ForeignKey('Location', on_delete=models.PROTECT, null=True)
    def __str__(self):
        return self.name
    
class Location(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    shortname = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class Dienst(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    DienstLocation = models.ForeignKey('Location', on_delete=models.PROTECT, null=True)
    def __str__(self):
        return self.name


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    userDienst = models.ForeignKey('Dienst', on_delete=models.PROTECT, null=True)
    UserRole = models.ForeignKey('Role', on_delete=models.PROTECT, null=True, default=0)
    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return self.UserRole.accessLevel >= perm

    def setPassword(self, password):
        self.password = password
        self.save()
    
class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    accessLevel = models.IntegerField(default=0)
    def __str__(self):
        return self.name
    
class userItem(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('User', on_delete=models.PROTECT, null=True)
    item = models.ForeignKey('Item', on_delete=models.PROTECT, null=True)
    def __str__(self):
        return self.name


