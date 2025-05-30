from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    # fallback: read-only field pulling from employer_profile if exists
    company_profile_name = serializers.CharField(
        source='company.employer_profile.company_name', 
        read_only=True
    )
    
    image = serializers.ImageField(required=False)

    class Meta:
        model = Job
        fields = [
            'id',
            'image',
            'title',
            'description',
            'company',
            'company_name',         # manually editable field
            'company_profile_name', # fallback from employer_profile
            'location',
            'salary',
            'job_type',
            'vacancy',
            'experience',
            'gender',
            'responsibilities',
            'education',
            'benefits',
            'is_active',
            'posted_at',
            'deadline',
        ]
        read_only_fields = ['company', 'posted_at', 'is_active', 'company_profile_name']

    def create(self, validated_data):
        validated_data['company'] = self.context['request'].user
        return super().create(validated_data)
