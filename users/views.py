from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.shortcuts import redirect
from .tokens import email_verification_token
from rest_framework import viewsets, permissions, generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from users.serializers import (
    CustomUserSerializer, JobSeekerProfileSerializer,
    EmployerProfileSerializer, PostSerializer, LoginSerializer
)
from .models import JobSeekerProfile, EmployerProfile, Post
from users.permissions import IsOwnerOrReadOnly
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status, generics, permissions, viewsets
from django.shortcuts import get_object_or_404
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from rest_framework.decorators import api_view

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet): 
    queryset = User.objects.only(
        'id', 'email', 'first_name', 'last_name',
        'phone_number', 'address', 'gender',
        'profile_image', 'cover_image',
        'is_active', 'is_staff'
    )
    serializer_class = CustomUserSerializer

    def get_permissions(self):
        if self.action in ['me', 'update', 'partial_update']:
            return [permissions.IsAuthenticated()]
        return [IsAdminUser()]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    def get_queryset(self):
        if self.request.user.is_staff:
            return self.queryset
        return self.queryset.filter(id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance != request.user and not request.user.is_staff:
            return Response({'detail': 'You do not have permission to update this user.'}, status=403)
        return super().update(request, *args, **kwargs)



def activate_user(request, uid, token):
    try:
        uid = force_str(urlsafe_base64_decode(uid))
        user = User.objects.only('id', 'is_active').get(pk=uid)
        if email_verification_token.check_token(user, token):
            user.is_active = True
            user.save()
            return redirect('/activation-success/')
    except Exception:
        pass
    return redirect('/activation-failed/')


class JobSeekerProfileViewSet(viewsets.ModelViewSet):
    queryset = JobSeekerProfile.objects.select_related('user').only(
        'id', 'resume', 'bio', 'skills',
        'user__id', 'user__email'
    )
    serializer_class = JobSeekerProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EmployerProfileViewSet(viewsets.ModelViewSet):
    queryset = EmployerProfile.objects.select_related('user').only(
        'id', 'company_name', 'company_description', 'website',
        'user__id', 'user__email'
    )
    serializer_class = EmployerProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('user').only(
        'id', 'content', 'image', 'created_at',
        'user__id', 'user__email'
    )
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]


#  Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]


# Login View with JWT
class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)
        if user is None:
            return Response({"error": "Invalid Credentials"}, status=400)

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "email": user.email,
                }
            })

        return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


# Email Verification
class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.GET.get('token')
        if not token:
            return Response({"error": "Token not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            access_token = AccessToken(token)
            user = get_object_or_404(User, id=access_token['user_id'])
            user.is_verified = True
            user.is_active = True
            user.save()
            return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)
        except (ExpiredSignatureError, InvalidTokenError):
            return Response({"error": "Invalid or expired token"}, status=400)
        


@api_view(['GET'])
def freelancer_dashboard(request):
    data = {
        "task_bids_won": 22,
        "jobs_applied": 195,
        "profile_views": [120, 135, 150, 145, 160, 170, 180],
        "timeline_labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
    return Response(data)