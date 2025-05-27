from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.utils import timezone
from django.db.models import Count
from datetime import timedelta
from django.utils.timezone import now

from jobs.models import Job
from applications.models import Application
from users.models import User
from .serializers import TopEmployerSerializer


class AdminAnalyticsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        now_time = timezone.now()
        last_7_days = now_time - timedelta(days=7)

        total_jobs = Job.objects.count()
        total_applications = Application.objects.count()
        total_users = User.objects.count()

        jobs_last_7_days = Job.objects.filter(created_at__gte=last_7_days).count()
        apps_last_7_days = Application.objects.filter(created_at__gte=last_7_days).count()

        # Popular jobs with application counts
        most_popular_jobs = Job.objects.annotate(
            app_count=Count('applications')
        ).order_by('-app_count')[:5]

        # Most active applicants
        most_active_applicants = User.objects.annotate(
            app_count=Count('applications')
        ).filter(app_count__gt=0).order_by('-app_count')[:5]

        data = {
            'site_overview': {
                'total_jobs': total_jobs,
                'total_applications': total_applications,
                'total_users': total_users,
            },
            'last_7_days': {
                'jobs_created': jobs_last_7_days,
                'applications_submitted': apps_last_7_days,
            },
            'most_popular_jobs': [
                {
                    'id': job.id,
                    'title': job.title,
                    'applications': job.app_count
                } for job in most_popular_jobs
            ],
            'most_active_applicants': [
                {
                    'id': user.id,
                    'email': user.email,
                    'applications': user.app_count
                } for user in most_active_applicants
            ]
        }

        return Response(data)


class AdminAnalyticsOverview(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        today = now().date()
        last_30_days = today - timedelta(days=30)

        # Top Employers by total jobs posted
        top_employers = User.objects.filter(
            employer_profile__isnull=False
        ).annotate(
            total_jobs=Count('jobs', distinct=True)
        ).filter(total_jobs__gt=0).order_by('-total_jobs')[:5]

        top_employers_data = TopEmployerSerializer(top_employers, many=True).data

        # Daily user signups (last 30 days)
        daily_signups = (
            User.objects.filter(date_joined__date__gte=last_30_days)
            .annotate(day=timezone.functions.TruncDate('date_joined'))
            .values('day')
            .annotate(count=Count('id'))
            .order_by('day')
        )

        # Application-to-hire ratio
        total_applications = Application.objects.count()
        total_hired = Application.objects.filter(status='accepted').count()
        hire_ratio = round(total_hired / total_applications, 2) if total_applications else 0.0

        return Response({
            'top_employers': top_employers_data,
            'daily_signups': daily_signups,
            'application_to_hire_ratio': hire_ratio,
        })


class EmployerAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        jobs = Job.objects.filter(employer=user)
        job_ids = jobs.values_list('id', flat=True)

        total_jobs = jobs.count()
        total_applications = Application.objects.filter(job_id__in=job_ids).count()

        applications_per_job = jobs.annotate(
            app_count=Count('applications')
        ).values('id', 'title', 'app_count')

        return Response({
            'total_jobs': total_jobs,
            'total_applications': total_applications,
            'applications_per_job': list(applications_per_job),
        })
