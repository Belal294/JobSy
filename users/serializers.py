from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import JobSeekerProfile, EmployerProfile, Post, User
from django.contrib.auth import get_user_model
User = get_user_model()


class CustomUserCreateSerializer(UserCreateSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True)
    cover_image = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = User
        fields = [
            'id', 'email', 'password',
            'first_name', 'last_name',
            'phone_number', 'address',
            'gender', 'profile_image', 'cover_image', 'date_of_birth'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'profile_image': {'required': False, 'allow_null': True},
            'cover_image': {'required': False, 'allow_null': True},
        }
    def validate_profile_image(self, value):
        return value or None


class CustomUserSerializer(UserSerializer):
    profile_image = serializers.ImageField(required=False, allow_null=True)
    cover_image = serializers.ImageField(required=False, allow_null=True)
    gender_display = serializers.CharField(source='get_gender_display', read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name',
            'phone_number', 'address', 'gender', 'gender_display',
            'profile_image', 'cover_image',
            'is_active', 'is_staff', 'date_of_birth'
        ]
        read_only_fields = ['is_active', 'is_staff']

    def update(self, instance, validated_data):
        request_data = self.context['request'].data

        if 'profile_image' not in request_data or request_data.get('profile_image') in [None, '', 'null']:
            validated_data['profile_image'] = instance.profile_image

        if 'cover_image' not in request_data or request_data.get('cover_image') in [None, '', 'null']:
            validated_data['cover_image'] = instance.cover_image

        return super().update(instance, validated_data)




class JobSeekerProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = JobSeekerProfile
        fields = ['id', 'user', 'user_email', 'resume', 'bio', 'skills']
        read_only_fields = ['user']


class EmployerProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = EmployerProfile
        fields = ['id', 'user', 'user_email', 'company_name', 'company_description', 'website']
        read_only_fields = ['user']




class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)



class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'image', 'created_at']
        read_only_fields = ['user', 'created_at']


class CustomPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        User = get_user_model()
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value
