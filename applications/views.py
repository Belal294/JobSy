from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django_filters.rest_framework import DjangoFilterBackend

from .models import Application
from .serializers import ApplicationSerializer
from .filters import ApplicationFilter

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ApplicationFilter
    search_fields = ['job__title', 'applicant__first_name', 'applicant__last_name']
    ordering_fields = ['created_at', 'status']

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Application.objects.none()

        user = self.request.user
        queryset = Application.objects.select_related('job', 'applicant')

        if hasattr(user, 'employer_profile'):
            return queryset.filter(job__posted_by=user)
        return queryset.filter(applicant=user)

    def perform_create(self, serializer):
        application = serializer.save(applicant=self.request.user)

        send_mail(
            subject='Your Job Application Submitted',
            message=(
                f'Hello {self.request.user.first_name},\n\n'
                f'Your application for "{application.job.title}" has been received.'
            ),
            from_email='noreply@jobsy.com',
            recipient_list=[self.request.user.email],
            fail_silently=True,
        )

    @action(detail=True, methods=['post'], url_path='set-status')
    def set_status(self, request, pk=None):
        app = self.get_object()

        if not hasattr(request.user, 'employer_profile'):
            return Response(
                {'error': 'Only employers can change status.'},
                status=status.HTTP_403_FORBIDDEN
            )

        status_val = request.data.get('status')
        allowed_statuses = ['pending', 'reviewed', 'accepted', 'rejected']

        if status_val not in allowed_statuses:
            return Response(
                {'error': f'Invalid status. Allowed: {allowed_statuses}'},
                status=status.HTTP_400_BAD_REQUEST
            )

        app.status = status_val
        app.save()

        return Response({'success': f'Status updated to {status_val}'})
