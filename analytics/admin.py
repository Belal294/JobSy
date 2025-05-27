from django.contrib import admin
from analytics.models import JobView, JobApplicationStats, EmployerStats


admin.site.register(JobView)
admin.site.register(JobApplicationStats)
admin.site.register(EmployerStats)