from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.shortcuts import redirect
from .tokens import email_verification_token
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from users.serializers import (
    CustomUserSerializer, JobSeekerProfileSerializer,
    EmployerProfileSerializer, PostSerializer
)
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import JobSeekerProfile, EmployerProfile, Post
from users.permissions import IsOwnerOrReadOnly

User = get_user_model()


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().only('id', 'email', 'first_name', 'last_name', 'is_active')  
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

# fdsfdsfs
def activate_user(request, uid, token):
    try:
        uid = force_str(urlsafe_base64_decode(uid))
        user = get_user_model().objects.only('id', 'is_active').get(pk=uid)
        if email_verification_token.check_token(user, token):
            user.is_active = True
            user.save()
            return redirect('/activation-success/')
    except Exception:
        pass
    return redirect('/activation-failed/')


class JobSeekerProfileViewSet(viewsets.ModelViewSet):
    queryset = JobSeekerProfile.objects.select_related('user')
    serializer_class = JobSeekerProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EmployerProfileViewSet(viewsets.ModelViewSet):
    queryset = EmployerProfile.objects.select_related('user')  
    serializer_class = EmployerProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('user')  
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
