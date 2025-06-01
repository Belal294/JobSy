from django.db import models
from django.utils import timezone
from users.models import User
from jobs.models import Job

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    applied_at = models.DateTimeField(default=timezone.now)

    job_title = models.CharField(max_length=255, blank=True)
    years_experience = models.PositiveIntegerField(default=0)
    availability = models.DateField(null=True, blank=True)
    expected_salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    resume = models.FileField(upload_to='application_resumes/', blank=True, null=True)

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    class Meta:
        unique_together = ('job', 'applicant') 

    def __str__(self):
        return f"{self.applicant.email} -> {self.job.title} ({self.status})"
