# Django imports...
from django.db import models

__author__ = 'Jason Parent (jason.a.parent@gmail.com)'


class Rsvp(models.Model):
    name = models.CharField(max_length=255)
    is_attending = models.BooleanField(default=True)
    num_attending = models.IntegerField(default=0)
    num_steak = models.IntegerField(default=0)
    num_fish = models.IntegerField(default=0)
    num_vegetarian = models.IntegerField(default=0)
    num_children = models.IntegerField(default=0)
    is_brunch = models.BooleanField(default=True)

    def __unicode__(self):
        return self.name
