from rest_framework import serializers
from .models import Notification
from applications.serializers import ApplicationSerializer  

class NotificationSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer()  

    class Meta:
        model = Notification
        fields = ['id', 'recipient', 'application', 'message', 'is_read', 'created_at']
