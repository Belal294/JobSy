from rest_framework import serializers
from users.models import User

class TopEmployerSerializer(serializers.ModelSerializer):
    total_jobs = serializers.IntegerField()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'total_jobs']
