# Employees-Management-System

A full-stack web application for managing company employees and branches. Built with:

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Express.js + MySQL
- **Authentication & Authorization:** JWT tokens with role-based access
- **State Management:** Redux Toolkit
- **Cache:** Redis (used for blacklisting tokens on logout)

---

## 🔗 GitHub Repository

[https://github.com/Bouaabdellah/Employees-Management-System](https://github.com/Bouaabdellah/Employees-Management-System)

---

## 📌 Features

### ✅ Common (for both Managers and Workers)
- **Home page**
- **Profile section**
  - Personal info: username, profile image, email, sex, birthdate
  - Work info: user ID, branch, manager, role, start date, salary
- **Update personal info**
- **Logout**

> Only managers can update work info (both for themselves and other normal workers).

---

### 👨‍💼 Additional Manager Features

#### 🔹 Manage Employees
- Search employees by:
  - First name
  - Last name
  - ID
  - Branch ID
  - Role ID
  - Manager
- Combine multiple search conditions
- View all employees
- Add a new employee
- Click employee from list → view their profile → update work info or delete them

#### 🔹 Manage Branches
- Search branches by name or ID
- View all branches
- Add new branch (requires: name, launch date, manager ID)
- Click branch → view its profile → edit or delete it

---

## 🔐 Authentication & Authorization

- JWT-based auth using **access** and **refresh tokens**
- Tokens are stored as **HTTP-only cookies**
- On logout:
  - Tokens are removed from cookies
  - Added to **Redis** to prevent reuse (blacklist) until expiration
- Role-based access control via middleware

---

## 🌐 CORS & Environment Configuration

- CORS enabled on the backend
- Environment variables used for secrets, port, and DB config

---

## 🧱 Code Structure

- **Backend:**
  - Modular Express routes and middleware
  - Reusable logic and token validation
- **Frontend:**
  - Reusable React components with Tailwind styling
  - Redux Toolkit for global state

---

## 🚀 Installation & Usage

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Bouaabdellah/Employees-Management-System.git
cd Employees-Management-System

### 🔧 Backend

cd backend
npm install
npm run dev


### 🔧 frontend

cd frontend
npm install
npm start
