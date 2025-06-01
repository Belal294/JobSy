
from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsEmployer(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'employer_profile')


class IsAuthenticatedOrReadOnlyForJobs(BasePermission):
    def has_permission(self, request, view):
        # If the method is safe (GET, HEAD, OPTIONS), allow for all
        if request.method in SAFE_METHODS:
            return True
        # Otherwise, only allow authenticated users
        return request.user and request.user.is_authenticated
