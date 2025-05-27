from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.employer_profile.company_name', read_only=True)

    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['company', 'posted_at']
