# 🍱 TiffinBox - Meal Subscription App

A full-stack mobile-first meal subscription web application built with React.js, Node.js, Express, and MongoDB.

**Live App:** [tiffinbox-five.vercel.app](https://tiffinbox-five.vercel.app)  
**Backend API:** [tiffinbox-backend-s34g.onrender.com](https://tiffinbox-backend-s34g.onrender.com)

---

## 📱 Screenshots

| Login | Home | Plans | Admin |
|-------|------|-------|-------|
| Auth screen with phone + password | Today's menu & meals remaining | Subscription plans | Admin dashboard |

---

## ✨ Features

### User App
- 📲 Phone number based signup & login (JWT auth)
- 🏠 Home dashboard with today's menu & delivery status
- 🍽️ Meals remaining counter
- ⏸️ Pause or skip today's delivery
- 📦 Subscription plans (20 / 40 / Monthly meals)
- 📋 Order history
- 👤 Profile management with delivery address

### Admin Panel
- 🔐 Secure admin login
- 📊 Dashboard with stats (users, subscribers, orders)
- 👥 View & manage all users
- 🍛 Set daily menu (main dish, side dish, bread, extras)
- 📦 Manage subscriptions (pause/activate)
- 📋 View and update order status
- ✅ Manually activate plans for users

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, CSS-in-JS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT + bcrypt |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
tiffinbox/
├── frontend/                  # React user app
│   └── src/
│       ├── pages/
│       │   ├── AuthPage.js        # Login & signup
│       │   ├── MainApp.js         # Main layout + bottom nav
│       │   ├── HomePage.js        # Dashboard & today's menu
│       │   ├── PlansPage.js       # Subscription plans
│       │   ├── OrdersPage.js      # Order history
│       │   ├── ProfilePage.js     # User profile
│       │   └── AdminDashboard.js  # Admin panel
│       ├── context/
│       │   └── AuthContext.js     # Auth state management
│       └── services/
│           └── api.js             # Axios API calls
│
└── backend/                   # Node.js API server
    ├── server.js              # Entry point
    ├── routes/
    │   ├── auth.js            # Login, register, admin login
    │   ├── users.js           # User profile management
    │   ├── menu.js            # Daily menu CRUD
    │   ├── subscriptions.js   # Subscription management
    │   ├── orders.js          # Order management
    │   └── admin.js           # Admin dashboard stats
    ├── models/
    │   ├── User.js
    │   ├── Menu.js
    │   ├── Subscription.js
    │   └── Order.js
    ├── middleware/
    │   └── auth.js            # JWT verification
    └── .env                   # Environment variables
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/vybhvdev/tiffinbox.git
cd tiffinbox
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000
```

Start the backend:
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```
App runs on `http://localhost:3000`

---

## 🔐 Admin Access

On the login page, tap **Admin Login** and enter the admin password.

To change the admin password, update it in your backend environment variables or database.

---

## 🌐 Deployment

### Backend → Render
1. Connect GitHub repo to [render.com](https://render.com)
2. Set Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add environment variables in Render dashboard

### Frontend → Vercel
1. Connect GitHub repo to [vercel.com](https://vercel.com)
2. Set Root Directory: `frontend`
3. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-render-backend.onrender.com/api
   ```

### Database → MongoDB Atlas
1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Allow all IPs: `0.0.0.0/0` in Network Access
3. Copy connection string to `MONGODB_URI`

---

## 📦 Subscription Plans

| Plan | Meals | Price | Per Meal |
|------|-------|-------|----------|
| 20 Meals | 20 | ₹1,999 | ₹100 |
| 40 Meals ⭐ | 40 | ₹3,499 | ₹87 |
| Monthly | 60 | ₹4,999 | ₹83 |

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User signup |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/admin-login` | Admin login |
| GET | `/api/auth/me` | Get current user |

### Menu
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu/today` | Get today's menu |
| GET | `/api/menu` | Get all menus (admin) |
| POST | `/api/menu` | Create/update menu (admin) |

### Subscriptions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subscriptions/my` | Get my subscription |
| POST | `/api/subscriptions/pause` | Pause a date |
| POST | `/api/subscriptions/admin-activate` | Admin activate plan |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/my` | Get my orders |
| GET | `/api/orders` | Get all orders (admin) |
| PUT | `/api/orders/:id` | Update order status (admin) |

---

## 👨‍💻 Built By

**vybhvdev** — [github.com/vybhvdev](https://github.com/vybhvdev)

---

## 📄 License

MIT License — feel free to use and modify!
