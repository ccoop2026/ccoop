from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'campuses', views.CampusViewSet, basename='campus')
router.register(r'drops', views.DropViewSet, basename='drop')
router.register(r'pledges', views.PledgeViewSet, basename='pledge')

urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('check-phone/', views.check_phone, name='check-phone'),
    path('', include(router.urls)),
]
