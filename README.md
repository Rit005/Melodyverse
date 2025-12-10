# Infloso Assignment – Full-Stack Authentication System (MelodyVerse Theme)

This project is a **Full-Stack Authentication System** created as part of the **Infloso Developer Assignment**.  
It features **secure user Signup, Login, JWT-based authentication, protected routes**, and a modern **React UI (MelodyVerse Theme)**.

Users can create an account, login, and access protected content only after successful authentication.

---

## 🚀 Tech Stack

### 🖥 Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- LocalStorage / SessionStorage
- (Optional) Framer Motion, styled-components, Redux Toolkit

### 🖧 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- bcrypt hashing
- dotenv
- CORS
- (Optional) supertest (API testing)

---

## ✨ Core Features

### 🔐 Authentication
- Signup (username, email, password)
- Login (email, password)
- Confirm password logic
- Secure bcrypt password hashing
- JWT generation with expiration
- Token stored on the client (local/session storage)

### 🛡 Security
- Unique username and email enforcement
- Node.js JWT token generation
- Token expiration (default `7 days`)
- Custom Express middleware to protect routes
- Form and server-side validation

### 🎨 UI/UX – MelodyVerse Theme
- Responsive UI with Tailwind CSS
- Modern design inspired by music apps
- Form validation + error messages
- Terms & conditions checkbox
- “Remember Me” option
- Simulated welcome email notification

---



The following extra features are planned or can be added to improve real-world functionality:

- 🔄 Password reset flow (email/token)
- 📧 Email verification during signup
- 🛡 API rate limiting (prevent brute force attacks)
- 🟢 Middleware-based role authorization (admin/user)
- 🧪 Unit tests for API (Jest + Supertest)
- 👁 Password visibility toggle on input fields
- ✨ UI animations using Framer Motion
- ♿ Accessibility features (ARIA, keyboard navigation)
- 🧪 Unit testing React components (Jest + RTL)

> This is a sample assignment, and creativity is encouraged.  
> Additional styling libraries like `styled-components` or state management using `Redux Toolkit` can be used.

---

# 🧂 Error Handling & Edge Cases

### Server Handling
- Missing fields return **400 Bad Request**
- Email already exists → **409 Conflict / 400 Bad Request**
- Invalid credentials → **400 Bad Request**
- Expired token → **401 Unauthorized**
- No token → **401 Unauthorized**
- Unexpected server errors → **500 Internal Server Error**

### Input Validation
- Empty username/email/password blocked
- Password length (`>=6`) enforced
- Passwords must match
- Valid email format via RegEx
- Terms & Conditions required

All errors return a **JSON response** with a **descriptive message**:

```json
{ "message": "User already exists" }

🧪 How to Run & Test the API

git clone https://github.com/Rit005/infloso_assignment.git
cd infloso_assignment/backend && npm install && npm run dev
# open new terminal
cd infloso_assignment/frontend && npm install && npm run dev

