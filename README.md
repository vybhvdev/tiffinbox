# 🍱 TiffinBox — Meal Subscription App

A full-stack mobile-first meal subscription web app with user dashboard, admin panel, and Razorpay payments.

---

## 📁 Project Structure

```
tiffinbox/
├── backend/                    # Node.js + Express API
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   ├── subscriptionController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── userController.js
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js
│   │   ├── Menu.js
│   │   ├── Subscription.js
│   │   ├── Order.js
│   │   └── Payment.js
│   ├── routes/                 # Express routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── menu.js
│   │   ├── subscriptions.js
│   │   ├── orders.js
│   │   ├── payments.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js             # JWT middleware
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/                   # React.js (User App + Admin Panel)
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── AuthPage.js     # Login / Signup / Admin login
    │   │   ├── MainApp.js      # Shell with bottom nav
    │   │   ├── HomePage.js     # Today's menu, delivery status
    │   │   ├── PlansPage.js    # Subscription plans + Razorpay
    │   │   ├── OrdersPage.js   # Order history
    │   │   ├── ProfilePage.js  # User profile
    │   │   └── AdminDashboard.js # Full admin panel
    │   ├── services/
    │   │   └── api.js          # Axios API calls
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    └── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier)
- Razorpay account (test mode)

---

### Step 1: Clone and Install

```bash
git clone <your-repo-url>
cd tiffinbox

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### Step 2: Setup Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/tiffinbox
JWT_SECRET=any_long_random_string_here
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
ADMIN_PASSWORD=GoldenDawn
```

**How to get MongoDB URI:**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster → Connect → Drivers → Copy URI
3. Replace `<password>` with your DB user password

**How to get Razorpay keys:**
1. Go to [razorpay.com](https://razorpay.com) → Sign up
2. Dashboard → Settings → API Keys → Generate Test Key
3. Copy Key ID and Key Secret

---

### Step 3: Setup Frontend Environment

```bash
cd frontend
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

---

### Step 4: Run the App

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
# App running on http://localhost:3000
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User signup |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/admin-login` | Admin login |
| GET | `/api/auth/me` | Get current user |

### Menu
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/menu/today` | User |
| GET | `/api/menu` | Admin |
| POST | `/api/menu` | Admin |
| DELETE | `/api/menu/:id` | Admin |

### Subscriptions
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/subscriptions/my` | User |
| POST | `/api/subscriptions/pause` | User |
| GET | `/api/subscriptions` | Admin |
| PUT | `/api/subscriptions/:id` | Admin |

### Payments
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/payments/create-order` | User |
| POST | `/api/payments/verify` | User |
| GET | `/api/payments/my` | User |
| GET | `/api/payments` | Admin |

### Orders
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/orders/my` | User |
| GET | `/api/orders` | Admin |
| PUT | `/api/orders/:id` | Admin |

---

## 🔐 Admin Access

- Visit the app and click **Admin Login**
- Default password: `GoldenDawn` (change this in `.env`)
- Admin can:
  - View all users and edit meal counts
  - Set daily menu for any date
  - View and manage subscriptions
  - Update order delivery status
  - Track all payments and revenue

---

## 💳 Subscription Plans

| Plan | Meals | Price | Per Meal |
|------|-------|-------|----------|
| 20 Meals | 20 | ₹1,999 | ₹100 |
| 40 Meals | 40 | ₹3,499 | ₹87 |
| Monthly | 60 | ₹4,999 | ₹83 |

---

## ☁️ Free Deployment

### Backend → [Render](https://render.com)
1. Push to GitHub
2. New Web Service → Connect repo → Root dir: `backend`
3. Build: `npm install` | Start: `node server.js`
4. Add all environment variables in Render dashboard

### Frontend → [Vercel](https://vercel.com)
1. Import GitHub repo → Root dir: `frontend`
2. Add env var: `REACT_APP_API_URL=https://your-backend.onrender.com/api`
3. Deploy!

---

## 🛵 Features Summary

### User App
- ✅ Phone + password authentication
- ✅ Today's menu display
- ✅ Meals remaining counter
- ✅ Pause/resume today's delivery
- ✅ Razorpay payment for subscriptions
- ✅ Order history
- ✅ Profile management
- ✅ PWA — installable on Android

### Admin Panel
- ✅ Secure admin login (password protected)
- ✅ Dashboard with stats (users, revenue, orders)
- ✅ Manage daily menu
- ✅ View all users, edit meal counts
- ✅ Manage subscriptions (pause/activate)
- ✅ Update order delivery status
- ✅ Payment tracking

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router |
| Styling | Inline CSS (mobile-first) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| Payments | Razorpay |
| Deploy | Vercel (frontend) + Render (backend) |

---

Made with ❤️ for TiffinBox
