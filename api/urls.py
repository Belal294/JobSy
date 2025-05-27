from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import (
    UserViewSet, activate_user,
    JobSeekerProfileViewSet, EmployerProfileViewSet, PostViewSet
)
from jobs.views import JobViewSet
from applications.views import ApplicationViewSet
from analytics.views import EmployerAnalyticsView, AdminAnalyticsView, AdminAnalyticsOverview
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('jobseeker-profiles', JobSeekerProfileViewSet, basename='jobseeker-profile')
router.register('employer-profiles', EmployerProfileViewSet, basename='employer-profile')
router.register('posts', PostViewSet, basename='post')
router.register('jobs', JobViewSet, basename='job')
router.register('applications', ApplicationViewSet, basename='application')  # spelling fixed

urlpatterns = [
    path('activate/<uid>/<token>/', activate_user, name='activate-user'),

    # Analytics views
    path('employer/analytics/', EmployerAnalyticsView.as_view(), name='employer-analytics'),
    path('admin/analytics/', AdminAnalyticsView.as_view(), name='admin-analytics'),
    path('admin/analytics/overview/', AdminAnalyticsOverview.as_view(), name='admin-analytics-overview'),

    # Auth endpoints
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    # API Router
    path('', include(router.urls)),
]

# Static/media files only needed in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
