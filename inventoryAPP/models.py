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
    def __str__(self):
        return self.name