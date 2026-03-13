# Role-Based Dashboard Specifications

## Design Theme
- **Background**: Dark navy (#1a1d2e, #0f1419)
- **Cards**: Dark blue/navy (#1e2433, #252d3d)
- **Primary Accent**: Blue (#2196f3, #0ea5e9)
- **Secondary Accent**: Orange (#ff6b35)
- **Text**: White/light gray
- **Borders**: Subtle blue glow

## Role-Specific Dashboards

### 1. STUDENT Dashboard (`rahul_student`, `priya_student`, `amit_student`)

**View**: Active Campaigns & Order Tracking

**Sections**:
- Profile header (name, campus, student ID)
- Wallet balance & Total orders
- **Active Campaigns** section:
  - Campaign cards showing:
    - Drop title & image
    - Pledge status (Pledged, MOQ Reached, In Production, etc.)
    - MOQ progress bar
    - Variant details
    - Payment status
- **In Distribution** section:
  - Items ready for pickup
  - Drop Host name & location
  - Pickup QR code
  - Pickup deadline
- **Past Orders** section
- Quick actions (Browse more, Track order, Support)

**Key Features**:
- See which campaigns are active
- Track distribution status
- Know who the drop host is
- Get pickup information

---

### 2. DROP HOST Dashboard (`host_iitb`, `host_iitd`)

**View**: Delivery Management & Operations

**Sections**:
- Profile header (name, campus, HOST badge)
- Daily summary (Pickups today, Pending stock)
- **Active Campaigns** section:
  - Campaigns currently in distribution
  - Number of pending pickups per campaign
  - Stock arrival status
- **Delivery List**:
  - Student name & ID
  - Order details
  - Payment status (Paid 50%, Paid 100%)
  - Pickup status
  - QR/OTP verification
- **Orders from Curator**:
  - New campaigns assigned
  - Expected delivery dates
  - Stock manifests
- **Completed Campaigns**:
  - Past fulfilled orders
  - Statistics
- Quick actions (Scan QR, Mark arrived, Fulfill pickup)

**Key Features**:
- See all pending deliveries
- Track who needs to pick up
- Verify payments before dispatch
- Coordinate with curator

---

### 3. CURATOR Dashboard (`curator_iitb`, `curator_iitd`)

**View**: Drop Creation & Management

**Sections**:
- Profile header (name, campus, CURATOR badge)
- **Create New Drop** button (primary CTA)
- **My Active Drops**:
  - Drop cards with:
    - Title & description
    - MOQ progress
    - Pledge count
    - Payment collection status
    - Edit/Manage buttons
- **Drop Performance Analytics**:
  - Total pledges
  - Conversion rate
  - Revenue collected
  - Items dispatched
- **Pending Actions**:
  - Failed variant notifications
  - Payment window expiring
  - Production approvals
- Drop history & archive
- Quick actions (Create drop, View analytics, Manage variants)

**Key Features**:
- Create and configure drops
- Set variants & MOQs
- Monitor performance
- Manage timelines

---

### 4. ADMIN Dashboard (`admin_global`)

**View**: Platform Overview & Management

**Sections**:
- Profile header (name, GLOBAL ADMIN badge)
- **Platform Stats**:
  - Total campuses
  - Active drops across all campuses
  - Total orders
  - Revenue (platform-wide)
- **All Campuses** overview:
  - Campus cards with quick stats
  - Active drops per campus
  - Pending issues
- **All Active Drops** (cross-campus):
  - Drop name & campus
  - MOQ status
  - Payment collection
  - Issues/alerts
- **Pending Actions**:
  - MOQ override requests
  - Refund requests
  - Support tickets
  - Manual interventions needed
- Quick actions (All campuses, All drops, User management, MOQ override, Refunds)

**Key Features**:
- See everything across all campuses
- Manage vendors & inventory
- Handle refunds & exceptions
- Platform health monitoring

---

## Navigation Strategy

### Navbar (Dark)
- Logo (left)
- Role-specific links:
  - **Student**: Dashboard, Browse Drops, My Orders
  - **Drop Host**: Dashboard, Deliveries, Scanner
  - **Curator**: Dashboard, My Drops, Create Drop, Analytics
  - **Admin**: Dashboard, Campuses, Drops, Users, Settings
- User greeting + role badge
- Logout button

### Bottom Navigation (Mobile - if needed)
- Home
- Orders/Deliveries (role-specific)
- Scanner (for hosts)
- Profile

---

## Implementation Priority

1. Dark theme CSS
2. Role detection & storage
3. Student dashboard (most common user)
4. Drop Host dashboard
5. Curator dashboard
6. Admin dashboard
7. Role-based navigation
8. Testing with all 8 test users
