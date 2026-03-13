from rest_framework import serializers

from .models import Campus, Drop, Variant, Pledge


class CampusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campus
        fields = ['id', 'name', 'slug', 'description']


class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant
        fields = ['id', 'color', 'size', 'moq']


class DropSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, read_only=True)

    class Meta:
        model = Drop
        fields = ['id', 'campus', 'title', 'description', 'live', 'variants']


class PledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pledge
        fields = ['id', 'user', 'variant', 'quantity', 'paid', 'created_at']
        read_only_fields = ['user', 'created_at']
