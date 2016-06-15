# Django imports...
from django.conf.urls import url
from django.contrib import admin

# Local imports...
from .views import RsvpView

__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

admin.autodiscover()

urlpatterns = [
    url(r'^rsvp/$', RsvpView.as_view({'post': 'create'})),
]
