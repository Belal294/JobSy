# Generated by Django 5.2.1 on 2025-05-28 17:03

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='image',
            field=cloudinary.models.CloudinaryField(default='https://res.cloudinary.com/dw2jlqwgv/image/upload/v1234567890/default_image.jpg', max_length=255, verbose_name='image'),
        ),
    ]
