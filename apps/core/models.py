from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model with role-based access control
    Roles: Student/Alumni, Drop Host, Campus Curator, Global Admin
    """
    ROLE_CHOICES = [
        ('STUDENT', 'Student/Alumni'),
        ('DROP_HOST', 'Drop Host'),
        ('CAMPUS_CURATOR', 'Campus Curator'),
        ('GLOBAL_ADMIN', 'Global Admin/Operations'),
    ]

    phone = models.CharField(max_length=15, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='STUDENT')
    home_campus = models.ForeignKey('Campus', on_delete=models.SET_NULL, null=True, blank=True, related_name='students')
    managed_campus = models.ForeignKey('Campus', on_delete=models.SET_NULL, null=True, blank=True, related_name='curators', help_text='Campus managed by curator/host')

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

    @property
    def is_student(self):
        return self.role == 'STUDENT'

    @property
    def is_drop_host(self):
        return self.role == 'DROP_HOST'

    @property
    def is_campus_curator(self):
        return self.role == 'CAMPUS_CURATOR'

    @property
    def is_global_admin(self):
        return self.role == 'GLOBAL_ADMIN' or self.is_superuser


class Campus(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Drop(models.Model):
    campus = models.ForeignKey(Campus, on_delete=models.CASCADE, related_name='drops')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    live = models.BooleanField(default=False)
    # state machine could be added later

    def __str__(self):
        return f"{self.campus.slug} - {self.title}"


class Variant(models.Model):
    drop = models.ForeignKey(Drop, on_delete=models.CASCADE, related_name='variants')
    color = models.CharField(max_length=50)
    size = models.CharField(max_length=10, blank=True)
    moq = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.drop.title} {self.color} {self.size}"


class Pledge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pledges')
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name='pledges')
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} pledged {self.quantity} of {self.variant}"
