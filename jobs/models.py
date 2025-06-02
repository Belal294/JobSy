from django.db import models
from users.models import User
from cloudinary.models import CloudinaryField

class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
    ]

    GENDER_CHOICES = [
        ('any', 'Any'),
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    logo_image = CloudinaryField('image', blank=True, null=True)
    title = models.CharField(max_length=255, default='Unknown Title')
    company_name = models.CharField(max_length=255, default='Unknown Company') 
    description = models.TextField(default='No description provided')
    responsibilities = models.TextField(blank=True, null=True)  
    education = models.TextField(blank=True, null=True)        
    benefits = models.TextField(blank=True, null=True)         
    experience = models.CharField(max_length=255, blank=True, null=True)  
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='any') 
    vacancy = models.PositiveIntegerField(default=1)    

    posted_by = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="posted_jobs",
        default=1,  
    )

    company = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='jobs_company', 
        default=1,
    )
    company_image = CloudinaryField('image', blank=True, null=True)
    location = models.CharField(max_length=255, default='Unknown Location')
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default='full_time')
    is_active = models.BooleanField(default=True)
    posted_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(default='2099-12-31')  

    def __str__(self):
        return self.title
