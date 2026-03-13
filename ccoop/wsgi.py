"""WSGI config for ccoop project."""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ccoop.settings')

application = get_wsgi_application()
