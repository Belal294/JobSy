from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import JobSeekerProfile, EmployerProfile, Post, User

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'address']
        extra_kwargs = {
            'password': {'write_only': True},
        }

class CustomUserSerializer(UserSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'is_active', 'is_staff']
        read_only_fields = ['is_active', 'is_staff']




class JobSeekerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeekerProfile
        fields = ['id', 'user', 'resume', 'bio', 'skills']
        read_only_fields = ['user']

class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = ['id', 'user', 'company_name', 'company_description', 'website']
        read_only_fields = ['user']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'image', 'created_at']
        read_only_fields = ['user', 'created_at']
