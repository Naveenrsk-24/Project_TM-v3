from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from TM_photography.models import Photo
from TM_photography.serializers import PhotoSerializer
from .serializers import AdminLoginSerializer

AdminUser = get_user_model()

@api_view(['POST'])
def admin_login(request):
    serializer = AdminLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "email": user.email,
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    photos = Photo.objects.all()
    serializer = PhotoSerializer(photos, many=True)
    return Response(serializer.data)
