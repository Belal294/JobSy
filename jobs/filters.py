import django_filters
from .models import Job

class JobFilter(django_filters.FilterSet):
    job_type = django_filters.CharFilter(lookup_expr='iexact')
    location = django_filters.CharFilter(lookup_expr='icontains')
    min_salary = django_filters.NumberFilter(field_name='salary', lookup_expr='gte')
    max_salary = django_filters.NumberFilter(field_name='salary', lookup_expr='lte')

    class Meta:
        model = Job
        fields = ['job_type', 'location', 'min_salary', 'max_salary']
