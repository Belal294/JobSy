from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job
from .serializers import JobSerializer
from .filters import JobFilter

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.select_related('company').all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = JobFilter
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['posted_at', 'salary']

    def perform_create(self, serializer):
        serializer.save(company=self.request.user)
