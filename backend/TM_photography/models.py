from django.db import models
from django.core.validators import (
    EmailValidator,
    MinValueValidator,
    MaxValueValidator,
    RegexValidator
)

class EventBooking(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(validators=[EmailValidator(message="Enter a valid email address.")])
    phone = models.CharField(
        max_length=15,
        validators=[RegexValidator(
            regex=r'^\d{10,15}$',
            message="Phone number must contain only digits (10–15 digits)."
        )]
    )
    city = models.CharField(max_length=100)
    event = models.CharField(max_length=100)
    date = models.DateField()
    location = models.CharField(max_length=255)
    venue = models.CharField(max_length=150)
    time = models.TimeField()
    crowd_strength = models.PositiveIntegerField(
        validators=[MinValueValidator(1, "Crowd strength must be at least 1.")]
    )
    about_couple = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.event}"
