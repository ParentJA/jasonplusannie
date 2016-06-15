# Third-party imports...
from rest_framework import serializers

# Local imports...
from .models import Rsvp

__author__ = 'Jason Parent'


class RsvpSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return Rsvp.objects.create(**validated_data)

    class Meta:
        model = Rsvp
        fields = ('id', 'name', 'is_attending', 'num_attending', 'num_steak', 'num_fish')
