# 🍱 TiffinBox — Homestyle Meals Delivered Fresh

![TiffinBox](https://img.shields.io/badge/TiffinBox-Meal%20Subscription-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-02042B?style=flat-square&logo=razorpay)

A full-stack mobile-first meal subscription web application. Users can subscribe to daily tiffin delivery plans, manage their deliveries, skip or pause meals, and pay securely via Razorpay. Admins get a dedicated dashboard to manage users, menus, orders, and payments.

---

## 📱 Screenshots

<table>
  <tr>
    <td align="center"><b>Login</b></td>
    <td align="center"><b>Home</b></td>
    <td align="center"><b>Plans</b></td>
  </tr>
  <tr>
    <td><img src="screenshot-login.jpg" width="200"/></td>
    <td><img src="screenshot-home.jpg" width="200"/></td>
    <td><img src="screenshot-plans.jpg" width="200"/></td>
  </tr>
  <tr>
    <td align="center"><b>Profile</b></td>
    <td align="center"><b>Admin Dashboard</b></td>
    <td></td>
  </tr>
  <tr>
    <td><img src="screenshot-profile.jpg" width="200"/></td>
    <td><img src="screenshot-admin.jpg" width="200"/></td>
    <td></td>
  </tr>
</table>

---

## ✨ Features

### 👤 User App
- Phone number + password authentication (JWT)
- Dashboard: today's meal menu, delivery status, meals remaining
- Subscription plans: 20 Meals (₹1999), 40 Meals (₹3499), Monthly / 60 Meals (₹4999)
- Razorpay payment integration with order verification
- Pause or resume delivery for any day
- Skip a specific meal day
- Full order history
- Profile page with delivery address & notifications

### 🔐 Admin Panel
- Secure admin login (separate credentials)
- Dashboard stats: total users, active subscribers, orders, revenue
- Manage daily menu (add / edit / delete items)
- View and manage all user subscriptions
- Track all orders and delivery statuses
- Monitor Razorpay payment records
- Pause or adjust individual user subscriptions

---

## 🏗️ Project Structure

```
tiffinbox/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── menuController.js
│   │   │   ├── orderController.js
│   │   │   ├── paymentController.js
│   │   │   ├── subscriptionController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js   # JWT verification
│   │   │   └── adminMiddleware.js  # Admin role check
│   │   ├── models/
│   │   │   ├── Admin.js
│   │   │   ├── Menu.js
│   │   │   ├── Order.js
│   │   │   ├── Payment.js
│   │   │   ├── Subscription.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── menu.js
│   │   │   ├── orders.js
│   │   │   ├── payments.js
│   │   │   ├── subscriptions.js
│   │   │   └── users.js
│   │   ├── services/
│   │   │   ├── razorpayService.js
│   │   │   └── emailService.js
│   │   └── app.js
│   ├── .env.example
│   └── package.json
│
├── frontend/                   # React user app
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # Axios instance with interceptors
│   │   ├── components/
│   │   │   ├── BottomNav.jsx
│   │   │   ├── MealCard.jsx
│   │   │   ├── PlanCard.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── DeliveryStatus.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Subscription.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
└── admin-panel/                # React admin dashboard
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── StatCard.jsx
    │   │   ├── UserRow.jsx
    │   │   └── OrderRow.jsx
    │   ├── pages/
    │   │   ├── AdminLogin.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── MenuManager.jsx
    │   │   ├── Orders.jsx
    │   │   ├── Payments.jsx
    │   │   ├── Subscriptions.jsx
    │   │   └── Users.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend (User) | React 18, Vite, Tailwind CSS, React Router |
| Frontend (Admin) | React 18, Vite, Tailwind CSS |
| Backend | Node.js 20, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Authentication | JWT (jsonwebtoken) + bcrypt |
| Payments | Razorpay SDK |
| HTTP Client | Axios |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org)
- **npm** v9+ (comes with Node.js)
- **MongoDB Atlas** account (free tier works) — [Create account](https://www.mongodb.com/cloud/atlas)
- **Razorpay** account (test mode) — [Create account](https://razorpay.com)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tiffinbox.git
cd tiffinbox
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/tiffinbox?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# Admin
ADMIN_EMAIL=admin@tiffinbox.com
ADMIN_PASSWORD_HASH=   # Leave blank; seed script will set this

# CORS
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

Seed the admin account:

```bash
npm run seed:admin
```

Start the backend server:

```bash
npm run dev      # Development (with nodemon)
npm start        # Production
```

The API will be running at `http://localhost:5000`

---

### 3. Frontend (User App) Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
```

Start the development server:

```bash
npm run dev
```

User app runs at `http://localhost:5173`

---

### 4. Admin Panel Setup

```bash
cd ../admin-panel
npm install
cp .env.example .env
```

Edit `admin-panel/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the admin panel:

```bash
npm run dev -- --port 5174
```

Admin panel runs at `http://localhost:5174`

---

## 🔌 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/admin/login` | Admin login | Public |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/me` | Get current user profile | User |
| PUT | `/api/users/me` | Update profile | User |
| GET | `/api/users` | List all users | Admin |
| PUT | `/api/users/:id/subscription` | Edit user subscription | Admin |

### Menu

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/menu/today` | Get today's menu | User |
| GET | `/api/menu` | List all menu entries | Admin |
| POST | `/api/menu` | Create menu entry | Admin |
| PUT | `/api/menu/:id` | Update menu entry | Admin |
| DELETE | `/api/menu/:id` | Delete menu entry | Admin |

### Subscriptions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/subscriptions/plans` | List available plans | Public |
| GET | `/api/subscriptions/me` | Get my subscription | User |
| POST | `/api/subscriptions/pause` | Pause delivery for a date | User |
| POST | `/api/subscriptions/skip` | Skip today's meal | User |
| GET | `/api/subscriptions` | All subscriptions | Admin |

### Payments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payments/create-order` | Create Razorpay order | User |
| POST | `/api/payments/verify` | Verify payment & activate plan | User |
| GET | `/api/payments` | All payment records | Admin |

### Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/orders/me` | My order history | User |
| GET | `/api/orders` | All orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

---

## 💳 Razorpay Integration

TiffinBox uses Razorpay's standard checkout flow:

1. **User selects a plan** → Frontend calls `POST /api/payments/create-order`
2. **Backend creates a Razorpay order** and returns `order_id`
3. **Razorpay Checkout opens** in the browser with the `order_id`
4. **User completes payment** → Razorpay returns `payment_id`, `order_id`, `signature`
5. **Frontend calls** `POST /api/payments/verify` with these three values
6. **Backend verifies the signature** using HMAC SHA-256
7. **On success** → subscription is activated, meals are credited to the account

> **Test Cards for Development:**  
> Card: `4111 1111 1111 1111` | Expiry: any future date | CVV: any 3 digits  
> UPI: `success@razorpay`

---

## 🗄️ MongoDB Collections

### `users`
```json
{
  "_id": "ObjectId",
  "name": "String",
  "phone": "String (unique)",
  "password": "String (bcrypt hashed)",
  "mealsLeft": "Number",
  "subscription": "String",
  "pausedDates": ["String"],
  "address": "String",
  "createdAt": "Date"
}
```

### `menus`
```json
{
  "_id": "ObjectId",
  "date": "Date",
  "mainDish": "String",
  "sideDish": "String",
  "bread": "String",
  "extras": "String",
  "isActive": "Boolean"
}
```

### `subscriptions`
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "planId": "String",
  "planName": "String",
  "totalMeals": "Number",
  "mealsUsed": "Number",
  "startDate": "Date",
  "status": "String (active | paused | expired)"
}
```

### `orders`
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "planName": "String",
  "meals": "Number",
  "amount": "Number",
  "status": "String (pending | confirmed | delivered)",
  "createdAt": "Date"
}
```

### `payments`
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "razorpayOrderId": "String",
  "razorpayPaymentId": "String",
  "amount": "Number",
  "status": "String (created | paid | failed)",
  "createdAt": "Date"
}
```

### `admins`
```json
{
  "_id": "ObjectId",
  "email": "String",
  "password": "String (bcrypt hashed)",
  "name": "String"
}
```

---

## 🔒 Security

- **Passwords** are hashed with `bcrypt` (salt rounds: 12) — never stored in plain text
- **JWT tokens** are signed with a secret key and expire in 7 days
- **Admin routes** are protected by a separate admin middleware that checks the `isAdmin` claim in the JWT
- **Razorpay webhook signature** is verified server-side using HMAC SHA-256 before activating any subscription
- **Environment variables** store all secrets — never commit your `.env` file
- **CORS** is configured to only allow requests from the frontend and admin panel origins

---

## 🧪 Running Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

---

## 📦 Building for Production

### Backend
```bash
cd backend
npm start   # Runs with NODE_ENV=production
```

### Frontend
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

### Admin Panel
```bash
cd admin-panel
npm run build
# Output in admin-panel/dist/
```

Deploy `dist/` folders to any static host (Vercel, Netlify, S3). Point your backend to a cloud service (Railway, Render, AWS EC2, etc.).

---

## ⚙️ Environment Variables Summary

### `backend/.env.example`
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
ADMIN_EMAIL=
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### `frontend/.env.example`
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=
```

### `admin-panel/.env.example`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗺️ Roadmap

- [ ] Push notifications for delivery updates
- [ ] OTP-based login (replace password)
- [ ] Google Maps delivery tracking
- [ ] Dietary preference filters (veg / jain / low-cal)
- [ ] Referral & loyalty points system
- [ ] Multi-city support with zone-based delivery

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style and add tests for new features.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- UI inspired by the TiffinBox Canva prototype
- [Razorpay](https://razorpay.com) for seamless Indian payments
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free cloud database hosting
- [Tailwind CSS](https://tailwindcss.com) for rapid styling

---

<p align="center">Made with ❤️ for fresh, homestyle meals delivered daily</p>
