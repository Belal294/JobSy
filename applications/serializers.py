from rest_framework import serializers
from .models import Application
from jobs.models import Job
from jobs.serializers import JobSerializer

class ApplicationSerializer(serializers.ModelSerializer):
    # Accept job as ID from frontend
    job = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all())
    
    # Include detailed job info in response
    job_detail = JobSerializer(source="job", read_only=True)

    # Human-readable status display
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id',
            'job',              # for submission (writeable)
            'job_detail',       # for response (read-only nested)
            'applicant',
            'applied_at',
            'job_title',
            'years_experience',
            'availability',
            'expected_salary',
            'resume',
            'status',
            'status_display', 
        ]
        read_only_fields = ['applied_at', 'applicant']


