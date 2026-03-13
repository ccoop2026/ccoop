# ccoop.in - MVP Product Requirements Document (PRD)

**Version:** 1.0
**Date:** March 12, 2026
**Document Owner:** Product & Solution Architecture
**Target Audience:** AI Coding Agents, Engineering Teams, Product Stakeholders

---

## Table of Contents

1. [Context and Product Definition](#1-context-and-product-definition)
2. [Objectives and Constraints for MVP](#2-objectives-and-constraints-for-mvp)
3. [MVP Scope: Feature Set](#3-mvp-scope-feature-set)
4. [Detailed Functional Requirements](#4-detailed-functional-requirements)
5. [Data Model and API Contracts](#5-data-model-and-api-contracts)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Phased CI/CD and Platform Evolution Plan](#7-phased-cicd-and-platform-evolution-plan)
8. [Acceptance Criteria and Test Cases](#8-acceptance-criteria-and-test-cases)
9. [Open Questions and Assumptions](#9-open-questions-and-assumptions)

---

## 1. Context and Product Definition

### 1.1 Product Overview

**ccoop.in** is a multi-tenant collegiate commerce platform enabling colleges to operate branded merchandise storefronts with two distinct business models:

**Model 1: Demand-Validated Pre-Order "Drops"**
- Students pledge interest in merchandise without payment commitment
- Production is triggered only when Minimum Order Quantities (MOQs) are validated
- After MOQ validation, students pay 50% token advance or full amount
- Items are batch-produced, shipped to campus, and distributed locally
- Remaining 50% balance is collected upon arrival at campus before pickup

**Model 2: Time-Bound Campus Store**
- Select campuses sell existing inventory directly
- No MOQ requirements
- Operates within defined time windows (recurring or one-time)
- Immediate purchase and pickup model

### 1.2 User Roles

| Role | Primary Responsibilities |
|------|-------------------------|
| **Student/Alumni** | Browse campuses, discover drops, pledge/order merchandise, make payments, track orders, pick up items |
| **Drop Host** | Verify incoming shipments via QR scanning, update arrival status, verify payments before dispatch, coordinate campus pickups |
| **Campus Curator** | Create and manage drops for their campus, configure variants/MOQs/timelines, monitor drop performance |
| **Global Admin/Operations** | Oversee all campuses and drops, manage vendors, handle refunds/exceptions, manual inventory overrides, platform health monitoring |

### 1.3 Key Business Mechanics

**Pledge-to-Payment Flow:**
1. Student pledges (free, non-binding)
2. System tracks pledges against MOQ thresholds
3. When MOQ met → payment window opens
4. Student pays 50% advance or 100% full payment
5. Orders produced and shipped to campus
6. Drop Host receives shipment, scans QRs for verification
7. Notification sent to students for remaining 50% payment (if applicable)
8. Upon full payment → pickup QR/OTP sent to student
9. Drop Host scans student's QR or validates OTP for dispatch

**MOQ Logic:**
- MOQ can be set at category level (e.g., "200 total items")
- MOQ can also be set at variant level for colors only (not sizes)
- Variants failing individual MOQ trigger student notification to switch to winning variant or drop pledge
- Global Admin can override MOQ rules for minor discrepancies

**Inventory Management (Campus Store):**
- Inventory auto-adjusts based on master sheet data
- Auto-reconciliation when Drop Host receives stock
- Auto-decrements during dispatches
- Global Admin has manual override for damages/missing items

---

## 2. Objectives and Constraints for MVP

### 2.1 Primary Business Goals

1. **Validate Pledge-to-Pickup Funnel**: Prove that the demand-validated drop model drives conversion from pledge → payment → pickup with <10% drop-off at each stage for 1-2 pilot campuses.

2. **Prove Campus Operations Model**: Demonstrate that Drop Hosts can manage shipment verification and pickup logistics with <5% operational errors (wrong items, payment mismatches).

3. **Achieve Initial GMV Milestone**: Generate ₹2-5 Lakhs GMV per pilot campus within 30 days of launch, validating product-market fit.

### 2.2 Non-Negotiable Product Goals

1. **Reliable Pledge and Pickup**: System must accurately track pledges, MOQ validation, payment collection (50%/100%), and pickup verification for 1-2 campuses without data loss.

2. **Low Refund Friction**: By collecting payment only after MOQ validation, minimize refunds; for exceptional refunds, process within 7 business days with clear audit trail.

3. **Minimal Support Overhead**: Self-service flows for 90% of user journeys; Drop Hosts and Curators should operate independently with minimal Global Admin intervention.

4. **Multi-Campus Browsing**: Students can browse multiple campuses but checkout one campus cart at a time, with seamless campus switching.

5. **Payment Security and Compliance**: All payments via Razorpay with support for UPI, cards, net banking, wallets; PCI-DSS compliant flows.

### 2.3 Non-Goals for MVP (Explicitly Excluded)

1. **Campus Affiliation Verification**: No email domain validation or SSO integration with campus systems; students self-select campuses.

2. **Advanced Manufacturing Workflow**: No deep vendor/production management tools; production coordination is manual/external.

3. **Multi-Campus Analytics Dashboard**: No cross-campus analytics or BI tools; basic per-campus metrics only.

4. **Native Mobile Apps**: MVP is mobile-responsive web app only; native iOS/Android postponed.

5. **Automated Logistics Integration**: No API integration with shipping providers; tracking updates are manual push-button actions by Drop Hosts/Admins.

---

## 3. MVP Scope: Feature Set

| # | Feature Name | Description | Primary User(s) | Criticality |
|---|--------------|-------------|-----------------|-------------|
| **Student/Alumni Features** |
| 1 | User Registration & Authentication | Sign up via phone OTP or email OTP; OAuth with Google | Student/Alumni | Must |
| 2 | Campus Selection & Onboarding | Select home campus during profile setup; location-based suggestion if simple | Student/Alumni | Must |
| 3 | Multi-Campus Browsing | Browse drops from multiple campuses; switch campuses while shopping | Student/Alumni | Must |
| 4 | View Active Drops | See all live drops for selected campus with images, descriptions, variants, MOQ progress | Student/Alumni | Must |
| 5 | Pledge Flow (Pre-Payment) | Select variant (color, size), add to cart, confirm pledge (free, non-binding) | Student/Alumni | Must |
| 6 | MOQ Notification | Receive notification when drop reaches MOQ and payment window opens | Student/Alumni | Must |
| 7 | Payment Collection (50% or 100%) | Pay via Razorpay (UPI/cards/netbanking/wallets); choose 50% advance or full payment | Student/Alumni | Must |
| 8 | Order Status Tracking | View order states: Pledged, Payment Pending, Paid (50%/100%), In Production, Arrived at Campus, Ready for Pickup, Picked Up | Student/Alumni | Must |
| 9 | Balance Payment Notification | Receive notification to pay remaining 50% when order arrives at campus | Student/Alumni | Must |
| 10 | Pickup QR/OTP Generation | Receive QR code or OTP upon full payment for campus pickup | Student/Alumni | Must |
| 11 | Campus Store Shopping | Browse and purchase in-stock items directly (no MOQ) during store operating windows | Student/Alumni | Should |
| 12 | Per-Item Cart Status | View individual item status (arrival, payment, pickup location, Drop Host) including partial pickup support | Student/Alumni | Must |
| 13 | Variant Switching Notification | Receive notification if pledged variant fails MOQ; option to switch to winning variant or cancel pledge | Student/Alumni | Must |
| **Pledge/Drop Engine** |
| 14 | Drop Configuration | Define drop: title, description, category, variants (colors/sizes), images, MOQ (category & color-variant level), pledge window dates, payment window dates | Campus Curator | Must |
| 15 | MOQ Tracking | Real-time pledge count vs. MOQ threshold per category and per color variant | System/Curator | Must |
| 16 | Drop State Machine | States: Draft → Live → MOQ Met → Payment Window Open → Production → Shipped → Arrived → Closed | System | Must |
| 17 | Failed Variant Logic | Identify color variants that fail MOQ; trigger student notifications for switching or pledge cancellation | System | Must |
| 18 | Payment Window Management | Auto-open payment window when MOQ met; configurable duration; auto-close after deadline | System/Curator | Must |
| **Drop Host Operations** |
| 19 | Shipment QR Scanning | Scan box-level and item-level QR codes to verify incoming shipments per drop | Drop Host | Must |
| 20 | Arrival Confirmation | Mark drop as "Arrived at Campus" triggering student balance payment notifications and pickup readiness | Drop Host | Must |
| 21 | Pickup QR/OTP Verification | Scan student QR code or validate OTP; ensure full payment before dispatch | Drop Host | Must |
| 22 | Pickup Confirmation | Mark individual items as picked up; support partial pickup for multi-item orders | Drop Host | Must |
| 23 | Manual Push Notification | Button to manually push tracking/status updates to students | Drop Host/Admin | Should |
| 24 | Reconciliation Dashboard | View received vs. expected inventory; report damages/missing items to Global Admin | Drop Host | Must |
| **Campus Curator** |
| 25 | Create/Edit Drops | Full drop lifecycle management for assigned campus | Campus Curator | Must |
| 26 | Configure Variants & MOQs | Set color variants, sizes, category MOQ, per-variant color MOQ | Campus Curator | Must |
| 27 | Drop Performance View | High-level metrics: total pledges, conversion rate, payment collected, items dispatched | Campus Curator | Must |
| 28 | Campus Store Configuration | Set operating windows (recurring or one-time), assign inventory | Campus Curator | Should |
| **Global Admin/Operations** |
| 29 | Global Campus & Drop Overview | View all campuses, all drops, aggregate metrics | Global Admin | Must |
| 30 | MOQ Override Tool | Manually approve drops with minor MOQ shortfalls | Global Admin | Must |
| 31 | Payment Window Extension | Extend payment deadlines for specific drops | Global Admin | Should |
| 32 | Force Close Drop | Manually close a drop early (e.g., production issues) | Global Admin | Should |
| 33 | Refund Management | Track refund requests; process refunds (may integrate manual approval flow) | Global Admin | Must |
| 34 | Manual Inventory Override | Adjust inventory counts for damages/missing items reported by Drop Hosts | Global Admin | Must |
| 35 | User Role Management | Assign/revoke Drop Host and Campus Curator roles per campus | Global Admin | Must |

---

## 4. Detailed Functional Requirements

### 4.1 User Registration & Authentication

**Purpose:** Enable students, Drop Hosts, Curators, and Admins to securely access the platform.

**Preconditions:**
- User has a valid phone number or email address
- Or user has a Google account

**Happy Path:**

1. User navigates to registration page
2. User selects authentication method: Phone OTP, Email OTP, or Google OAuth
3. **If Phone OTP:**
   - User enters phone number
   - System sends 6-digit OTP via SMS
   - User enters OTP within 5 minutes
   - System validates OTP and creates user account
4. **If Email OTP:**
   - User enters email address
   - System sends 6-digit OTP via email
   - User enters OTP within 10 minutes
   - System validates OTP and creates user account
5. **If Google OAuth:**
   - User clicks "Sign in with Google"
   - User authorizes application in Google consent screen
   - System receives OAuth token and creates user account with Google profile data (name, email, profile picture)
6. Upon first login, user is redirected to campus selection/onboarding flow
7. Subsequent logins redirect to home campus dashboard

**Edge Cases & Error States:**

- **Invalid phone/email format:** Display validation error before sending OTP
- **OTP expired:** Allow user to request new OTP (max 3 attempts per 15 minutes)
- **OTP incorrect:** Show error; allow retry (max 3 attempts before regenerating OTP)
- **Google OAuth failure:** Display error message; offer alternative login methods
- **Account already exists:** Automatically log in existing user instead of creating duplicate

**Inputs:**
- Phone number (E.164 format: +91XXXXXXXXXX)
- Email address (RFC 5322 compliant)
- OTP (6-digit numeric string)
- Google OAuth token (handled by OAuth library)

**Outputs:**
- User session token (JWT with 7-day expiry)
- User profile object (userId, name, email, phone, profilePicture, homeampusId, roles[])

**Validation Rules:**
- Phone: Must be valid Indian mobile number (+91XXXXXXXXXX)
- Email: Must match standard email regex
- OTP: Exactly 6 digits
- Rate limiting: Max 5 OTP requests per phone/email per hour

---

### 4.2 Campus Selection & Onboarding

**Purpose:** Allow users to select their primary campus affiliation and optionally browse other campuses.

**Preconditions:**
- User is authenticated
- User has not yet selected a home campus

**Happy Path:**

1. User lands on campus selection screen
2. System displays list of all active campuses (name, logo, location)
3. **Optional:** If location permission granted, system suggests nearest campus at top of list
4. User searches or scrolls to find their campus
5. User taps campus to select as "Home Campus"
6. System saves `homeCampusId` to user profile
7. User is redirected to home campus dashboard showing active drops

**Edge Cases & Error States:**

- **Location permission denied:** Show full campus list alphabetically; no auto-suggestion
- **Campus not found:** Display "Request New Campus" button (logs request for Admin review; not implemented in MVP)
- **User wants to change home campus later:** Provide option in profile settings to switch home campus

**Inputs:**
- User location (latitude, longitude) - optional
- Selected campusId

**Outputs:**
- Updated user profile with homeCampusId
- Redirect to campus dashboard

**Validation Rules:**
- campusId must exist in active campuses list

---

### 4.3 Pledge Flow (Pre-Payment)

**Purpose:** Allow students to pledge interest in a drop variant without payment, signaling demand.

**Preconditions:**
- User is authenticated
- Drop is in "Live" state (pledge window is active)
- Selected variant is available

**Happy Path:**

1. User browses active drops on campus home page
2. User taps a drop to view details (images, description, price, variants, MOQ progress)
3. User selects color variant from available options
4. User selects size variant
5. User specifies quantity (default: 1)
6. User taps "Add to Cart"
7. System adds item to campus-specific cart (cart is campus-scoped)
8. User can continue shopping or proceed to "Review Pledges"
9. User reviews cart items and taps "Confirm Pledge"
10. System creates Pledge records (status: Pledged, paymentStatus: Unpaid)
11. System increments MOQ counters for category and color variant
12. System displays confirmation: "Your pledge is confirmed! We'll notify you when MOQ is reached."
13. User sees pledge in "My Orders" with status: "Pledged - Awaiting MOQ"

**Edge Cases & Error States:**

- **Drop is no longer Live:** Display message "This drop is no longer accepting pledges"
- **Variant out of stock (campus store):** Disable "Add to Cart" button; show "Out of Stock"
- **User tries to pledge for multiple campuses simultaneously:** Cart is campus-specific; switching campus prompts: "You have items in [Campus A] cart. Please checkout or clear cart before switching to [Campus B]."
- **Pledge window expires during checkout:** Show error: "Pledge window has closed. Please explore other drops."

**Inputs:**
- dropId
- variantId (color + size combination)
- quantity (integer, min: 1, max: 10 per user per drop)

**Outputs:**
- Pledge record created
- Updated cart state
- Updated MOQ progress counters

**Validation Rules:**
- Quantity must be between 1 and 10
- Drop must be in "Live" state
- Variant must belong to the selected drop

---

### 4.4 MOQ Validation & Payment Window Opening

**Purpose:** Automatically detect when MOQ thresholds are met and open payment collection window.

**Preconditions:**
- Drop is in "Live" state
- Pledges are being collected

**Happy Path:**

1. System continuously monitors pledge counts against MOQ thresholds (runs every 5 minutes via scheduled job)
2. **Category-level MOQ check:**
   - If total pledges across all variants >= category MOQ → MOQ Met
3. **Color-variant-level MOQ check:**
   - For each color variant, if pledges >= variant MOQ → Variant MOQ Met
   - If variant pledges < variant MOQ → Variant MOQ Failed
4. When category MOQ is met:
   - System transitions drop state to "MOQ Met"
   - System identifies winning variants (color variants that met their MOQ)
   - System identifies failed variants (color variants that did not meet MOQ)
5. For failed variants:
   - System sends notification to affected users: "Your pledged variant [Color] did not reach MOQ. Please choose: (a) Switch to [Winning Variant], or (b) Cancel Pledge."
   - Users have 48 hours to respond
6. System opens payment window (configured duration, e.g., 7 days)
7. System transitions drop state to "Payment Window Open"
8. System sends push notification to all users with winning variant pledges: "MOQ reached! Pay now to confirm your order: 50% advance or 100% full payment."
9. System sends in-app and email notifications with payment link

**Edge Cases & Error States:**

- **No variants meet MOQ:** Drop transitions to "Failed"; all pledges canceled; no payments collected; notification sent to all users
- **User does not switch variant within 48 hours:** Pledge auto-canceled; user notified
- **Payment window expires with unfulfilled pledges:** Unpaid pledges canceled; drop proceeds with paid orders only
- **Global Admin manual override:** Admin can force MOQ Met state even if thresholds not reached (logs override reason)

**Inputs:**
- Scheduled job trigger (every 5 minutes)
- Drop configuration (category MOQ, variant MOQs, payment window duration)

**Outputs:**
- Drop state transition
- Variant status (Met / Failed)
- Notifications sent to users
- Payment window opened

**Validation Rules:**
- Category MOQ must be integer > 0
- Variant MOQ must be integer > 0
- Payment window duration must be between 1 and 30 days

---

### 4.5 Payment Collection (50% Advance or 100% Full)

**Purpose:** Collect payment from students after MOQ validation to confirm orders.

**Preconditions:**
- Drop is in "Payment Window Open" state
- User has pledges with status "Pledged - Unpaid"
- Payment window has not expired

**Happy Path:**

1. User receives notification: "MOQ reached! Pay now to confirm your order."
2. User navigates to "My Orders" and taps on pledged order
3. System displays payment options:
   - **Option A:** Pay 50% Advance (₹X)
   - **Option B:** Pay 100% Full Payment (₹Y)
4. User selects payment option
5. User taps "Proceed to Payment"
6. System calculates total amount based on selection
7. System redirects to Razorpay payment gateway
8. User selects payment method (UPI, Card, Net Banking, Wallet)
9. User completes payment
10. Razorpay sends webhook to system with payment status
11. **If payment successful:**
    - System updates Order paymentStatus to "Paid 50%" or "Paid 100%"
    - System updates Order status to "Payment Confirmed - In Production"
    - System sends confirmation notification to user
    - System stores payment record (transactionId, amount, method, timestamp)
12. **If payment failed:**
    - System keeps Order paymentStatus as "Unpaid"
    - System displays error message with retry option
    - User can retry payment before window expires

**Edge Cases & Error States:**

- **Payment window expires before user pays:** Order status changes to "Pledge Canceled"; user notified
- **Razorpay webhook fails:** System has polling mechanism to check payment status every 10 minutes for pending transactions
- **User pays partial amount directly to Razorpay (edge case):** System only accepts exact 50% or 100% amounts; mismatch triggers manual review by Admin
- **User tries to pay for canceled pledge:** Display error: "This pledge has been canceled. Payment cannot be processed."
- **Multiple concurrent payment attempts:** System uses idempotency key (orderId + userId + timestamp) to prevent duplicate charges

**Inputs:**
- orderId
- paymentOption ("advance_50" | "full_100")
- Razorpay payment details (transactionId, amount, method, status)

**Outputs:**
- Updated Order record (paymentStatus, status, paidAmount, balanceDue, transactionIds[])
- Payment record created
- Confirmation notification sent

**Validation Rules:**
- Payment amount must match exactly 50% or 100% of order total
- Payment window must be active
- Order must be in "Pledged - Unpaid" state

---

### 4.6 Balance Payment Collection (Remaining 50%)

**Purpose:** Collect remaining 50% balance when order arrives at campus before allowing pickup.

**Preconditions:**
- Order paymentStatus is "Paid 50%"
- Drop Host has marked shipment as "Arrived at Campus"
- Order status is "Arrived - Balance Payment Pending"

**Happy Path:**

1. Drop Host scans shipment QR codes and confirms arrival
2. System transitions all orders in that drop with paymentStatus "Paid 50%" to status "Arrived - Balance Payment Pending"
3. System sends notification to users: "Your order has arrived at campus! Pay the remaining 50% (₹X) to get your pickup QR code."
4. User navigates to "My Orders" and taps on order
5. User sees balance due amount and "Pay Now" button
6. User taps "Pay Now"
7. System redirects to Razorpay for remaining 50% amount
8. User completes payment
9. Razorpay webhook confirms payment
10. **If payment successful:**
    - System updates Order paymentStatus to "Paid 100%"
    - System updates Order status to "Ready for Pickup"
    - System generates pickup QR code (encoded: orderId + userId + verificationToken)
    - System generates 6-digit pickup OTP (alternative to QR)
    - System sends notification with QR code and OTP: "Payment complete! Show this QR code or OTP at [Drop Host Location] to collect your order."
    - Notification includes Drop Host name, location, and contact

**Edge Cases & Error States:**

- **User does not pay balance within 7 days of arrival:** Order moves to "Payment Overdue"; Drop Host can choose to hold or return item; user notified
- **Payment fails:** User can retry; order remains in "Balance Payment Pending"
- **Drop Host dispatches item before full payment (error):** System logs violation; Admin alerted; payment still must be collected post-dispatch

**Inputs:**
- orderId
- Razorpay payment details (transactionId, amount, method, status)

**Outputs:**
- Updated Order (paymentStatus: "Paid 100%", status: "Ready for Pickup")
- Pickup QR code generated
- Pickup OTP generated (6-digit, valid for 7 days)
- Notification with pickup details sent

**Validation Rules:**
- Payment amount must equal exact balance due (50% of order total)
- Order must be in "Arrived - Balance Payment Pending" state

---

### 4.7 Shipment QR Scanning & Verification

**Purpose:** Enable Drop Hosts to verify incoming shipments against expected inventory.

**Preconditions:**
- Drop Host is authenticated and assigned to campus
- Drop is in "Shipped" state
- Shipment has arrived physically at campus

**Happy Path:**

1. Drop Host navigates to "Incoming Shipments" dashboard
2. System displays list of expected shipments (drop name, expected items count, shipping date)
3. Drop Host selects a shipment to verify
4. System displays verification screen with two modes:
   - **Box-level scan:** Scan box QR to verify box contents
   - **Item-level scan:** Scan individual item QR codes
5. Drop Host scans box QR code using device camera
6. System decodes QR: boxId, dropId, expectedItemCount, itemVariantIds[]
7. System validates box against drop manifest
8. **If box valid:**
   - System marks box as "Received"
   - System increments received item counters per variant
   - UI shows green checkmark
9. Drop Host repeats for all boxes
10. After scanning all boxes, Drop Host reviews reconciliation summary:
    - Expected: 200 items
    - Received: 198 items
    - Missing: 2 items (variant details shown)
11. **If discrepancies found:**
    - Drop Host can report missing/damaged items
    - System prompts: "Report missing items to Global Admin for manual override"
    - Drop Host submits report with notes
12. **If all items accounted for:**
    - Drop Host taps "Confirm Arrival"
    - System transitions Drop status to "Arrived at Campus"
    - System triggers balance payment notifications to students with 50% paid orders
    - System transitions fully paid orders (100%) to "Ready for Pickup"

**Edge Cases & Error States:**

- **QR code unreadable:** Drop Host can manually enter box/item ID
- **QR does not match expected drop:** Display error: "This box does not belong to the selected drop"
- **Duplicate scan:** System detects already-scanned QR; display warning: "This box has already been scanned"
- **Major discrepancy (>10% missing):** System alerts Global Admin automatically; Drop Host cannot confirm arrival until Admin reviews
- **Damaged items:** Drop Host marks items as damaged; inventory auto-adjusts; affected student orders marked "Pending Resolution"

**Inputs:**
- Scanned QR code data (boxId, dropId, itemVariantIds[])
- Manual item ID entry (fallback)
- Missing/damaged item report (notes, quantities)

**Outputs:**
- Updated Shipment record (receivedBoxes[], receivedItemCounts{}, discrepancies[], status)
- Drop status transition to "Arrived at Campus" (if confirmed)
- Notifications sent to students
- Alert sent to Global Admin (if major discrepancy)

**Validation Rules:**
- QR data must match expected drop and campus
- Box ID must be unique per scan session
- Received item counts cannot exceed expected counts (unless Admin override)

---

### 4.8 Pickup QR/OTP Verification & Dispatch

**Purpose:** Enable Drop Hosts to verify student identity and payment before dispatching items.

**Preconditions:**
- Order status is "Ready for Pickup"
- Order paymentStatus is "Paid 100%"
- Student has pickup QR code or OTP

**Happy Path:**

1. Student arrives at Drop Host location with pickup QR or OTP
2. Drop Host navigates to "Dispatch Orders" dashboard
3. Drop Host taps "Scan QR Code" or "Enter OTP"
4. **If QR Code:**
   - Drop Host scans student's QR code using device camera
   - System decodes QR: orderId, userId, verificationToken
   - System validates token and checks order status
5. **If OTP:**
   - Drop Host enters 6-digit OTP provided by student
   - System looks up order by OTP and validates
6. **If valid:**
   - System displays order details: student name, items, quantities, payment status
   - Drop Host verifies student identity (visual check, optional)
   - Drop Host confirms item handover
   - Drop Host taps "Mark as Picked Up"
   - System updates Order status to "Picked Up"
   - System records pickup timestamp and Drop Host ID
   - System decrements campus inventory (if campus store item)
   - System sends confirmation to student: "Order picked up successfully!"
7. **If order contains multiple items (partial pickup support):**
   - System displays each item separately
   - Drop Host can mark individual items as picked up
   - Order status updates to "Partially Picked Up" until all items dispatched
   - Each item has independent status: "Ready for Pickup" → "Picked Up"

**Edge Cases & Error States:**

- **QR/OTP invalid:** Display error: "Invalid pickup code. Please verify with student."
- **Order not fully paid:** Display error: "Payment incomplete. Remaining balance: ₹X. Cannot dispatch."
- **Order already picked up:** Display error: "This order has already been collected on [date]."
- **Student arrives at wrong campus/Drop Host:** System checks order's assigned Drop Host; if mismatch, display error: "This order must be collected at [Correct Location]."
- **QR code expired (after 7 days):** Student can request new QR from "My Orders"; new verification token generated
- **Drop Host accidentally marks wrong order:** System has "Undo" button available for 5 minutes after pickup; after that, Admin intervention required

**Inputs:**
- Scanned QR code data (orderId, userId, verificationToken)
- OR 6-digit OTP
- Individual itemIds for partial pickup

**Outputs:**
- Updated Order status ("Picked Up" or "Partially Picked Up")
- Updated individual item statuses
- Pickup event record (timestamp, dropHostId, orderId, itemIds[])
- Inventory decremented (if applicable)
- Confirmation notification sent to student

**Validation Rules:**
- Verification token must be valid and not expired
- OTP must match active pickup OTP for order
- Order paymentStatus must be "Paid 100%"
- Order must be assigned to current Drop Host's campus

---

### 4.9 Drop Configuration by Campus Curator

**Purpose:** Enable Campus Curators to create and manage drops for their assigned campus.

**Preconditions:**
- User has Campus Curator role assigned to specific campus(es)
- User is authenticated

**Happy Path:**

1. Curator navigates to "Manage Drops" dashboard
2. Curator taps "Create New Drop"
3. System displays drop creation form with sections:

**Section 1: Basic Information**
- Drop Title (required, max 100 chars)
- Description (required, max 500 chars, supports basic markdown)
- Category (select from predefined list: Apparel, Accessories, Stationery, Electronics, etc.)
- Product Images (upload 1-5 images, max 2MB each, JPG/PNG)

**Section 2: Variants Configuration**
- **Color Variants:**
  - Add color options (e.g., Black, Navy, White)
  - For each color: name, hex code, additional image (optional)
- **Size Variants:**
  - Add size options (e.g., S, M, L, XL, XXL)
  - Or custom size chart (e.g., shoe sizes: 6, 7, 8, 9, 10)
- System generates all combinations (e.g., Black-S, Black-M, Navy-S, Navy-M...)

**Section 3: Pricing**
- Base Price per item (₹, required)
- Optional: Per-variant price override

**Section 4: MOQ Configuration**
- **Category-level MOQ:** Minimum total items across all variants (e.g., 200)
- **Per-Color Variant MOQ:** Minimum items per color (e.g., Black: 50, Navy: 50)
- Toggle: "Apply per-color MOQ" (default: OFF; if OFF, only category MOQ applies)

**Section 5: Timeline**
- Pledge Window Start Date & Time
- Pledge Window End Date & Time (min: 3 days from start, max: 30 days)
- Payment Window Duration (days, default: 7, min: 2, max: 30)
- Expected Production Time (days, informational only, shown to students)
- Expected Delivery Date (estimated, shown to students)

**Section 6: Logistics**
- Assign Drop Host (select from approved Drop Hosts for this campus)
- Pickup Location (text field, e.g., "Student Center, Room 101")

4. Curator fills all required fields
5. Curator taps "Save as Draft" (drop not visible to students)
6. Curator reviews draft
7. Curator taps "Publish Drop"
8. System validates all fields
9. **If valid:**
   - System creates Drop record with status "Live"
   - Drop becomes visible to students on campus home page
   - System sends notification to campus students: "New drop available: [Drop Title]!"
10. **If invalid:**
    - System displays validation errors (e.g., "MOQ must be greater than 0")
    - Curator corrects and resubmits

**Edge Cases & Error States:**

- **Pledge window dates in past:** Display error: "Pledge start date must be in the future"
- **Payment window too short:** Display warning: "Payment window <2 days may reduce conversion"
- **No Drop Host assigned:** Drop can be created but cannot transition to "Arrived" state without assigned Host
- **Curator tries to edit live drop:** Only certain fields editable (e.g., extend pledge window, update images); MOQ and variants locked once pledges exist
- **Curator deletes drop with existing pledges:** System prevents deletion; Curator must "Cancel Drop" which sends notifications to all pledged users

**Inputs:**
- Drop configuration object (title, description, category, images[], colors[], sizes[], basePrice, categoryMOQ, variantMOQs{}, pledgeWindow{start, end}, paymentWindowDuration, dropHostId, pickupLocation)

**Outputs:**
- Drop record created (status: "Draft" or "Live")
- Drop variants generated (all color-size combinations)
- Notification sent to campus students (if published)

**Validation Rules:**
- Title: required, 5-100 chars
- Description: required, 20-500 chars
- Category: must be from predefined list
- Images: 1-5 images, each <2MB, JPG/PNG format
- Colors: min 1, max 10
- Sizes: min 1, max 20
- Base Price: must be > 0
- Category MOQ: must be > 0
- Variant MOQ (if enabled): must be > 0, sum of variant MOQs should be ≤ category MOQ
- Pledge window: start must be future, end must be ≥ 3 days after start
- Payment window duration: 2-30 days

---

### 4.10 Campus Store Configuration

**Purpose:** Enable Campus Curators to configure time-bound campus store for direct inventory sales.

**Preconditions:**
- User has Campus Curator role for campus
- Campus has inventory loaded (via master sheet or previous drops)

**Happy Path:**

1. Curator navigates to "Campus Store Settings"
2. Curator sees two configuration options:

**Option A: Recurring Store Hours**
- Toggle: "Enable Recurring Store Hours"
- Select days of week (Mon-Sun checkboxes)
- Set opening time (e.g., 10:00 AM)
- Set closing time (e.g., 5:00 PM)
- Set timezone (auto-detected from campus location)

**Option B: One-Time Store Window**
- Toggle: "Create One-Time Store Window"
- Set start date & time
- Set end date & time

3. Curator configures store hours
4. Curator assigns inventory to store:
   - View list of available inventory items (from master sheet or completed drops with excess stock)
   - Select items to make available in store
   - System auto-displays current stock levels (managed by master sheet reconciliation)
5. Curator saves configuration
6. During store operating hours:
   - Students see "Campus Store" tab on campus home page
   - Students can browse and purchase available inventory
   - No MOQ required; immediate purchase flow
   - Payment: 100% upfront via Razorpay
   - Pickup: Same flow as drops (QR/OTP generation after payment)
7. System auto-adjusts inventory:
   - Decrements stock on purchase
   - Decrements stock on pickup (double-check mechanism)
   - Drop Host reconciliation updates propagate to store inventory

**Edge Cases & Error States:**

- **Store hours overlap with campus closed hours:** Display warning (Curator can override)
- **Inventory depleted during store hours:** Item shows "Out of Stock"; auto-hidden from store
- **Student adds item to cart but stock runs out before checkout:** Display error: "This item is no longer available"
- **Store window expires while student in checkout:** Allow checkout completion if payment initiated; otherwise, cart cleared
- **Curator tries to add inventory not in master sheet:** Display error: "Inventory must be synced from master sheet or completed drops"

**Inputs:**
- Store configuration object (recurringHours{days[], openTime, closeTime, timezone}, oneTimeWindows[{start, end}], assignedInventoryIds[])

**Outputs:**
- Campus store settings updated
- Store visible/hidden to students based on operating hours
- Inventory items linked to store

**Validation Rules:**
- At least one operating window must be configured
- Opening time must be before closing time
- One-time window start must be in future
- Assigned inventory items must have stock > 0

---

### 4.11 Global Admin: Campus & Drop Overview

**Purpose:** Provide Global Admins with platform-wide visibility into all campuses and drops.

**Preconditions:**
- User has Global Admin role

**Happy Path:**

1. Admin navigates to "Global Dashboard"
2. System displays aggregate metrics:
   - Total active campuses
   - Total live drops
   - Total GMV (all time, last 30 days, last 7 days)
   - Total orders (by status: Pledged, Paid, In Production, Arrived, Picked Up)
   - Pending issues count (refunds, reconciliation discrepancies, failed drops)
3. Admin views campus list (sortable by GMV, active drops count, student count)
4. Admin taps a campus to drill down:
   - Campus details (name, location, Curator(s), Drop Host(s))
   - Campus-specific drops (active, completed, failed)
   - Campus-specific metrics
5. Admin views drop list (filterable by campus, status, date range)
6. Admin taps a drop to view:
   - Drop configuration
   - Pledge counts vs. MOQ
   - Payment conversion rate
   - Shipment status
   - Pickup completion rate
   - Issues/exceptions

**Outputs:**
- Dashboard data displayed

---

### 4.12 Global Admin: MOQ Override Tool

**Purpose:** Allow Global Admins to manually approve drops that narrowly missed MOQ thresholds.

**Preconditions:**
- Drop is in "Live" state with pledge window expired
- Category MOQ or variant MOQ not met
- Admin has reviewed drop performance

**Happy Path:**

1. Admin navigates to "Pending Drops" (drops awaiting MOQ validation)
2. Admin sees list of drops that did not meet MOQ
3. For each drop, Admin sees:
   - Category MOQ: Required 200, Pledged 185 (92.5%)
   - Variant MOQs: Black (Met), Navy (45/50, 90%)
4. Admin taps "Review Override"
5. System displays override form:
   - Reason for override (required, text field)
   - Override type: "Approve All Variants" or "Approve Specific Variants"
6. Admin enters reason (e.g., "Close to threshold; strong demand signal")
7. Admin selects override type
8. Admin taps "Approve Drop"
9. System transitions drop to "MOQ Met" state (as if MOQ was organically met)
10. System opens payment window
11. System sends notifications to all pledged users
12. System logs override (adminId, reason, timestamp) for audit

**Edge Cases & Error States:**

- **Admin tries to override drop with <70% MOQ:** System displays warning: "MOQ achievement is very low. Are you sure?" (can proceed)
- **Override without reason:** Display error: "Reason is required for audit trail"
- **Drop already failed/canceled:** Cannot override; must create new drop

**Inputs:**
- dropId
- Override reason (text, max 500 chars)
- Override type ("all_variants" | "specific_variants")
- Selected variantIds[] (if specific_variants)

**Outputs:**
- Drop status updated to "MOQ Met"
- Payment window opened
- Override log created
- Notifications sent to users

**Validation Rules:**
- Reason required
- Drop must be in "Live" or "Pledge Window Closed" state

---

### 4.13 Global Admin: Manual Inventory Override

**Purpose:** Allow Global Admins to manually adjust inventory counts for damages/missing items.

**Preconditions:**
- Drop Host has reported discrepancy during shipment reconciliation
- Admin has verified physical inventory issue

**Happy Path:**

1. Admin receives alert: "Shipment discrepancy reported for Drop #123"
2. Admin navigates to "Inventory Issues" dashboard
3. Admin views discrepancy details:
   - Drop: "IIT Madras Hoodies - Winter 2026"
   - Expected: 200 items
   - Received: 196 items
   - Missing: 4 items (Black-M: 2, Navy-L: 2)
4. Admin contacts vendor/manufacturer to verify
5. Admin decides on resolution:
   - **Option A:** Adjust inventory down (accept shortfall)
   - **Option B:** Wait for replacement shipment
6. **If Option A:**
   - Admin taps "Adjust Inventory"
   - System displays affected orders (4 students with missing items)
   - Admin selects resolution for each affected order:
     - Refund (full or partial)
     - Offer alternative variant (if available)
     - Wait for restock
   - Admin confirms adjustments
   - System updates inventory counts
   - System sends notifications to affected students
   - System processes refunds (if selected)
7. **If Option B:**
   - Admin taps "Mark as Pending Restock"
   - System holds affected orders in "Pending" state
   - Admin manually updates when replacement arrives

**Edge Cases & Error States:**

- **Admin adjusts inventory for drop not yet arrived:** Display error: "Inventory can only be adjusted after shipment arrival confirmation"
- **Adjustment creates negative inventory:** Display error: "Adjustment would result in negative stock"
- **Affected student already picked up item (data error):** System flags anomaly; Admin must manually investigate

**Inputs:**
- dropId
- Inventory adjustment object (variantId, quantityChange, reason, affectedOrderIds[], resolution{type, details})

**Outputs:**
- Inventory counts updated
- Affected orders updated (refunded, variant switched, or held)
- Notifications sent to affected students
- Adjustment log created

**Validation Rules:**
- Reason required (max 500 chars)
- Quantity change must not result in negative inventory
- Resolution type must be valid: "refund" | "switch_variant" | "restock_pending"

---

## 5. Data Model and API Contracts

### 5.1 Core Entities

#### 5.1.1 User

```json
{
  "userId": "uuid",
  "phone": "+91XXXXXXXXXX",
  "email": "student@example.com",
  "name": "Rahul Sharma",
  "profilePicture": "https://cdn.ccoop.in/avatars/user123.jpg",
  "authProvider": "phone_otp | email_otp | google_oauth",
  "homeCampusId": "uuid",
  "roles": [
    {
      "role": "student | drop_host | campus_curator | global_admin",
      "campusId": "uuid | null",
      "assignedAt": "2026-01-15T10:30:00Z",
      "assignedBy": "uuid"
    }
  ],
  "location": {
    "latitude": 13.0827,
    "longitude": 80.2707
  },
  "createdAt": "2026-01-10T08:00:00Z",
  "lastLoginAt": "2026-03-12T14:22:00Z"
}
```

**Unique Constraints:**
- `phone` (if provided)
- `email` (if provided)

**Relationships:**
- User → Campus (homeCampusId, many-to-one)
- User → RoleAssignment (one-to-many)

---

#### 5.1.2 Campus

```json
{
  "campusId": "uuid",
  "name": "IIT Madras",
  "slug": "iit-madras",
  "logo": "https://cdn.ccoop.in/campuses/iitm-logo.png",
  "location": {
    "address": "Adyar, Chennai, Tamil Nadu 600036",
    "latitude": 13.0827,
    "longitude": 80.2707
  },
  "isActive": true,
  "storeSettings": {
    "storeEnabled": true,
    "recurringHours": {
      "enabled": true,
      "days": ["monday", "tuesday", "wednesday", "thursday", "friday"],
      "openTime": "10:00",
      "closeTime": "17:00",
      "timezone": "Asia/Kolkata"
    },
    "oneTimeWindows": [
      {
        "windowId": "uuid",
        "start": "2026-03-15T10:00:00Z",
        "end": "2026-03-20T17:00:00Z"
      }
    ]
  },
  "createdAt": "2025-12-01T00:00:00Z",
  "updatedAt": "2026-03-01T12:00:00Z"
}
```

**Unique Constraints:**
- `slug`

**Derived Fields:**
- `isStoreCurrentlyOpen` (computed based on current time vs. storeSettings)

---

#### 5.1.3 Drop

```json
{
  "dropId": "uuid",
  "campusId": "uuid",
  "title": "IIT Madras Winter Hoodies 2026",
  "slug": "iitm-winter-hoodies-2026",
  "description": "Premium quality hoodies with IIT Madras branding...",
  "category": "apparel",
  "images": [
    {
      "imageId": "uuid",
      "url": "https://cdn.ccoop.in/drops/drop123-1.jpg",
      "alt": "Black hoodie front view",
      "order": 1
    }
  ],
  "basePrice": 1200.00,
  "status": "draft | live | moq_met | payment_window_open | production | shipped | arrived | closed | failed",
  "moqConfig": {
    "categoryMOQ": 200,
    "perVariantMOQEnabled": true,
    "variantMOQs": {
      "color-black": 50,
      "color-navy": 50,
      "color-grey": 50
    }
  },
  "timeline": {
    "pledgeWindowStart": "2026-03-15T00:00:00Z",
    "pledgeWindowEnd": "2026-03-22T23:59:59Z",
    "paymentWindowDuration": 7,
    "paymentWindowEnd": "2026-03-29T23:59:59Z",
    "expectedProductionDays": 21,
    "expectedDeliveryDate": "2026-04-25T00:00:00Z"
  },
  "dropHostId": "uuid",
  "pickupLocation": "Student Activity Center, Room 101",
  "createdBy": "uuid",
  "createdAt": "2026-03-10T10:00:00Z",
  "updatedAt": "2026-03-12T15:30:00Z",
  "publishedAt": "2026-03-12T16:00:00Z",
  "moqMetAt": "2026-03-22T18:45:00Z",
  "closedAt": null
}
```

**Unique Constraints:**
- `slug` (per campus)

**Relationships:**
- Drop → Campus (campusId, many-to-one)
- Drop → User (createdBy, dropHostId, many-to-one)
- Drop → DropVariant (one-to-many)
- Drop → Pledge (one-to-many)

**State Machine:**
```
draft → live → moq_met → payment_window_open → production → shipped → arrived → closed
                ↓
              failed
```

---

#### 5.1.4 DropVariant

```json
{
  "variantId": "uuid",
  "dropId": "uuid",
  "color": "Black",
  "colorHex": "#000000",
  "size": "M",
  "sku": "IITM-WH26-BLK-M",
  "priceOverride": null,
  "variantImage": "https://cdn.ccoop.in/drops/drop123-black.jpg",
  "moqStatus": "pending | met | failed",
  "pledgeCount": 45,
  "paidCount": 40,
  "isActive": true,
  "createdAt": "2026-03-10T10:05:00Z"
}
```

**Unique Constraints:**
- `sku`
- `dropId + color + size` (composite)

**Relationships:**
- DropVariant → Drop (dropId, many-to-one)

**Derived Fields:**
- `currentPrice` (priceOverride ?? drop.basePrice)
- `moqProgress` (pledgeCount / variantMOQ * 100)

---

#### 5.1.5 Pledge

```json
{
  "pledgeId": "uuid",
  "userId": "uuid",
  "dropId": "uuid",
  "variantId": "uuid",
  "quantity": 2,
  "status": "pledged | payment_pending | payment_overdue | converted_to_order | canceled | switched_variant",
  "switchedToVariantId": "uuid | null",
  "switchReason": "original_variant_failed_moq",
  "createdAt": "2026-03-16T14:20:00Z",
  "updatedAt": "2026-03-22T19:00:00Z"
}
```

**Relationships:**
- Pledge → User (userId, many-to-one)
- Pledge → Drop (dropId, many-to-one)
- Pledge → DropVariant (variantId, many-to-one)

---

#### 5.1.6 Order

```json
{
  "orderId": "uuid",
  "userId": "uuid",
  "campusId": "uuid",
  "dropId": "uuid | null",
  "orderType": "drop | campus_store",
  "items": [
    {
      "itemId": "uuid",
      "variantId": "uuid",
      "quantity": 1,
      "unitPrice": 1200.00,
      "itemStatus": "payment_pending | paid_50 | paid_100 | in_production | shipped | arrived | ready_for_pickup | picked_up"
    }
  ],
  "totalAmount": 2400.00,
  "paidAmount": 1200.00,
  "balanceDue": 1200.00,
  "paymentStatus": "unpaid | paid_50 | paid_100 | refunded | partially_refunded",
  "status": "payment_pending | paid | in_production | shipped | arrived | ready_for_pickup | picked_up | partially_picked_up | canceled",
  "pickupQRCode": "https://cdn.ccoop.in/qr/order-xyz.png",
  "pickupOTP": "123456",
  "pickupOTPExpiry": "2026-04-30T23:59:59Z",
  "dropHostId": "uuid",
  "pickupLocation": "Student Activity Center, Room 101",
  "createdAt": "2026-03-22T19:30:00Z",
  "paidAt": "2026-03-23T10:15:00Z",
  "arrivedAt": "2026-04-20T09:00:00Z",
  "pickedUpAt": null
}
```

**Unique Constraints:**
- `pickupOTP` (valid only during active period)

**Relationships:**
- Order → User (userId, many-to-one)
- Order → Campus (campusId, many-to-one)
- Order → Drop (dropId, many-to-one, nullable)
- Order → Payment (one-to-many)
- Order → PickupEvent (one-to-many)

**Derived Fields:**
- `balanceDue` (totalAmount - paidAmount)
- `isFullyPaid` (paidAmount >= totalAmount)
- `allItemsPickedUp` (all items.itemStatus === "picked_up")

---

#### 5.1.7 Payment

```json
{
  "paymentId": "uuid",
  "orderId": "uuid",
  "userId": "uuid",
  "amount": 1200.00,
  "paymentType": "advance_50 | balance_50 | full_100 | refund",
  "paymentMethod": "upi | card | netbanking | wallet",
  "razorpayOrderId": "order_xyz123",
  "razorpayPaymentId": "pay_abc456",
  "razorpaySignature": "signature_hash",
  "status": "pending | success | failed | refunded",
  "failureReason": "insufficient_funds",
  "createdAt": "2026-03-23T10:10:00Z",
  "completedAt": "2026-03-23T10:15:00Z"
}
```

**Unique Constraints:**
- `razorpayPaymentId`

**Relationships:**
- Payment → Order (orderId, many-to-one)
- Payment → User (userId, many-to-one)

---

#### 5.1.8 Shipment

```json
{
  "shipmentId": "uuid",
  "dropId": "uuid",
  "campusId": "uuid",
  "expectedItems": [
    {
      "variantId": "uuid",
      "quantity": 50
    }
  ],
  "receivedItems": [
    {
      "variantId": "uuid",
      "quantity": 48
    }
  ],
  "boxes": [
    {
      "boxId": "BOX-001",
      "boxQRCode": "https://cdn.ccoop.in/qr/box-001.png",
      "expectedItemCount": 25,
      "scannedAt": "2026-04-20T08:45:00Z",
      "scannedBy": "uuid",
      "status": "received"
    }
  ],
  "discrepancies": [
    {
      "variantId": "uuid",
      "expected": 50,
      "received": 48,
      "missing": 2,
      "damaged": 0,
      "notes": "Two items missing from Box-003"
    }
  ],
  "status": "pending | in_transit | arrived | reconciled",
  "shippedAt": "2026-04-15T00:00:00Z",
  "arrivedAt": "2026-04-20T09:00:00Z",
  "reconciledAt": "2026-04-20T10:30:00Z",
  "reconciledBy": "uuid"
}
```

**Relationships:**
- Shipment → Drop (dropId, many-to-one)
- Shipment → Campus (campusId, many-to-one)

---

#### 5.1.9 PickupEvent

```json
{
  "pickupEventId": "uuid",
  "orderId": "uuid",
  "itemId": "uuid",
  "userId": "uuid",
  "dropHostId": "uuid",
  "verificationType": "qr_code | otp",
  "verificationValue": "encoded_qr_data | 123456",
  "pickedUpAt": "2026-04-25T11:30:00Z",
  "notes": "Partial pickup - 1 of 2 items"
}
```

**Relationships:**
- PickupEvent → Order (orderId, many-to-one)
- PickupEvent → User (userId, dropHostId, many-to-one)

---

#### 5.1.10 Inventory

```json
{
  "inventoryId": "uuid",
  "campusId": "uuid",
  "productName": "IIT Madras Classic T-Shirt",
  "sku": "IITM-TS-WHT-M",
  "variantDetails": {
    "color": "White",
    "size": "M"
  },
  "quantityAvailable": 50,
  "quantityReserved": 5,
  "quantityTotal": 55,
  "unitPrice": 600.00,
  "source": "drop_excess | master_sheet | manual_entry",
  "sourceDropId": "uuid | null",
  "isActiveInStore": true,
  "lastReconciledAt": "2026-03-12T08:00:00Z",
  "updatedAt": "2026-03-12T14:30:00Z"
}
```

**Unique Constraints:**
- `campusId + sku`

**Relationships:**
- Inventory → Campus (campusId, many-to-one)

**Derived Fields:**
- `quantityAvailable` (quantityTotal - quantityReserved - quantitySold)

---

### 5.2 API Contracts

#### 5.2.1 Authentication APIs

**POST /api/auth/send-otp**

Request:
```json
{
  "method": "phone | email",
  "value": "+919876543210 | user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "expiresIn": 300,
  "retryAfter": 60
}
```

---

**POST /api/auth/verify-otp**

Request:
```json
{
  "method": "phone | email",
  "value": "+919876543210",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "userId": "uuid",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "+919876543210",
    "homeCampusId": null,
    "roles": []
  },
  "isNewUser": true
}
```

---

**POST /api/auth/google**

Request:
```json
{
  "idToken": "google_oauth_id_token"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": { /* same as verify-otp */ },
  "isNewUser": false
}
```

---

#### 5.2.2 Campus APIs

**GET /api/campuses**

Query Params:
- `search` (optional): Filter by name
- `nearLat` (optional): Latitude for proximity sort
- `nearLon` (optional): Longitude for proximity sort

Response:
```json
{
  "campuses": [
    {
      "campusId": "uuid",
      "name": "IIT Madras",
      "slug": "iit-madras",
      "logo": "https://...",
      "location": {
        "address": "...",
        "latitude": 13.0827,
        "longitude": 80.2707
      },
      "distance": 2.5
    }
  ]
}
```

---

**POST /api/users/me/home-campus**

Request:
```json
{
  "campusId": "uuid"
}
```

Response:
```json
{
  "success": true,
  "user": { /* updated user object */ }
}
```

---

#### 5.2.3 Drop APIs

**GET /api/campuses/:campusId/drops**

Query Params:
- `status` (optional): Filter by drop status
- `category` (optional): Filter by category

Response:
```json
{
  "drops": [
    {
      "dropId": "uuid",
      "title": "IIT Madras Winter Hoodies 2026",
      "slug": "iitm-winter-hoodies-2026",
      "description": "...",
      "images": [...],
      "basePrice": 1200.00,
      "status": "live",
      "moqProgress": {
        "category": {
          "required": 200,
          "current": 145,
          "percentage": 72.5
        },
        "variants": {
          "color-black": { "required": 50, "current": 45, "percentage": 90 }
        }
      },
      "timeline": {...},
      "variantsCount": 15
    }
  ]
}
```

---

**GET /api/drops/:dropId**

Response:
```json
{
  "drop": {
    "dropId": "uuid",
    "campusId": "uuid",
    "title": "...",
    "description": "...",
    "category": "apparel",
    "images": [...],
    "basePrice": 1200.00,
    "status": "live",
    "moqConfig": {...},
    "moqProgress": {...},
    "timeline": {...},
    "dropHostId": "uuid",
    "pickupLocation": "..."
  },
  "variants": [
    {
      "variantId": "uuid",
      "color": "Black",
      "colorHex": "#000000",
      "size": "M",
      "sku": "...",
      "currentPrice": 1200.00,
      "moqStatus": "pending",
      "pledgeCount": 45,
      "isActive": true
    }
  ]
}
```

---

**POST /api/drops** (Campus Curator only)

Request:
```json
{
  "campusId": "uuid",
  "title": "IIT Madras Winter Hoodies 2026",
  "description": "...",
  "category": "apparel",
  "images": ["base64_or_url", ...],
  "basePrice": 1200.00,
  "colors": [
    { "name": "Black", "hex": "#000000", "image": "..." }
  ],
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "moqConfig": {
    "categoryMOQ": 200,
    "perVariantMOQEnabled": true,
    "variantMOQs": {
      "color-black": 50
    }
  },
  "timeline": {
    "pledgeWindowStart": "2026-03-15T00:00:00Z",
    "pledgeWindowEnd": "2026-03-22T23:59:59Z",
    "paymentWindowDuration": 7,
    "expectedProductionDays": 21,
    "expectedDeliveryDate": "2026-04-25T00:00:00Z"
  },
  "dropHostId": "uuid",
  "pickupLocation": "Student Activity Center, Room 101",
  "publishImmediately": false
}
```

Response:
```json
{
  "success": true,
  "drop": { /* full drop object */ }
}
```

---

**PUT /api/drops/:dropId/publish** (Campus Curator only)

Response:
```json
{
  "success": true,
  "drop": { /* updated drop with status: "live" */ }
}
```

---

#### 5.2.4 Pledge APIs

**POST /api/pledges**

Request:
```json
{
  "dropId": "uuid",
  "items": [
    {
      "variantId": "uuid",
      "quantity": 2
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "pledges": [
    {
      "pledgeId": "uuid",
      "userId": "uuid",
      "dropId": "uuid",
      "variantId": "uuid",
      "quantity": 2,
      "status": "pledged",
      "createdAt": "2026-03-16T14:20:00Z"
    }
  ]
}
```

---

**POST /api/pledges/:pledgeId/switch-variant**

Request:
```json
{
  "newVariantId": "uuid"
}
```

Response:
```json
{
  "success": true,
  "pledge": { /* updated pledge */ }
}
```

---

**DELETE /api/pledges/:pledgeId**

Response:
```json
{
  "success": true,
  "message": "Pledge canceled successfully"
}
```

---

#### 5.2.5 Order & Payment APIs

**POST /api/orders**

Request:
```json
{
  "pledgeIds": ["uuid", "uuid"],
  "paymentType": "advance_50 | full_100"
}
```

Response:
```json
{
  "success": true,
  "order": {
    "orderId": "uuid",
    "totalAmount": 2400.00,
    "paymentDue": 1200.00
  },
  "razorpayOrder": {
    "orderId": "order_xyz",
    "amount": 120000,
    "currency": "INR",
    "key": "rzp_live_xxx"
  }
}
```

---

**POST /api/payments/verify**

Request:
```json
{
  "orderId": "uuid",
  "razorpayOrderId": "order_xyz",
  "razorpayPaymentId": "pay_abc",
  "razorpaySignature": "signature_hash"
}
```

Response:
```json
{
  "success": true,
  "order": { /* updated order with payment status */ }
}
```

---

**POST /api/orders/:orderId/pay-balance**

Request:
```json
{
  "amount": 1200.00
}
```

Response:
```json
{
  "success": true,
  "razorpayOrder": { /* razorpay order for balance payment */ }
}
```

---

**GET /api/users/me/orders**

Query Params:
- `status` (optional)
- `campusId` (optional)

Response:
```json
{
  "orders": [
    {
      "orderId": "uuid",
      "dropId": "uuid",
      "dropTitle": "IIT Madras Winter Hoodies 2026",
      "campusName": "IIT Madras",
      "items": [...],
      "totalAmount": 2400.00,
      "paidAmount": 1200.00,
      "balanceDue": 1200.00,
      "paymentStatus": "paid_50",
      "status": "in_production",
      "pickupQRCode": null,
      "pickupOTP": null,
      "dropHostName": "Arun Kumar",
      "pickupLocation": "Student Activity Center, Room 101",
      "createdAt": "2026-03-22T19:30:00Z"
    }
  ]
}
```

---

#### 5.2.6 Drop Host APIs

**GET /api/drop-hosts/me/shipments**

Response:
```json
{
  "shipments": [
    {
      "shipmentId": "uuid",
      "dropId": "uuid",
      "dropTitle": "...",
      "expectedItems": [...],
      "status": "in_transit",
      "shippedAt": "2026-04-15T00:00:00Z"
    }
  ]
}
```

---

**POST /api/shipments/:shipmentId/scan-box**

Request:
```json
{
  "boxQRData": "encoded_data",
  "scannedItems": [
    {
      "variantId": "uuid",
      "quantity": 25
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "box": {
    "boxId": "BOX-001",
    "status": "received",
    "scannedAt": "2026-04-20T08:45:00Z"
  }
}
```

---

**POST /api/shipments/:shipmentId/confirm-arrival**

Request:
```json
{
  "discrepancies": [
    {
      "variantId": "uuid",
      "expected": 50,
      "received": 48,
      "notes": "Two items missing from Box-003"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "shipment": { /* updated shipment with status: "arrived" */ },
  "affectedOrders": 2
}
```

---

**POST /api/pickups/verify**

Request:
```json
{
  "verificationType": "qr_code | otp",
  "verificationValue": "qr_data | 123456"
}
```

Response:
```json
{
  "success": true,
  "order": {
    "orderId": "uuid",
    "userId": "uuid",
    "userName": "Rahul Sharma",
    "items": [
      {
        "itemId": "uuid",
        "productName": "IIT Madras Winter Hoodie - Black M",
        "quantity": 1,
        "itemStatus": "ready_for_pickup"
      }
    ],
    "paymentStatus": "paid_100",
    "isFullyPaid": true
  }
}
```

---

**POST /api/pickups/confirm**

Request:
```json
{
  "orderId": "uuid",
  "itemIds": ["uuid"]
}
```

Response:
```json
{
  "success": true,
  "pickupEvent": {
    "pickupEventId": "uuid",
    "pickedUpAt": "2026-04-25T11:30:00Z"
  },
  "order": { /* updated order status */ }
}
```

---

#### 5.2.7 Global Admin APIs

**GET /api/admin/dashboard**

Response:
```json
{
  "metrics": {
    "totalCampuses": 12,
    "activeCampuses": 10,
    "totalDrops": 45,
    "liveDrops": 8,
    "gmv": {
      "allTime": 12500000.00,
      "last30Days": 450000.00,
      "last7Days": 125000.00
    },
    "ordersByStatus": {
      "pledged": 450,
      "paid": 380,
      "in_production": 200,
      "arrived": 150,
      "picked_up": 1200
    },
    "pendingIssues": {
      "refunds": 3,
      "reconciliationDiscrepancies": 2,
      "failedDrops": 1
    }
  }
}
```

---

**POST /api/admin/drops/:dropId/override-moq**

Request:
```json
{
  "reason": "Close to threshold; strong demand signal",
  "overrideType": "all_variants | specific_variants",
  "variantIds": ["uuid"]
}
```

Response:
```json
{
  "success": true,
  "drop": { /* updated drop with status: "moq_met" */ },
  "overrideLog": {
    "adminId": "uuid",
    "reason": "...",
    "timestamp": "2026-03-22T20:00:00Z"
  }
}
```

---

**POST /api/admin/inventory/adjust**

Request:
```json
{
  "dropId": "uuid",
  "adjustments": [
    {
      "variantId": "uuid",
      "quantityChange": -2,
      "reason": "Damaged items in Box-003"
    }
  ],
  "affectedOrders": [
    {
      "orderId": "uuid",
      "resolution": "refund | switch_variant | restock_pending",
      "details": {...}
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "inventory": { /* updated inventory */ },
  "affectedOrders": [ /* updated orders */ ]
}
```

---

### 5.3 Back-Office Operations

#### 5.3.1 MOQ Validation Job

**Trigger:** Scheduled cron job (every 5 minutes)

**Logic:**
1. Query all drops with status "live"
2. For each drop, calculate current pledge counts
3. Compare against MOQ thresholds (category & variant)
4. If MOQ met:
   - Transition drop to "moq_met"
   - Identify winning/failed variants
   - Send notifications to users
   - Open payment window
5. Log execution results

---

#### 5.3.2 Payment Window Expiry Job

**Trigger:** Scheduled cron job (every hour)

**Logic:**
1. Query all drops with status "payment_window_open"
2. Check if current time > paymentWindowEnd
3. If expired:
   - Cancel unpaid pledges
   - Transition drop to "production"
   - Send production notification to Curator/Admin
5. Log execution results

---

#### 5.3.3 Notification Dispatch Service

**Trigger:** Event-driven (on state transitions)

**Supported Events:**
- Drop published
- MOQ met
- Payment window opened
- Variant failed MOQ
- Order payment successful
- Order arrived at campus
- Balance payment due
- Pickup ready
- Order picked up

**Channels:**
- Push notifications (Firebase Cloud Messaging)
- Email (SendGrid/AWS SES)
- SMS (for critical events like OTP, payment confirmations)

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Metric | Target | Measurement Context |
|--------|--------|---------------------|
| Page Load Time | < 2 seconds | Campus home, drop details pages (3G network) |
| API Response Time | < 500ms (p95) | All read APIs; < 1s for write APIs |
| Pledge Confirmation | < 3 seconds | End-to-end: user taps "Confirm Pledge" → confirmation screen |
| Payment Processing | < 10 seconds | Razorpay redirect → payment confirmation → redirect back |
| QR Code Scan | < 1 second | Scan → verification → result display |
| Concurrent Users | 500 per campus | Peak load during drop launch (MVP: 1-3 campuses = 1500 users) |
| Database Queries | < 100ms (p95) | All indexed queries |

**Optimization Strategies:**
- CDN for static assets (images, CSS, JS)
- Database indexing on frequently queried fields (campusId, dropId, userId, status)
- Caching for campus lists, active drops (Redis, 5-minute TTL)
- Lazy loading for images
- Optimistic UI updates for pledges

---

### 6.2 Security & Privacy

#### 6.2.1 Authentication & Authorization

- **JWT Tokens:**
  - Expiry: 7 days
  - Refresh token mechanism (30-day expiry)
  - Secure HTTP-only cookies for web
  - Token includes: userId, roles[], campusId, issuedAt, expiresAt

- **Role-Based Access Control (RBAC):**
  - Student: Can browse all campuses, pledge/order only for accessible drops
  - Drop Host: Can access shipment/pickup tools only for assigned campus(es)
  - Campus Curator: Can create/manage drops only for assigned campus(es)
  - Global Admin: Full platform access

- **API Authorization:**
  - All APIs require valid JWT (except auth endpoints)
  - Role checks enforced at route middleware level
  - Campus-scoped data access: users can only access drops/orders for campuses they're authorized for

#### 6.2.2 Data Privacy

- **PII Protection:**
  - Phone numbers, emails, payment details encrypted at rest (AES-256)
  - Payment processing via Razorpay (PCI-DSS compliant); no card data stored
  - Personal data accessible only to authorized roles

- **GDPR/Data Protection Compliance:**
  - User data export API (for user's own data)
  - Account deletion API (soft delete; anonymize orders but retain transaction records for audit)
  - Privacy policy and terms acceptance during onboarding

#### 6.2.3 Payment Security

- **Razorpay Integration:**
  - Server-side signature verification for all payment webhooks
  - Idempotency keys to prevent duplicate charges
  - Payment amount validation (server-side, not client-side)
  - Refund processing via Razorpay API with audit trail

- **Fraud Prevention:**
  - Rate limiting on payment attempts (max 3 failed attempts per 15 minutes)
  - IP-based anomaly detection (flagged for manual review)

#### 6.2.4 Infrastructure Security

- **HTTPS Everywhere:** All traffic over TLS 1.3
- **API Rate Limiting:**
  - Authenticated users: 100 requests/minute
  - Unauthenticated: 20 requests/minute
  - OTP requests: 5 requests/hour per phone/email
- **SQL Injection Prevention:** Parameterized queries, ORM (e.g., Prisma, TypeORM)
- **XSS Prevention:** Input sanitization, Content Security Policy (CSP) headers
- **CSRF Protection:** CSRF tokens for state-changing requests

---

### 6.3 Observability

#### 6.3.1 Logging

**Required Logs:**
- **Authentication Events:** Login attempts, OTP sends, failures
- **Payment Events:** Payment initiated, success, failure, refund
- **Drop State Transitions:** Draft → Live → MOQ Met → Closed
- **Pledge/Order Events:** Pledge created, order created, payment status changes
- **Shipment Events:** Box scanned, arrival confirmed, discrepancies reported
- **Pickup Events:** QR/OTP verified, item dispatched
- **Admin Actions:** MOQ overrides, inventory adjustments, role assignments

**Log Format:**
- Structured JSON logs
- Fields: timestamp, level, event, userId, campusId, dropId, orderId, metadata{}
- Centralized logging (e.g., CloudWatch, Datadog, Elastic)

#### 6.3.2 Metrics & Monitoring

**Key Metrics:**
- **Business Metrics:**
  - Pledge-to-payment conversion rate (target: >80%)
  - Payment-to-pickup conversion rate (target: >95%)
  - Drop success rate (MOQ met %) (target: >70%)
  - Average GMV per campus per month
  - Average order value

- **Operational Metrics:**
  - API error rates (target: <1%)
  - API latency (p50, p95, p99)
  - Payment success rate (target: >98%)
  - QR scan success rate (target: >99%)
  - Shipment reconciliation discrepancy rate (target: <5%)

- **Infrastructure Metrics:**
  - Server CPU/memory usage
  - Database query performance
  - CDN hit rate
  - Background job success/failure rates

**Alerting:**
- Critical: Payment gateway down, database errors, authentication failures
- High: API error rate >5%, payment success rate <90%
- Medium: MOQ validation job failures, notification delivery failures

#### 6.3.3 Dashboards

**Campus Curator Dashboard:**
- Drop performance: pledges, conversion, revenue
- Shipment tracking
- Pickup completion rate

**Drop Host Dashboard:**
- Incoming shipments
- Pending pickups
- Discrepancies to report

**Global Admin Dashboard:**
- Platform-wide metrics (GMV, active campuses, drops)
- Health checks (API uptime, job execution)
- Pending issues (refunds, discrepancies, failed drops)

---

### 6.4 Scalability Considerations (Future-Proofing)

While MVP targets 1-3 campuses, architecture must support:

- **Horizontal Scaling:**
  - Stateless API servers (can add more instances)
  - Database read replicas for heavy read operations
  - Async job processing via queues (e.g., BullMQ, SQS)

- **Multi-Tenancy:**
  - Campus-scoped data partitioning
  - Potential future: separate databases per campus cluster

- **Caching Strategy:**
  - Redis for session management, active drop lists
  - CDN for static assets

- **Database Optimization:**
  - Indexing on campusId, userId, dropId, status fields
  - Partitioning large tables (Orders, Payments) by campus or date range

---

## 7. Phased CI/CD and Platform Evolution Plan

### Phase 0: Spec-First Scaffolding & Foundation

**Duration:** 2 weeks

**Technical Focus:**
- Finalize this PRD and derive technical specifications
- Set up monorepo or multi-repo structure (recommendation: monorepo with Turborepo or Nx)
- Establish tech stack:
  - **Frontend:** Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS, Shadcn UI
  - **Backend:** Node.js 20+, Express.js or Fastify, TypeScript
  - **Database:** PostgreSQL 15+ with Prisma ORM
  - **Cache:** Redis
  - **File Storage:** AWS S3 or Cloudflare R2
  - **Payments:** Razorpay SDK
  - **Authentication:** NextAuth.js or custom JWT service
  - **Hosting:** Vercel (frontend), AWS ECS/Fargate or Railway (backend), AWS RDS (database)
- Initialize CI/CD pipeline:
  - GitHub Actions for CI
  - Automated linting (ESLint, Prettier)
  - Type checking (TypeScript strict mode)
  - Unit test harness (Vitest or Jest)
  - Integration test harness (Playwright or Cypress)
- Environment strategy:
  - **Dev:** Local development, hot reload
  - **Stage:** Pre-production environment mirroring production
  - **Prod:** Production environment

**Feature Focus:**
- Implement authentication shell (OTP + Google OAuth)
- Implement basic campus list and selection
- Deploy "Hello World" version with auth to staging

**Definition of Done:**
- PRD finalized and approved
- Repo initialized with CI/CD pipeline running
- Dev, Stage, Prod environments provisioned
- Hello World app deployed to Stage with working authentication
- Team can create feature branches, run tests, and merge to main

**Preconditions to Move to Phase 1:**
- All stakeholders approve PRD
- CI/CD pipeline green for hello world deployment
- Database schema designed and reviewed

---

### Phase 1: Core MVP (1-2 Pilot Campuses)

**Duration:** 6-8 weeks

**Technical Focus:**
- Implement all MVP features from Section 3
- Database migrations with rollback support (Prisma Migrate)
- API testing (unit + integration for all critical endpoints)
- End-to-end testing for critical flows:
  - Student pledge → payment → pickup
  - Drop Host shipment verification → dispatch
  - Curator drop creation → publishing
- Mobile-responsive UI (tested on iOS Safari, Android Chrome)
- Performance optimization (lazy loading, CDN integration, caching)
- Security hardening (rate limiting, input validation, SQL injection prevention)

**Feature Focus:**
- User authentication (phone OTP, email OTP, Google OAuth)
- Campus selection and onboarding
- Multi-campus browsing
- Pledge flow (drops, variants, cart, pledge confirmation)
- MOQ tracking and validation (automated job)
- Payment collection (50%/100% via Razorpay)
- Balance payment flow
- Order status tracking
- Drop Host shipment QR scanning
- Drop Host pickup QR/OTP verification
- Campus Curator drop creation and management
- Global Admin dashboard and MOQ override

**CI/CD Rules:**
- **Automated on every PR:**
  - Linting (ESLint, Prettier)
  - Type checking (TypeScript)
  - Unit tests (target: >70% code coverage)
  - Integration tests for API endpoints
- **Automated on merge to main:**
  - Build frontend and backend
  - Deploy to Staging environment
  - Run E2E tests on Staging
  - If green → manual approval → deploy to Production
- **Deployment strategy:** Blue-green or simple rolling deployment (single region)

**Go-Live Checklist (for 1 pilot campus):**
- [ ] All MVP features implemented and tested
- [ ] Payment integration tested with real transactions (Razorpay test mode → live mode)
- [ ] 10 test users complete full pledge → payment → pickup flow successfully
- [ ] Drop Host and Campus Curator trained on tools
- [ ] Monitoring and alerting configured
- [ ] Privacy policy and terms published
- [ ] Customer support process defined (email/chat)
- [ ] Rollback plan documented
- [ ] Go/No-Go decision from stakeholders

**Definition of Done:**
- All MVP features deployed to Production
- 1-2 pilot campuses onboarded
- First drop successfully completed (MOQ met → paid → shipped → picked up)
- Zero critical bugs in production for 1 week
- Metrics dashboard showing real data

**Preconditions to Move to Phase 2:**
- Successful completion of at least 2 drops on pilot campuses
- Pledge-to-pickup conversion rate >70%
- Payment success rate >95%
- Operational errors <5%
- Positive feedback from Drop Hosts and Curators

---

### Phase 2: Operational Hardening & Multi-Campus Expansion

**Duration:** 4-6 weeks

**Technical Focus:**
- Feature flags system (e.g., LaunchDarkly, Flagsmith, or custom)
- Blue-green or canary deployment for risk-free rollouts
- Enhanced monitoring:
  - APM (Application Performance Monitoring) integration (e.g., Datadog, New Relic)
  - Error tracking (Sentry)
  - User analytics (Mixpanel, Amplitude)
- Database query optimization (based on production load data)
- Automated backups and disaster recovery plan
- Load testing (simulate 5000 concurrent users across 10 campuses)

**Feature Focus:**
- Admin reporting dashboard:
  - Per-campus GMV, conversion funnels
  - Drop performance comparisons
  - User cohort analysis
- Enhanced Drop Host tools:
  - Bulk pickup QR scanning
  - Pickup history and statistics
- Enhanced Curator tools:
  - Drop duplication (clone previous drops for new campaigns)
  - Variant performance analytics
- Refund automation:
  - Self-service refund requests for students (if order not shipped)
  - Auto-refund for failed drops
- Campus Store improvements:
  - Inventory bulk upload (CSV import)
  - Stock alerts for Curators
- Notification preferences:
  - Users can customize notification channels (push, email, SMS)

**CI/CD Enhancements:**
- Feature flags enable gradual rollout (e.g., new feature enabled for 10% of users first)
- Canary deployments: deploy new version to 10% of traffic, monitor, then full rollout
- Automated rollback on error rate spike
- Database migration pre-checks (validate migrations on staging before production)

**Definition of Done:**
- 5-10 campuses onboarded and operational
- Feature flags and canary deployments in use
- Admin reporting dashboard live
- Automated refunds working
- Zero-downtime deployments achieved
- System handles 5000 concurrent users in load tests

**Preconditions to Move to Phase 3:**
- Platform stable with 10 campuses for 2 weeks
- No major incidents (uptime >99.5%)
- Admin, Curator, Drop Host satisfaction scores >4/5
- Metrics show healthy pledge-to-pickup funnel across all campuses

---

### Phase 3: Scale-Up & Automation

**Duration:** 6-8 weeks

**Technical Focus:**
- Multi-region deployment (if expanding beyond India)
- Database sharding or partitioning strategy (if needed for scale)
- Advanced caching strategies (Redis clustering)
- Microservices extraction (if monolith becomes bottleneck):
  - Separate services for: Auth, Drops, Payments, Notifications
- API versioning strategy (v1, v2 endpoints)
- GraphQL API layer (optional, for flexible frontend queries)
- Advanced CI/CD:
  - Automated regression testing (AI-driven test generation)
  - Performance regression tests (fail build if API latency degrades)
  - Security scanning (SAST, DAST tools in pipeline)

**Feature Focus:**
- Manufacturing workflow integration:
  - Vendor portals to accept production orders
  - Production milestone tracking (design approved, printing started, QC passed, shipped)
- Advanced analytics:
  - Predictive MOQ modeling (suggest optimal MOQ based on historical data)
  - Demand forecasting for campus stores
- Drop Host app improvements:
  - Native mobile app for faster QR scanning (if web performance bottleneck identified)
  - Offline mode for pickup verification
- Student app enhancements:
  - Wishlist and saved drops
  - Referral rewards program
  - Social sharing of drops
- Campus Curator automation:
  - Scheduled drops (auto-publish at specified time)
  - A/B testing for drop descriptions/images

**CI/CD Enhancements:**
- Spec-driven development workflow:
  - PRD → Auto-generate API contracts (OpenAPI/Swagger)
  - Contract testing (ensure frontend/backend match spec)
- Automated canary analysis (statistical comparison of new vs. old version metrics)
- Infrastructure-as-Code (Terraform, Pulumi)
- Disaster recovery drills (automated quarterly)

**Definition of Done:**
- 25+ campuses operational
- System handles 20,000+ concurrent users
- Payment processing >10,000 transactions/day
- <0.1% error rate
- Native mobile app (if built) in beta testing
- Manufacturing workflow integrated with at least 2 vendors

**Preconditions for Future Phases:**
- Platform profitability (revenue > operational costs)
- Strong product-market fit validated (NPS >50, retention >60%)
- Engineering team scaled to support growing feature demands

---

## 8. Acceptance Criteria and Test Cases

### 8.1 Student Pledge Flow

**Test Case 1.1: Successful Pledge**

**Given:**
- User is authenticated
- User has selected home campus "IIT Madras"
- Drop "IIT Madras Winter Hoodies 2026" is Live
- Pledge window is active

**When:**
- User navigates to campus home
- User taps on "IIT Madras Winter Hoodies 2026" drop
- User selects color: Black
- User selects size: M
- User selects quantity: 2
- User taps "Add to Cart"
- User taps "Review Pledges"
- User taps "Confirm Pledge"

**Then:**
- System displays "Your pledge is confirmed!"
- User sees pledge in "My Orders" with status "Pledged - Awaiting MOQ"
- Drop MOQ counter increments by 2
- Color variant "Black" MOQ counter increments by 2

---

**Test Case 1.2: Pledge After Window Expires**

**Given:**
- Drop "IIT Madras Winter Hoodies 2026" pledge window has expired
- Drop status is "Pledge Window Closed"

**When:**
- User attempts to view drop details
- User attempts to select variant

**Then:**
- "Add to Cart" button is disabled
- System displays message "Pledge window has closed. Explore other active drops."

---

**Test Case 1.3: Multi-Campus Cart Conflict**

**Given:**
- User has items in cart from "IIT Madras"
- User switches to "IIT Bombay" campus

**When:**
- User attempts to add items from "IIT Bombay" drop to cart

**Then:**
- System displays modal: "You have items in IIT Madras cart. Please checkout or clear cart before switching to IIT Bombay."
- User can choose: "Checkout IIT Madras Cart" or "Clear Cart and Switch"

---

### 8.2 MOQ Validation & Payment Window

**Test Case 2.1: MOQ Met - Payment Window Opens**

**Given:**
- Drop "IIT Madras Winter Hoodies 2026" has category MOQ: 200
- Current pledge count: 195
- Variant "Black" has MOQ: 50, current pledges: 48
- Variant "Navy" has MOQ: 50, current pledges: 52

**When:**
- 5 new users pledge 1 item each (total now 200)
- All 5 pledges are for "Navy" variant (Navy now 57, Black still 48)
- MOQ validation job runs

**Then:**
- Drop status transitions to "MOQ Met"
- Variant "Navy" status: "Met"
- Variant "Black" status: "Failed"
- Users who pledged "Black" receive notification: "Your variant did not reach MOQ. Switch to Navy or cancel pledge."
- Users who pledged "Navy" receive notification: "MOQ reached! Pay now."
- Payment window opens with 7-day duration
- Drop status transitions to "Payment Window Open"

---

**Test Case 2.2: Variant Switching After Failure**

**Given:**
- User pledged "Black" variant (MOQ failed)
- User receives notification to switch

**When:**
- User taps notification
- User sees options: "Switch to Navy" or "Cancel Pledge"
- User selects "Switch to Navy"

**Then:**
- System updates pledge: variantId changed to Navy, status: "payment_pending"
- User sees updated pledge in "My Orders"
- Navy variant pledge count increments
- Black variant pledge count decrements

---

**Test Case 2.3: Payment Window Expiry**

**Given:**
- Drop is in "Payment Window Open" state
- Payment window end date: 2026-03-29 23:59:59
- Current time: 2026-03-30 00:01:00
- User has unpaid pledge

**When:**
- Payment window expiry job runs

**Then:**
- User's unpaid pledge status changes to "Canceled"
- User receives notification: "Payment window closed. Your pledge has been canceled."
- Drop transitions to "Production" with only paid orders

---

### 8.3 Payment Collection

**Test Case 3.1: Successful 50% Advance Payment**

**Given:**
- Drop is in "Payment Window Open"
- User has pledge with 2 items @ ₹1200 each (total: ₹2400)
- User selects "Pay 50% Advance"

**When:**
- User taps "Proceed to Payment"
- System redirects to Razorpay with amount ₹1200
- User completes payment successfully
- Razorpay sends success webhook

**Then:**
- Order paymentStatus updates to "Paid 50%"
- Order paidAmount: ₹1200, balanceDue: ₹1200
- Order status: "Payment Confirmed - In Production"
- User receives confirmation: "Payment successful! Your order is in production."
- Payment record created with transactionId, amount, method

---

**Test Case 3.2: Payment Failure and Retry**

**Given:**
- User attempts payment
- Razorpay payment fails (insufficient funds)

**When:**
- Razorpay sends failure webhook

**Then:**
- Order paymentStatus remains "Unpaid"
- User sees error: "Payment failed: Insufficient funds. Please retry."
- User can tap "Retry Payment"
- Payment window countdown continues

---

**Test Case 3.3: Balance Payment After Arrival**

**Given:**
- Order has paymentStatus "Paid 50%"
- Drop Host confirms shipment arrival
- Order status: "Arrived - Balance Payment Pending"
- Balance due: ₹1200

**When:**
- User receives notification: "Order arrived! Pay remaining ₹1200."
- User taps "Pay Now"
- User completes payment successfully

**Then:**
- Order paymentStatus updates to "Paid 100%"
- Order status: "Ready for Pickup"
- Pickup QR code generated
- Pickup OTP generated (e.g., "456789")
- User receives notification with QR and OTP, Drop Host location

---

### 8.4 Shipment Arrival & Reconciliation

**Test Case 4.1: Successful Shipment Verification**

**Given:**
- Drop is in "Shipped" state
- Shipment has 10 boxes with expected 200 items
- Drop Host is at campus with shipment

**When:**
- Drop Host scans box QR codes for all 10 boxes
- Each box scan succeeds
- Total scanned items: 200 (matches expected)
- Drop Host taps "Confirm Arrival"

**Then:**
- Shipment status: "Arrived"
- Drop status: "Arrived at Campus"
- All orders with paymentStatus "Paid 50%" transition to "Arrived - Balance Payment Pending"
- All orders with paymentStatus "Paid 100%" transition to "Ready for Pickup"
- Notifications sent to all users accordingly

---

**Test Case 4.2: Shipment Discrepancy Handling**

**Given:**
- Expected items: 200
- Drop Host scans all boxes
- Total scanned items: 196
- Missing: 4 items (Black-M: 2, Navy-L: 2)

**When:**
- Drop Host reviews reconciliation summary
- System displays: "Missing: 4 items"
- Drop Host taps "Report Discrepancy"
- Drop Host adds notes: "Box-003 had visible damage, items missing"
- Drop Host submits report

**Then:**
- System flags 4 affected orders as "Pending Resolution"
- Global Admin receives alert: "Shipment discrepancy for Drop #123"
- Drop Host cannot confirm arrival until Admin reviews (if discrepancy >10%)
- If discrepancy <10%: Drop Host can confirm, affected orders held automatically

---

### 8.5 Pickup Verification

**Test Case 5.1: Successful QR Code Pickup**

**Given:**
- Order is "Ready for Pickup"
- Order paymentStatus: "Paid 100%"
- Student has pickup QR code

**When:**
- Student arrives at Drop Host location
- Drop Host scans student's QR code
- QR decodes to: orderId, userId, verificationToken

**Then:**
- System validates token
- System displays: "Rahul Sharma - 1x Black Hoodie M"
- Drop Host confirms item handover
- Drop Host taps "Mark as Picked Up"
- Order status: "Picked Up"
- Student receives confirmation: "Order picked up successfully!"
- Pickup event logged with timestamp, Drop Host ID

---

**Test Case 5.2: Pickup Before Full Payment (Error)**

**Given:**
- Order paymentStatus: "Paid 50%"
- Student attempts pickup

**When:**
- Drop Host scans QR code

**Then:**
- System displays error: "Payment incomplete. Remaining balance: ₹1200. Cannot dispatch."
- Drop Host does not see "Mark as Picked Up" button
- Student redirected to pay balance

---

**Test Case 5.3: Partial Pickup (Multi-Item Order)**

**Given:**
- Order has 2 items: 1x Black Hoodie M, 1x Navy Hoodie L
- Both items arrived at campus
- Student wants to pick up only Black Hoodie M today

**When:**
- Drop Host scans QR code
- System displays both items
- Drop Host selects "Black Hoodie M" only
- Drop Host taps "Mark Selected as Picked Up"

**Then:**
- Item "Black Hoodie M" status: "Picked Up"
- Item "Navy Hoodie L" status: "Ready for Pickup"
- Order status: "Partially Picked Up"
- Student can return later to pick up remaining item with same QR/OTP

---

### 8.6 Drop Configuration by Curator

**Test Case 6.1: Successful Drop Creation**

**Given:**
- User has Campus Curator role for "IIT Madras"

**When:**
- Curator creates new drop:
  - Title: "IIT Madras Summer T-Shirts"
  - Description: "Cool cotton tees..."
  - Category: Apparel
  - Images: 3 uploaded
  - Colors: White, Grey
  - Sizes: S, M, L, XL
  - Base Price: ₹600
  - Category MOQ: 100
  - Per-color MOQ: White 50, Grey 50
  - Pledge window: 2026-03-20 to 2026-03-27
  - Payment window duration: 7 days
  - Drop Host: Assigned
- Curator saves as Draft
- Curator reviews
- Curator taps "Publish"

**Then:**
- Drop created with status "Live"
- 8 variants generated (2 colors × 4 sizes)
- Drop visible on campus home page
- Notification sent to campus students: "New drop: IIT Madras Summer T-Shirts!"

---

**Test Case 6.2: Invalid Drop Configuration**

**Given:**
- Curator attempts to create drop with:
  - Pledge window start: 2026-03-10 (in past)

**When:**
- Curator taps "Publish"

**Then:**
- System displays error: "Pledge start date must be in the future"
- Drop remains in "Draft" state
- Curator corrects date and republishes

---

### 8.7 Global Admin Override

**Test Case 7.1: MOQ Override Approval**

**Given:**
- Drop "IIT Madras Winter Hoodies" did not meet MOQ
- Category MOQ: 200, pledges: 185 (92.5%)
- Admin reviews drop

**When:**
- Admin navigates to "Pending Drops"
- Admin taps "Review Override" for this drop
- Admin enters reason: "Strong demand, close to threshold"
- Admin selects "Approve All Variants"
- Admin taps "Approve Drop"

**Then:**
- Drop status transitions to "MOQ Met"
- Payment window opens
- All pledged users receive payment notification
- Override logged: adminId, reason, timestamp

---

**Test Case 7.2: Inventory Adjustment for Missing Items**

**Given:**
- Shipment arrived with 4 missing items
- 4 affected orders

**When:**
- Admin reviews discrepancy report
- Admin selects resolution: "Refund" for 2 orders, "Wait for Restock" for 2 orders
- Admin confirms adjustment

**Then:**
- Inventory updated: -4 items
- 2 orders: status "Refunded", refund processed via Razorpay
- 2 orders: status "Pending Restock"
- All 4 users notified with resolution details
- Adjustment logged

---

## 9. Open Questions and Assumptions

### 9.1 Assumptions Made

1. **Payment Provider:**
   - Assumption: Razorpay is available and approved for platform use
   - Assumption: Razorpay supports UPI, cards, net banking, wallets for Indian users

2. **Authentication:**
   - Assumption: Phone OTP via SMS service (e.g., Twilio, AWS SNS) is available
   - Assumption: Email OTP via transactional email service (e.g., SendGrid, AWS SES) is available
   - Assumption: Google OAuth is approved for user data access (email, name, profile picture)

3. **Campus Verification:**
   - Assumption: MVP does not verify student/alumni affiliation; self-selection is acceptable
   - Assumption: Future phases will implement email domain verification or campus SSO

4. **Inventory Management:**
   - Assumption: "Master sheet" refers to a CSV/Excel file with inventory data
   - Assumption: Inventory sync is manual upload for MVP; automation via API integration is Phase 3+

5. **Manufacturing/Production:**
   - Assumption: Production and vendor coordination is external to platform for MVP
   - Assumption: Global Admin manually updates drop status to "Production" and "Shipped"

6. **Logistics:**
   - Assumption: No integration with shipping providers (Delhivery, Blue Dart, etc.) for MVP
   - Assumption: Tracking updates are manual push-button actions by Drop Hosts/Admins

7. **Notifications:**
   - Assumption: Push notifications via Firebase Cloud Messaging (FCM)
   - Assumption: Email notifications via SendGrid or AWS SES
   - Assumption: SMS notifications for critical events (OTP, payment confirmations) only

8. **Hosting & Infrastructure:**
   - Assumption: AWS or Vercel/Railway for hosting
   - Assumption: PostgreSQL for relational data, Redis for caching/sessions
   - Assumption: S3 or Cloudflare R2 for image/file storage

9. **Legal & Compliance:**
   - Assumption: Platform operates within India; GDPR not immediately applicable
   - Assumption: Privacy policy and terms drafted externally (legal team)
   - Assumption: Refund policy: full refunds for failed drops, partial refunds for inventory issues

10. **Mobile App:**
    - Assumption: MVP is mobile-responsive web app only
    - Assumption: Native app development (iOS/Android) is Phase 3+ if web performance bottlenecks identified

11. **QR Code Generation:**
    - Assumption: QR codes generated server-side (library: qrcode.js or similar)
    - Assumption: QR payload is encrypted/signed to prevent tampering

12. **Refund Processing:**
    - Assumption: Refunds processed via Razorpay API (takes 5-7 business days)
    - Assumption: Platform does not hold funds; Razorpay handles refund disbursement

---

### 9.2 Open Questions

1. **Campus Onboarding:**
   - Question: What is the approval process for new campuses to join the platform?
   - Question: Who creates the initial Campus record (Global Admin manually, or self-service signup)?

2. **Drop Host & Curator Recruitment:**
   - Question: How are Drop Hosts and Campus Curators recruited and onboarded?
   - Question: Is there an application/approval flow within the platform, or is this handled externally?

3. **Pricing Strategy:**
   - Question: Does the platform take a commission/fee on each transaction? If yes, what percentage?
   - Question: Who sets product pricing: Curator, Global Admin, or external vendor?

4. **Tax & Invoicing:**
   - Question: Should the platform generate GST-compliant invoices for each order?
   - Question: Is tax calculated and collected at checkout, or is pricing inclusive of tax?

5. **Return & Exchange Policy:**
   - Question: Are returns/exchanges allowed after pickup? If yes, within what timeframe?
   - Question: Who handles return logistics: Drop Host or student ships back?

6. **Multi-Variant Pricing:**
   - Question: Can different sizes or colors have different prices (e.g., XXL costs more)?
   - Assumption: MVP uses base price with optional per-variant override; confirm if needed.

7. **Drop Host Compensation:**
   - Question: Are Drop Hosts paid for their services? If yes, how is compensation calculated and tracked?

8. **Campus Store Inventory Source:**
   - Question: Where does initial campus store inventory come from? (Excess from previous drops, external purchase, consignment?)
   - Question: Who owns the inventory: campus, platform, or third-party vendor?

9. **Data Retention:**
   - Question: How long should order/payment data be retained for audit/compliance purposes?
   - Question: What happens to user data after account deletion?

10. **Internationalization:**
    - Question: Will the platform support multiple languages (English, Hindi, Tamil, etc.) in MVP or later phases?
    - Question: Will currency be limited to INR, or should multi-currency support be considered?

11. **Variant MOQ Edge Cases:**
    - Question: If per-variant MOQ is enabled but a variant is not explicitly configured, what is the default behavior? (Inherit category MOQ, or no MOQ for that variant?)

12. **Failed Drop Notification Timing:**
    - Question: When exactly should users be notified of a failed drop? (Immediately when pledge window closes, or after Admin review?)

13. **OTP vs. QR Preference:**
    - Question: Should the platform prioritize QR or OTP for pickup? (Both available, but UX can guide preference)

14. **Pickup Window:**
    - Question: Is there a time limit for pickup after arrival? (e.g., must pick up within 7 days or order forfeit?)

15. **Admin Manual Production Update:**
    - Question: Should there be intermediate production milestones (e.g., "Design Approved", "Printing Started", "QC Passed") or just "Production" → "Shipped"?

---

### 9.3 Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Razorpay Payment Failures** | High (revenue loss, user trust) | Implement retry logic, fallback to manual payment collection, robust error logging |
| **Low MOQ Achievement** | Medium (drop failures demotivate users) | Admin MOQ override tool, dynamic MOQ adjustment based on early pledge velocity |
| **Shipment Discrepancies** | Medium (user dissatisfaction, refunds) | Rigorous QR scanning process, photo documentation, Admin resolution workflow |
| **Drop Host Errors** | Medium (wrong items dispatched, payment not collected) | Training, in-app checklists, undo buttons, Admin audit logs |
| **Scalability Bottlenecks** | High (platform downtime during growth) | Horizontal scaling architecture, load testing, monitoring/alerting |
| **Security Breach** | Critical (data loss, financial fraud) | HTTPS, encryption at rest, regular security audits, rate limiting, bug bounty program |
| **User Adoption** | High (low pledges → no drops succeed) | Marketing campaigns, referral incentives, compelling drop designs, social proof |

---

## Conclusion

This PRD provides a comprehensive, unambiguous specification for the ccoop.in MVP. It is designed to enable AI coding agents and engineering teams to implement the platform without guessing or inventing requirements.

**Next Steps:**
1. Stakeholder review and approval of this PRD
2. Answer open questions (Section 9.2)
3. Derive technical specifications (database schema, API contracts, UI wireframes)
4. Proceed with Phase 0: Scaffolding & Foundation

**Document Version History:**
- v1.0 (2026-03-12): Initial PRD based on start.md instructions and clarifications

---

**Approval Signatures:**

- Product Owner: ___________________ Date: ___________
- Engineering Lead: ___________________ Date: ___________
- Business Stakeholder: ___________________ Date: ___________

---

**End of Document**
