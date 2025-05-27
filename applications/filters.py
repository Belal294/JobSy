
import django_filters
from .models import Application

class ApplicationFilter(django_filters.FilterSet):
    job = django_filters.NumberFilter(field_name="job__id")
    status = django_filters.CharFilter(lookup_expr='iexact')
    applied_after = django_filters.DateFilter(field_name='created_at', lookup_expr='gte')
    applied_before = django_filters.DateFilter(field_name='created_at', lookup_expr='lte')

    class Meta:
        model = Application
        fields = ['job', 'status', 'applied_after', 'applied_before']
