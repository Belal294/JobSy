from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    # fallback: read-only field pulling from employer_profile if exists
    company_profile_name = serializers.CharField(
        source='company.employer_profile.company_name',
        read_only=True
    )

    logo_image = serializers.ImageField(required=False, allow_null=True)
    company_image = serializers.ImageField(required=False, allow_null=True)
  

    # Optional text fields
    responsibilities = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    education = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    benefits = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    salary = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    experience = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    gender = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    deadline = serializers.DateField(required=False, allow_null=True)

    class Meta:
        model = Job
        fields = [
            'id',
            'logo_image',
            'title',
            'description',
            'company',
            'company_name',
            'company_image',
            'company_profile_name',
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
