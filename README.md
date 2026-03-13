# ccoop.in MVP

Multi-tenant collegiate commerce platform for demand-validated merchandise drops and campus stores.

## Quick Start

**Run the application:**
```bash
cd backend
..\.venv\Scripts\python manage.py runserver
```

Visit **http://localhost:8000** - Both React frontend and Django API are served together!

For detailed setup instructions, see [QUICKSTART.md](QUICKSTART.md)

## What's Included

- **Django REST API** with Campus, Drop, Variant, and Pledge models
- **React Frontend** integrated and served by Django
- **Sample Data** - 3 campuses, 4 drops with variants
- **Authentication Ready** - Custom User model with phone field
- **CORS Configured** - For development flexibility
- **WhiteNoise** - Production-ready static file serving

## Project Status

✅ **Complete Integration** - Django + React working together
✅ **Database Setup** - Migrations applied, sample data loaded
✅ **API Endpoints** - Campuses, Drops, Pledges accessible
✅ **Static Serving** - React build served by Django

## Key Endpoints

- `http://localhost:8000/` - React application
- `http://localhost:8000/api/campuses/` - Campus list API
- `http://localhost:8000/api/drops/` - Drop list API
- `http://localhost:8000/admin/` - Django admin panel

## Next Steps per PRD

1. User authentication (Phone/Email OTP, Google OAuth)
2. Pledge flow and cart functionality
3. MOQ validation and state machine
4. Razorpay payment integration
5. Drop Host operations (QR scanning, pickup)
6. Campus Curator dashboard
7. Global Admin tools

See [PRD_ccoop_MVP.md](PRD_ccoop_MVP.md) for complete requirements.

## Tech Stack

- **Backend:** Django 5.0.1, Django REST Framework 3.14.0
- **Frontend:** React 18.2.0
- **Database:** SQLite (MVP)
- **Static Files:** WhiteNoise 6.11.0
- **CORS:** django-cors-headers 4.3.1
