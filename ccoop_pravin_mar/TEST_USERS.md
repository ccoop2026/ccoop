# Test User Accounts - Quick Reference

**All passwords:** `password123`

---

## 👨‍🎓 STUDENTS

### Rahul Sharma
- **Username:** `rahul_student`
- **Email:** rahul@iitb.ac.in
- **Phone:** +919876543210
- **Campus:** IIT Bombay
- **Role:** Student/Alumni
- **Use Case:** IIT Bombay student browsing drops, making pledges

### Priya Verma
- **Username:** `priya_student`
- **Email:** priya@iitd.ac.in
- **Phone:** +919876543211
- **Campus:** IIT Delhi
- **Role:** Student/Alumni
- **Use Case:** IIT Delhi student with different campus drops

### Amit Kumar
- **Username:** `amit_student`
- **Email:** amit@bits.ac.in
- **Phone:** +919876543212
- **Campus:** BITS Pilani
- **Role:** Student/Alumni
- **Use Case:** BITS Pilani student testing multi-campus experience

---

## 📦 DROP HOSTS

### Vikram Patel
- **Username:** `host_iitb`
- **Email:** host@iitb.ac.in
- **Phone:** +919876543220
- **Manages:** IIT Bombay
- **Role:** Drop Host
- **Use Case:** Verify shipments, coordinate pickups at IIT Bombay

### Anjali Singh
- **Username:** `host_iitd`
- **Email:** host@iitd.ac.in
- **Phone:** +919876543221
- **Manages:** IIT Delhi
- **Role:** Drop Host
- **Use Case:** Manage drop logistics at IIT Delhi

---

## 🎯 CAMPUS CURATORS

### Rajesh Gupta
- **Username:** `curator_iitb`
- **Email:** curator@iitb.ac.in
- **Phone:** +919876543230
- **Manages:** IIT Bombay
- **Role:** Campus Curator
- **Use Case:** Create and manage drops for IIT Bombay

### Meera Reddy
- **Username:** `curator_iitd`
- **Email:** curator@iitd.ac.in
- **Phone:** +919876543231
- **Manages:** IIT Delhi
- **Role:** Campus Curator
- **Use Case:** Configure drops, variants, MOQs for IIT Delhi

---

## 👑 GLOBAL ADMIN

### Sanjay Mehta
- **Username:** `admin_global`
- **Email:** admin@ccoop.in
- **Phone:** +919876543240
- **Role:** Global Admin/Operations
- **Admin Access:** YES (is_staff=True)
- **Use Case:** Platform-wide management, vendor oversight, refunds

---

## Quick Login Guide

### For Frontend Testing (http://localhost:8000)
1. Click "Login"
2. Enter any username from above
3. Password: `password123`
4. Browse campuses and drops

### For Admin Panel Testing (http://localhost:8000/admin)
1. Use: `admin_global` / `password123`
2. Manage all users, campuses, drops, variants, pledges

---

## Sample Data Overview

### Campuses (3)
- IIT Bombay (iit-bombay)
- IIT Delhi (iit-delhi)
- BITS Pilani (bits-pilani)

### Drops (4)
- **IIT Bombay Official Hoodies** - 8 variants (Navy Blue/Black, S/M/L/XL)
- **IIT Bombay Tech Fest T-Shirts** - 8 variants (White/Red, S/M/L/XL)
- **IIT Delhi Alumni Reunion Collection** - 3 variants (Green, M/L/XL)
- **BITS Pilani Fest Merchandise** - 4 variants (Maroon/Yellow, M/L)

### Total Variants: 23

### Existing Pledges (2)
- rahul_student → Navy Blue M Hoodie (qty: 2, unpaid)
- priya_student → White L T-Shirt (qty: 1, unpaid)

---

## Testing Recommendations

1. **Student Experience:** Use `rahul_student` - has existing pledges
2. **Multi-Campus:** Use `priya_student` - different campus, different drops
3. **New User:** Use `amit_student` - clean slate, no pledges
4. **Admin Testing:** Use `admin_global` - full platform access
5. **Role Verification:** Login to admin, check user roles and campus associations

---

## Notes

- All users can login to the frontend
- Only `admin_global` can access Django admin panel
- Role-specific features (Drop Host, Curator dashboards) not yet implemented
- Current UI is student-focused; admin users see same interface
- Use Django admin to view/edit role assignments and campus relationships
