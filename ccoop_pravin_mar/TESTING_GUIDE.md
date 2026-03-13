# ccoop.in MVP - Human Testing Guide

**Version:** 1.0
**Date:** March 13, 2026
**Purpose:** Manual testing guide for all user roles and functionalities

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Test User Accounts](#test-user-accounts)
3. [Testing Scenarios by Role](#testing-scenarios-by-role)
4. [Feature Testing Checklist](#feature-testing-checklist)
5. [API Testing](#api-testing)
6. [Known Limitations](#known-limitations)
7. [Reporting Issues](#reporting-issues)

---

## Getting Started

### Prerequisites
- Application is running at `http://localhost:8000`
- Fresh database with sample data loaded

### Start the Application

```bash
cd backend
..\.venv\Scripts\python manage.py runserver
```

Visit: **http://localhost:8000**

---

## Test User Accounts

All accounts use the same password: **`password123`**

### Students (Role: STUDENT)

| Username | Full Name | Campus | Email | Phone |
|----------|-----------|--------|-------|-------|
| `rahul_student` | Rahul Sharma | IIT Bombay | rahul@iitb.ac.in | +919876543210 |
| `priya_student` | Priya Verma | IIT Delhi | priya@iitd.ac.in | +919876543211 |
| `amit_student` | Amit Kumar | BITS Pilani | amit@bits.ac.in | +919876543212 |

**Primary Responsibilities:**
- Browse campuses and discover drops
- Pledge interest in merchandise
- Make payments (once implemented)
- Track orders
- Pick up items

---

### Drop Hosts (Role: DROP_HOST)

| Username | Full Name | Managed Campus | Email | Phone |
|----------|-----------|----------------|-------|-------|
| `host_iitb` | Vikram Patel | IIT Bombay | host@iitb.ac.in | +919876543220 |
| `host_iitd` | Anjali Singh | IIT Delhi | host@iitd.ac.in | +919876543221 |

**Primary Responsibilities:**
- Verify incoming shipments via QR scanning (future)
- Update arrival status
- Verify payments before dispatch
- Coordinate campus pickups

---

### Campus Curators (Role: CAMPUS_CURATOR)

| Username | Full Name | Managed Campus | Email | Phone |
|----------|-----------|----------------|-------|-------|
| `curator_iitb` | Rajesh Gupta | IIT Bombay | curator@iitb.ac.in | +919876543230 |
| `curator_iitd` | Meera Reddy | IIT Delhi | curator@iitd.ac.in | +919876543231 |

**Primary Responsibilities:**
- Create and manage drops for their campus
- Configure variants, MOQs, and timelines
- Monitor drop performance

---

### Global Admin (Role: GLOBAL_ADMIN)

| Username | Full Name | Email | Phone |
|----------|-----------|-------|-------|
| `admin_global` | Sanjay Mehta | admin@ccoop.in | +919876543240 |

**Primary Responsibilities:**
- Oversee all campuses and drops
- Manage vendors
- Handle refunds and exceptions
- Manual inventory overrides
- Platform health monitoring

**Admin Panel Access:** `http://localhost:8000/admin`

---

## Testing Scenarios by Role

### 1. Student Testing Scenarios

#### Scenario 1.1: First-Time User Registration & Login

**Steps:**
1. Visit `http://localhost:8000`
2. Click "Get Started" or "Sign Up"
3. Fill registration form with:
   - Username: `test_student_1`
   - Email: `test1@example.com`
   - Phone: `+919999999999`
   - Password: `testpass123`
   - Confirm Password: `testpass123`
4. Click "Create Account"

**Expected Result:**
- User is created
- Redirected to `/campuses` page
- Navbar shows "Hello, test_student_1"

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 1.2: Login with Existing Student Account

**Steps:**
1. Visit `http://localhost:8000`
2. Click "Login"
3. Enter credentials:
   - Username: `rahul_student`
   - Password: `password123`
4. Click "Sign In"

**Expected Result:**
- User is authenticated
- Redirected to `/campuses` page
- Navbar shows "Hello, rahul_student"
- Logout button visible

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 1.3: Browse Campuses

**Steps:**
1. Login as `rahul_student`
2. Navigate to `/campuses`
3. Observe campus cards

**Expected Result:**
- 3 campus cards visible:
  - IIT Bombay
  - IIT Delhi
  - BITS Pilani
- Each card shows name, description, "View Drops" badge
- Cards have hover effect

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 1.4: View Campus Drops

**Steps:**
1. Login as `rahul_student`
2. Navigate to `/campuses`
3. Click on "IIT Bombay" card

**Expected Result:**
- Redirected to `/campuses/iit-bombay`
- Breadcrumb shows: Campuses / IIT Bombay
- 2 drops visible:
  - IIT Bombay Official Hoodies - Winter 2026
  - IIT Bombay Tech Fest T-Shirts
- Each drop shows:
  - Title and description
  - Available color variants (Navy Blue, Black for hoodies)
  - Available sizes (S, M, L, XL)
  - MOQ badge (MOQ: 20 units)
  - "Pledge Interest" button

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 1.5: View Different Campus Drops

**Steps:**
1. Login as `priya_student`
2. Navigate to `/campuses/iit-delhi`

**Expected Result:**
- 1 drop visible: IIT Delhi Alumni Reunion Collection
- Green color variant
- Sizes: M, L, XL
- MOQ: 25 units

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 1.6: Pledge Interest (UI Only)

**Steps:**
1. Login as any student
2. Navigate to any campus drops page
3. Click "Pledge Interest" button on a drop

**Expected Result:**
- Alert shows: "Pledge functionality coming soon!"
- (Note: Backend pledge creation not yet implemented in UI)

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 1.7: Logout

**Steps:**
1. Login as any student
2. Click "Logout" button in navbar

**Expected Result:**
- User is logged out
- localStorage cleared
- Redirected to `/login` page
- Navbar shows "Login" and "Sign Up" buttons

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 1.8: Protected Route Access

**Steps:**
1. Without logging in, try to access `/campuses` directly
2. Type `http://localhost:8000/campuses` in browser

**Expected Result:**
- Automatically redirected to `/login`
- After login, user should be able to access `/campuses`

**Status:** ⬜ Pass ⬜ Fail

---

### 2. Drop Host Testing Scenarios

#### Scenario 2.1: Drop Host Login

**Steps:**
1. Visit `http://localhost:8000/login`
2. Login with:
   - Username: `host_iitb`
   - Password: `password123`

**Expected Result:**
- User logged in successfully
- Can browse campuses (same as student for now)
- Admin panel accessible at `/admin` (if is_staff=True)

**Status:** ⬜ Pass ⬜ Fail

**Note:** Drop Host specific features (QR scanning, shipment verification) are not yet implemented in the UI. These users can currently:
- Access the application
- View their role in Django admin
- Future: Shipment verification, pickup coordination

---

### 3. Campus Curator Testing Scenarios

#### Scenario 3.1: Campus Curator Login

**Steps:**
1. Visit `http://localhost:8000/login`
2. Login with:
   - Username: `curator_iitb`
   - Password: `password123`

**Expected Result:**
- User logged in successfully
- Can browse campuses
- Can view drops for their managed campus (IIT Bombay)

**Status:** ⬜ Pass ⬜ Fail

**Note:** Campus Curator specific features (drop creation, variant configuration) are not yet implemented in the UI. These users can currently:
- Access the application
- View their role and managed campus in Django admin
- Future: Drop management dashboard, MOQ configuration

---

### 4. Global Admin Testing Scenarios

#### Scenario 4.1: Admin Panel Access

**Steps:**
1. Visit `http://localhost:8000/admin`
2. Login with:
   - Username: `admin_global`
   - Password: `password123`

**Expected Result:**
- Django admin dashboard loads
- Can see all models:
  - Users
  - Campuses
  - Drops
  - Variants
  - Pledges

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 4.2: View User Roles in Admin

**Steps:**
1. Login to admin as `admin_global`
2. Click on "Users"
3. Observe user list

**Expected Result:**
- All 8 users visible
- Columns show: Username, Email, Role, Home Campus, Managed Campus, Staff Status
- Can filter by Role, Home Campus, Managed Campus
- Can search by username, email, phone

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 4.3: Edit User Role

**Steps:**
1. Login to admin as `admin_global`
2. Click on "Users"
3. Click on `rahul_student`
4. Change role from "Student/Alumni" to "Campus Curator"
5. Set "Managed campus" to IIT Bombay
6. Click "Save"

**Expected Result:**
- User role updated successfully
- User now shows as "Campus Curator" in user list
- Managed campus shows as IIT Bombay

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 4.4: View All Campuses

**Steps:**
1. Login to admin as `admin_global`
2. Click on "Campuses"

**Expected Result:**
- 3 campuses listed:
  - IIT Bombay (iit-bombay)
  - IIT Delhi (iit-delhi)
  - BITS Pilani (bits-pilani)

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 4.5: View All Drops

**Steps:**
1. Login to admin as `admin_global`
2. Click on "Drops"

**Expected Result:**
- 4 drops listed with columns:
  - Title
  - Campus
  - Live status (all should be True)
  - Created at timestamp
- Can filter by Campus and Live status

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 4.6: View Drop Variants

**Steps:**
1. Login to admin as `admin_global`
2. Click on "Variants"
3. Observe variant list

**Expected Result:**
- 23 variants listed
- Columns show: Drop, Color, Size, MOQ
- Can see all combinations:
  - Hoodies: Navy Blue & Black in S, M, L, XL (8 variants)
  - T-Shirts: White & Red in S, M, L, XL (8 variants)
  - Alumni Collection: Green in M, L, XL (3 variants)
  - Fest Merch: Maroon & Yellow in M, L (4 variants)

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 4.7: View Pledges

**Steps:**
1. Login to admin as `admin_global`
2. Click on "Pledges"

**Expected Result:**
- 2 pledges visible:
  - rahul_student pledged 2 of Navy Blue M Hoodies (Unpaid)
  - priya_student pledged 1 of White L T-Shirt (Unpaid)
- Columns show: User, Variant, Quantity, Paid status, Created at

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 4.8: Create New Campus

**Steps:**
1. Login to admin as `admin_global`
2. Click on "Campuses"
3. Click "Add Campus" button
4. Fill form:
   - Name: `NIT Trichy`
   - Slug: `nit-trichy` (auto-populated)
   - Description: `National Institute of Technology, Tiruchirappalli`
5. Click "Save"

**Expected Result:**
- New campus created
- Visible in campus list
- Accessible via API at `/api/campuses/`
- Visible in frontend campus browse page

**Status:** ⬜ Pass ⬜ Fail

---

#### Scenario 4.9: Create New Drop

**Steps:**
1. Login to admin as `admin_global`
2. Click on "Drops"
3. Click "Add Drop"
4. Fill form:
   - Campus: IIT Bombay
   - Title: `Test Drop - Spring Collection`
   - Description: `Testing drop creation`
   - Live: ✓ (checked)
5. Click "Save"

**Expected Result:**
- New drop created
- Visible in drops list
- Should appear in IIT Bombay drops on frontend (after page refresh)

**Status:** ⬜ Pass ⬜ Fail

---

## Feature Testing Checklist

### Frontend Features

#### Navigation & Layout
- ⬜ Navbar displays correctly
- ⬜ Logo links to home page
- ⬜ Navigation links work
- ⬜ Auth state shown correctly (logged in vs logged out)
- ⬜ Logout button works
- ⬜ Responsive design works on mobile

#### Home Page
- ⬜ Landing page loads correctly
- ⬜ "What We Offer" section displays
- ⬜ "How It Works" section displays
- ⬜ CTA buttons work (Get Started, Sign In)

#### Authentication
- ⬜ Login form validation works
- ⬜ Registration form validation works
- ⬜ Password mismatch error shows
- ⬜ Successful login redirects to campuses
- ⬜ Logout clears session
- ⬜ Demo credentials hint visible on login page

#### Campus Browsing
- ⬜ All campuses load
- ⬜ Campus cards display name, description, badge
- ⬜ Hover effects work
- ⬜ Click navigates to campus drops
- ⬜ Empty state shows when no campuses

#### Drop Browsing
- ⬜ Breadcrumb navigation works
- ⬜ Drop cards display correctly
- ⬜ Variant pills show colors
- ⬜ Variant pills show sizes
- ⬜ MOQ badge displays
- ⬜ Empty state shows when no drops
- ⬜ "Pledge Interest" button shows alert

#### Protected Routes
- ⬜ `/campuses` requires authentication
- ⬜ `/campuses/:slug` requires authentication
- ⬜ Unauthenticated users redirected to login
- ⬜ After login, original route is accessible

---

### Backend Features

#### API Endpoints
- ⬜ `GET /api/campuses/` returns all campuses
- ⬜ `GET /api/campuses/{id}/` returns single campus
- ⬜ `GET /api/drops/` returns all live drops
- ⬜ `GET /api/drops/?campus=slug` filters by campus
- ⬜ `GET /api/drops/{id}/` returns single drop with variants
- ⬜ Variants nested in drop response

#### User Management
- ⬜ User roles stored correctly
- ⬜ Home campus association works
- ⬜ Managed campus association works
- ⬜ Role-based properties work (is_student, is_drop_host, etc.)

#### Admin Panel
- ⬜ Admin can access all models
- ⬜ User list shows role and campus columns
- ⬜ User filtering by role works
- ⬜ User search works
- ⬜ Campus creation works
- ⬜ Drop creation works
- ⬜ Variant creation works
- ⬜ Pledge viewing works

---

## API Testing

### Using cURL

#### Test Campus API
```bash
curl http://localhost:8000/api/campuses/
```

**Expected:** JSON array of 3 campuses

---

#### Test Drops API
```bash
curl http://localhost:8000/api/drops/
```

**Expected:** JSON array of 4 drops (all live)

---

#### Test Filtered Drops
```bash
curl "http://localhost:8000/api/drops/?campus=iit-bombay"
```

**Expected:** JSON array of 2 drops (IIT Bombay hoodies and t-shirts)

---

#### Test Single Drop with Variants
```bash
curl http://localhost:8000/api/drops/1/
```

**Expected:** JSON object with drop details including nested variants array

---

### Using Browser Developer Tools

1. Open DevTools (F12)
2. Go to Network tab
3. Navigate through the application
4. Observe API calls:
   - Should see `/api/campuses/` on campuses page load
   - Should see `/api/drops/?campus=slug` on campus drops page load
   - Check response status codes (should be 200)
   - Check response JSON structure

---

## Known Limitations

### Current MVP Status

✅ **Implemented:**
- User authentication UI (login/register forms)
- Role-based user model
- Campus browsing
- Drop browsing with variants
- Protected routes
- Django admin for all models
- Sample data with 8 role-based users

⏳ **Not Yet Implemented:**
- **Backend Authentication:** Login/register currently uses localStorage only, not integrated with Django REST Framework authentication
- **Pledge Creation:** UI button shows alert, not connected to backend API
- **Payment Integration:** Razorpay not integrated
- **MOQ Validation:** Logic not implemented
- **Drop State Machine:** States not implemented
- **QR Code Scanning:** Drop host features not implemented
- **Campus Curator Dashboard:** Management UI not created
- **Global Admin Dashboard:** Custom admin views not created
- **Email/SMS Notifications:** Not implemented
- **Phone OTP:** Not implemented
- **Google OAuth:** Placeholder only

### UI Limitations
- Authentication is frontend-only (localStorage)
- No role-specific dashboards yet
- No pledge flow implementation
- No payment flow
- No order tracking
- No pickup verification

---

## Reporting Issues

### Issue Format

When reporting issues, please include:

1. **Scenario Number:** (e.g., Scenario 1.2)
2. **User Role:** (e.g., Student - rahul_student)
3. **Steps Taken:** Exact steps you followed
4. **Expected Result:** What should have happened
5. **Actual Result:** What actually happened
6. **Screenshots:** If applicable
7. **Browser:** Chrome, Firefox, Safari, etc.
8. **Error Messages:** Any console errors (F12 → Console tab)

### Example Issue Report

```
**Scenario:** 1.4 - View Campus Drops
**User:** rahul_student
**Steps:**
1. Logged in as rahul_student
2. Clicked on IIT Bombay campus card
3. Page loaded /campuses/iit-bombay

**Expected:** Should see 2 drops
**Actual:** Seeing 0 drops, empty state message shows

**Screenshot:** [attached]
**Browser:** Chrome 120
**Console Error:**
  Failed to load resource: the server responded with a status of 500 (Internal Server Error)
  GET http://localhost:8000/api/drops/?campus=iit-bombay
```

---

## Testing Completion Sign-Off

**Tester Name:** _________________________

**Date:** _________________________

**Overall Status:** ⬜ Pass ⬜ Fail ⬜ Pass with Issues

**Total Scenarios Tested:** _____ / 20

**Issues Found:** _____

**Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Next Steps After Testing

Based on testing results, prioritize implementation of:

1. **Backend Authentication Integration**
   - Django REST Framework token authentication
   - Login/register API endpoints
   - Session management

2. **Pledge Flow**
   - Pledge creation API
   - Cart functionality
   - MOQ tracking

3. **Role-Specific Dashboards**
   - Campus Curator: Drop management
   - Drop Host: Shipment verification
   - Global Admin: Platform overview

4. **Payment Integration**
   - Razorpay setup
   - 50%/100% payment options
   - Balance payment flow

5. **State Machine Implementation**
   - Drop states (Draft → Live → MOQ Met → etc.)
   - State transitions
   - Notifications

---

**Happy Testing! 🚀**

For questions or issues, refer to [QUICKSTART.md](QUICKSTART.md) or [README.md](README.md).
