from rest_framework import generics, permissions
from .models import SavedJob
from .serializers import SavedJobSerializer
from rest_framework.response import Response

class SavedJobListCreateView(generics.ListCreateAPIView):
    serializer_class = SavedJobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        job_id = request.data.get("job")
        user = request.user
        if SavedJob.objects.filter(user=user, job_id=job_id).exists():
            return Response({"detail": "Already saved."}, status=400)
        SavedJob.objects.create(user=user, job_id=job_id)
        return Response({"detail": "Saved successfully"}, status=201)


class SavedJobDetailView(generics.RetrieveDestroyAPIView):
    queryset = SavedJob.objects.all()
    serializer_class = SavedJobSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user)
