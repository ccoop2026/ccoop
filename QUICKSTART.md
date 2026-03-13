# ccoop.in MVP - Quick Start Guide

## Overview

Your Django + React integrated application is now fully set up! When you run `python manage.py runserver`, both the Django API and React frontend will be served together.

## Setup Complete ✓

The following has been configured:

1. **Django Backend** - REST API with Django REST Framework
2. **React Frontend** - Modern UI with React Router, Login/Register pages, Campus browsing
3. **Database** - SQLite with sample data loaded
4. **Static Files** - WhiteNoise configured for production-ready static file serving
5. **CORS** - Configured for development
6. **Routing** - Multi-page React application with protected routes
7. **Authentication UI** - Login and Registration forms with Google OAuth placeholder

## Running the Application

### Option 1: Single Command (Recommended)

```bash
cd backend
..\.venv\Scripts\python manage.py runserver
```

This will start the server at **http://localhost:8000**

The React app will be served at the root URL, and the API is available at `/api/`

### Option 2: Development Mode (React + Django separately)

If you want hot-reload for React during development:

**Terminal 1 - Django API:**
```bash
cd backend
..\.venv\Scripts\python manage.py runserver
```

**Terminal 2 - React Dev Server:**
```bash
cd backend\frontend
npm start
```

React will run at http://localhost:3000 and proxy API calls to Django.

## API Endpoints

### Campuses
- `GET /api/campuses/` - List all campuses
- `GET /api/campuses/{id}/` - Get campus details

### Drops
- `GET /api/drops/` - List all live drops
- `GET /api/drops/?campus=<slug>` - Filter drops by campus
- `GET /api/drops/{id}/` - Get drop details

### Pledges (Authenticated)
- `GET /api/pledges/` - List user's pledges
- `POST /api/pledges/` - Create a new pledge

## Sample Data

The database includes:

### Campuses
- IIT Bombay (`iit-bombay`)
- IIT Delhi (`iit-delhi`)
- BITS Pilani (`bits-pilani`)

### Drops
- **IIT Bombay Official Hoodies - Winter 2026**
  - Colors: Navy Blue, Black
  - Sizes: S, M, L, XL
  - MOQ: 20 per variant

- **IIT Bombay Tech Fest T-Shirts**
  - Colors: White, Red
  - Sizes: S, M, L, XL
  - MOQ: 30 per variant

- **IIT Delhi Alumni Reunion Collection**
  - Color: Green
  - Sizes: M, L, XL
  - MOQ: 25 per variant

- **BITS Pilani Fest Merchandise**
  - Colors: Maroon, Yellow
  - Sizes: M, L
  - MOQ: 20 per variant

### Sample Users (Role-Based)

**All passwords:** `password123`

**Students:**
- `rahul_student` (Rahul Sharma) - IIT Bombay student
- `priya_student` (Priya Verma) - IIT Delhi student
- `amit_student` (Amit Kumar) - BITS Pilani student

**Drop Hosts:**
- `host_iitb` (Vikram Patel) - IIT Bombay drop host
- `host_iitd` (Anjali Singh) - IIT Delhi drop host

**Campus Curators:**
- `curator_iitb` (Rajesh Gupta) - IIT Bombay curator
- `curator_iitd` (Meera Reddy) - IIT Delhi curator

**Global Admin:**
- `admin_global` (Sanjay Mehta) - Platform administrator (admin panel access)

See [TEST_USERS.md](TEST_USERS.md) for complete user details and [TESTING_GUIDE.md](TESTING_GUIDE.md) for testing instructions.

## Project Structure

```
ccoop_pravin_mar/
├── .venv/                          # Python virtual environment
├── backend/
│   ├── ccoop/                      # Django project settings
│   │   ├── settings.py             # Main settings
│   │   └── urls.py                 # URL routing
│   ├── apps/
│   │   └── core/                   # Main Django app
│   │       ├── models.py           # Database models
│   │       ├── views.py            # API views
│   │       ├── serializers.py      # DRF serializers
│   │       └── management/
│   │           └── commands/
│   │               └── load_sample_data.py
│   ├── frontend/                   # React application
│   │   ├── src/
│   │   │   ├── App.js              # Main React component
│   │   │   └── index.js            # React entry point
│   │   ├── build/                  # Production build (served by Django)
│   │   └── package.json
│   ├── staticfiles/                # Collected static files
│   ├── manage.py                   # Django management script
│   └── requirements.txt            # Python dependencies
└── PRD_ccoop_MVP.md               # Product Requirements Document
```

## Common Commands

### Django Commands

```bash
# Activate virtual environment
.venv\Scripts\activate

# Run development server
cd backend
..\.venv\Scripts\python manage.py runserver

# Create migrations
..\.venv\Scripts\python manage.py makemigrations

# Apply migrations
..\.venv\Scripts\python manage.py migrate

# Load sample data (clears existing data!)
..\.venv\Scripts\python manage.py load_sample_data

# Create superuser for admin panel
..\.venv\Scripts\python manage.py createsuperuser

# Collect static files
..\.venv\Scripts\python manage.py collectstatic
```

### React Commands

```bash
cd backend\frontend

# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build
```

## Building for Production

When you make changes to the React frontend:

```bash
cd backend\frontend
npm run build
cd ..
..\.venv\Scripts\python manage.py collectstatic --noinput
```

Then restart Django server to see changes.

## Admin Panel

Access the Django admin at http://localhost:8000/admin

**Pre-configured Admin Account:**
- Username: `admin_global`
- Password: `password123`

This account has full access to manage:
- Users (view roles, campus assignments)
- Campuses
- Drops
- Variants
- Pledges

**Create Additional Superuser (Optional):**
```bash
cd backend
..\.venv\Scripts\python manage.py createsuperuser
```

## Next Steps

Based on the PRD, here are the key features to implement:

### High Priority (MVP Core)
1. **User Authentication**
   - Phone/Email OTP registration
   - Google OAuth integration
   - JWT token-based sessions

2. **Campus Selection & Onboarding**
   - Campus selection flow
   - Location-based campus suggestions

3. **Pledge Flow**
   - Add to cart functionality
   - Pledge confirmation
   - MOQ progress tracking

4. **Payment Integration**
   - Razorpay integration
   - 50% advance / 100% full payment options
   - Balance payment collection

5. **Drop State Machine**
   - Drop lifecycle states (Draft → Live → MOQ Met → etc.)
   - MOQ validation logic
   - Failed variant notifications

### Medium Priority
6. **Drop Host Operations**
   - Shipment QR scanning
   - Arrival confirmation
   - Pickup verification

7. **Campus Curator Dashboard**
   - Drop creation/management
   - Variant & MOQ configuration
   - Performance metrics

8. **Global Admin Tools**
   - MOQ override
   - Payment window extension
   - Refund management

## Troubleshooting

### Issue: Module not found errors
**Solution:** Make sure you're using the virtual environment:
```bash
.venv\Scripts\activate
```

### Issue: React changes not showing
**Solution:** Rebuild React and collect static files:
```bash
cd backend\frontend
npm run build
cd ..
..\.venv\Scripts\python manage.py collectstatic --noinput
```

### Issue: Database errors
**Solution:** Delete database and recreate:
```bash
cd backend
rm db.sqlite3
..\.venv\Scripts\python manage.py migrate
..\.venv\Scripts\python manage.py load_sample_data
```

## Configuration Files

### requirements.txt
- Django==5.0.1
- whitenoise==6.11.0
- djangorestframework==3.14.0
- django-cors-headers==4.3.1

### package.json (React)
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.0
- react-scripts: 5.0.1

## New UI Features

### Pages Available
1. **Home Page** (`/`) - Landing page with product overview
2. **Login Page** (`/login`) - User authentication with demo credentials
3. **Register Page** (`/register`) - New user registration
4. **Campuses Page** (`/campuses`) - Browse all available campuses (protected)
5. **Campus Drops Page** (`/campuses/:slug`) - View drops for specific campus (protected)

### UI Highlights
- Modern gradient design with purple theme
- Responsive layout for mobile and desktop
- Smooth animations and transitions
- Protected routes requiring authentication
- Navigation bar with auth state
- Card-based layouts for campuses and drops
- Variant pills showing available colors and sizes
- MOQ badges displaying minimum order quantities

### Demo Login
Use these credentials to test the application:
- **Username:** rahul_student
- **Password:** password123

Or create a new account via the Register page!

## Support

For issues or questions, refer to:
- Django docs: https://docs.djangoproject.com
- DRF docs: https://www.django-rest-framework.org
- React docs: https://react.dev
- PRD: [PRD_ccoop_MVP.md](PRD_ccoop_MVP.md)
