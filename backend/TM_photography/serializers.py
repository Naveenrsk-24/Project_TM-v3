from rest_framework import serializers
from .models import EventBooking

class EventBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventBooking
        fields = '__all__'

    def validate(self, data):
        if data.get('crowd_strength') and data['crowd_strength'] > 2000:
            raise serializers.ValidationError({"crowd_strength": "Crowd strength seems too large. Maximum 2,000 allowed."})

        if not data.get('about_couple').strip():
            raise serializers.ValidationError({"about_couple": "This field cannot be empty."})
        return data
