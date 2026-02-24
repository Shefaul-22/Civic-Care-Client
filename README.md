
---

# 🚧 Civic Care

## Public Infrastructure Issue Reporting System

🔗 **Live Site:** [https://public-care.web.app/](https://public-care.web.app/)
💻 **Client Repo:** [https://github.com/Shefaul-22/Civic-Care-Client](https://github.com/Shefaul-22/Civic-Care-Client)
⚙️ **Server Repo:** [https://github.com/Shefaul-22/Civic-Care-server](https://github.com/Shefaul-22/Civic-Care-server)

---

## 📌 Overview

**Civic Care** is a full-stack Public Infrastructure Issue Reporting System that enables citizens to report infrastructure problems such as potholes, broken streetlights, garbage overflow, water leaks, and more.

The platform ensures efficient issue tracking, faster resolution, transparency, and seamless communication between citizens, staff, and administrators through a secure, scalable, and modern web application.

This project demonstrates real-world full-stack development skills including authentication, role-based access control, payment integration, secure APIs, and responsive UI.

---

## ✨ Core Features

### 👤 Citizen Features

* Report infrastructure issues with image, location, and description
* Track issue progress with real-time timeline updates
* Edit and delete issues (if pending)
* Upvote important issues
* Boost issue priority using secure payment
* Subscribe to premium for unlimited issue reporting
* View personal dashboard with statistics and activity tracking

### 🛠️ Staff Features

* View assigned issues only
* Update issue status (Pending → In Progress → Working → Resolved → Closed)
* Add progress updates
* Track issue timeline history
* Manage profile information

### 🛡️ Admin Features

* Manage all issues across the system
* Assign staff to issues
* Reject or manage reported issues
* Manage citizens and staff accounts
* Block or unblock users
* Monitor payments and subscriptions
* View system analytics and statistics dashboard

---

## 📊 Advanced Functionalities

* 🔐 JWT Authentication & Authorization
* 👥 Role-based access control (Admin, Staff, Citizen)
* 📍 Issue tracking timeline system
* ⬆️ Upvote system with restrictions
* 💳 Payment integration for:

  * Issue priority boost
  * Premium subscription
* 📱 Fully responsive design (Mobile, Tablet, Desktop)
* 🔎 Search and filter issues
* 📄 Pagination support
* 🌙 Dark/Light theme support
* 🔔 Toast & alert notifications
* 🔒 Secure environment variable protection

---

## 🧰 Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* DaisyUI
* TanStack Query
* Axios
* React Hook Form
* Firebase Authentication
* JWT

### Backend

* Node.js
* Express.js
* MongoDB
* Firebase Admin SDK
* JWT Authentication
* Stripe Payment Integration

### Deployment

* Client: Firebase Hosting
* Server: Vercel
* Database: MongoDB Atlas

---

## 🖼️ System Architecture

```
Client (React)
   ↓
REST API (Express.js)
   ↓
MongoDB Database
   ↓
Authentication (Firebase + JWT)
```

---

## 🔐 Authentication & Security

* Firebase Authentication for user login & registration
* JWT for secure API communication
* Role-based protected routes
* Environment variables for sensitive credentials
* Secure payment handling

---

## 📂 Project Structure

```
client/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── dashboard/
│   ├── routes/
│   ├── hooks/
│   ├── context/
│   ├── api/
│   └── layouts/
│
server/
│
├── routes/
├── middleware/
├── controllers/
├── config/
└── index.js
```

---

## ⚙️ Installation & Setup

### Clone Client

```
git clone https://github.com/Shefaul-22/Civic-Care-Client.git
cd Civic-Care-Client
npm install
npm run dev
```

### Clone Server

```
git clone https://github.com/Shefaul-22/Civic-Care-server.git
cd Civic-Care-server
npm install
npm start
```

---

## 🌐 Environment Variables

### Client (.env)

```
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

### Server (.env)

```
PORT=
DB_USER=
DB_PASS=
JWT_SECRET=
STRIPE_SECRET_KEY=
```

---

## 📈 Key Highlights

* Full-stack production-ready web application
* Real-world civic problem solving platform
* Secure authentication and authorization
* Payment and subscription system
* Advanced dashboard system
* Clean and scalable architecture
* Modern responsive UI/UX

---

## 🎯 Use Case

This platform can be used by:

* City Corporations
* Municipal Authorities
* Government Infrastructure Departments
* Smart City Projects

---

## 👨‍💻 Author

**Md Shefaul Karim**

* GitHub: [https://github.com/Shefaul-22](https://github.com/Shefaul-22)
* Role: Full Stack Web Developer

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, please consider giving it a star ⭐ on GitHub.
It helps increase visibility and motivates further development.

```

---
