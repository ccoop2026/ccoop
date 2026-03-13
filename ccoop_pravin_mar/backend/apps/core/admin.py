from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

from .models import User, Campus, Drop, Variant, Pledge


@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    list_display = ('username', 'email', 'role', 'home_campus', 'managed_campus', 'is_staff')
    list_filter = ('role', 'home_campus', 'managed_campus', 'is_staff')
    search_fields = ('username', 'email', 'phone')

    fieldsets = DefaultUserAdmin.fieldsets + (
        ('Role & Campus Info', {
            'fields': ('role', 'phone', 'home_campus', 'managed_campus')
        }),
    )

@admin.register(Campus)
class CampusAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Drop)
class DropAdmin(admin.ModelAdmin):
    list_display = ('title', 'campus', 'live', 'created_at')
    list_filter = ('campus', 'live')

@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
    list_display = ('drop', 'color', 'size', 'moq')

@admin.register(Pledge)
class PledgeAdmin(admin.ModelAdmin):
    list_display = ('user', 'variant', 'quantity', 'paid', 'created_at')
