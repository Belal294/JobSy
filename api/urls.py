from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import (
    UserViewSet, activate_user,
    JobSeekerProfileViewSet, EmployerProfileViewSet, PostViewSet,
    LoginView, RegisterView, freelancer_dashboard, VerifyEmailView
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

router.register('applications', ApplicationViewSet, basename='application')

urlpatterns = [
    path('activate/<uid>/<token>/', activate_user, name='activate-user'),

    # Custom auth views (optional)
    path('auth/login/', LoginView.as_view(), name='custom-login'),
    path('auth/register/', RegisterView.as_view(), name='custom-register'),

    # Email verification (optional)
    path('auth/verify/', VerifyEmailView.as_view(), name='verify-email'),

    # Freelancer dashboard (optional)
    path('freelancer/dashboard/', freelancer_dashboard, name='freelancer-dashboard'),

    # Djoser default auth
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    # Analytics
    path('employer/analytics/', EmployerAnalyticsView.as_view(), name='employer-analytics'),
    path('admin/analytics/', AdminAnalyticsView.as_view(), name='admin-analytics'),
    path('admin/analytics/overview/', AdminAnalyticsOverview.as_view(), name='admin-analytics-overview'),

    # All other API routes from router
    path('', include(router.urls)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
