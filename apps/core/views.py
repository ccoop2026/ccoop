from django.http import JsonResponse
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Campus, Drop, Variant, Pledge
from .serializers import CampusSerializer, DropSerializer, VariantSerializer, PledgeSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


def hello(request):
    return JsonResponse({"message": "Hello from Django API"})


def check_phone(request):
    phone = request.GET.get('phone', '').strip()
    if not phone:
        return JsonResponse({'available': False, 'error': 'Phone number is required'}, status=400)
    taken = User.objects.filter(phone=phone).exists()
    return JsonResponse({'available': not taken})


class CampusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Campus.objects.all()
    serializer_class = CampusSerializer
    permission_classes = [permissions.AllowAny]


class DropViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Drop.objects.filter(live=True)
    serializer_class = DropSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        campus_slug = self.request.query_params.get('campus')
        qs = super().get_queryset()
        if campus_slug:
            qs = qs.filter(campus__slug=campus_slug)
        return qs


class PledgeViewSet(viewsets.ModelViewSet):
    queryset = Pledge.objects.all()
    serializer_class = PledgeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
