# Third-party imports...
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

# Local imports...
from .serializers import RsvpSerializer


class RsvpView(ViewSet):
    def create(self, request):
        # Create the RSVP.
        rsvp_data = request.data
        rsvp_serializer = RsvpSerializer()
        rsvp = rsvp_serializer.create(rsvp_data)

        return Response(status=status.HTTP_200_OK, data=RsvpSerializer(rsvp).data)
