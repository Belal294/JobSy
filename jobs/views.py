from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job
from .serializers import JobSerializer
from .filters import JobFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from jobs.permissions import IsAuthenticatedOrReadOnlyForJobs

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.select_related('company__employer_profile')
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyForJobs]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = JobFilter
    search_fields = ['title', 'description', 'location', 'responsibilities', 'education']
    ordering_fields = ['posted_at', 'salary', 'vacancy']

    def perform_create(self, serializer):
        serializer.save(company=self.request.user)
