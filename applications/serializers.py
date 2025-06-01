from rest_framework import serializers
from .models import Application
from jobs.serializers import JobSerializer
class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only = True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id',
            'job',
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

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)

