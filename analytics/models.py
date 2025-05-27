from django.db import models
from jobs.models import Job
from users.models import EmployerProfile


class JobView(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='views')
    ip_address = models.GenericIPAddressField()
    viewed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('job', 'ip_address')
        ordering = ['-viewed_at']

    def __str__(self):
        return f"{self.ip_address} viewed {self.job.title}"


class EmployerStats(models.Model):
    employer = models.OneToOneField(EmployerProfile, on_delete=models.CASCADE, related_name='stats')
    total_jobs_posted = models.PositiveIntegerField(default=0)
    total_applications_received = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Stats for {self.employer.company_name}"


class JobApplicationStats(models.Model):
    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name='application_stats')
    total_applicants = models.PositiveIntegerField(default=0)
    average_applicants_per_day = models.FloatField(default=0.0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Stats for job: {self.job.title}"
