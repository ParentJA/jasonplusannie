# Django imports...
from django.contrib import admin

# Local imports...
from .models import Rsvp


@admin.register(Rsvp)
class RsvpAdmin(admin.ModelAdmin):
    fields = ('name', 'is_attending', 'num_attending', 'num_steak', 'num_fish')
    list_display = ('name', 'is_attending', 'num_attending', 'num_steak', 'num_fish')
