from rest_framework import serializers
from .models import SavedJob
from jobs.serializers import JobSerializer  

class SavedJobSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)

    class Meta:
        model = SavedJob
        fields = ['id', 'job', 'saved_at']
