from django.urls import path
from . import views

urlpatterns = [
    path('event-booking/', views.event_booking_create, name='event-booking-create'),
]
