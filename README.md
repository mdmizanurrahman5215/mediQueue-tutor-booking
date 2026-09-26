# 📚 MediQueue – Tutor Booking System

[![Live Site](https://img.shields.io/badge/Live%20Demo-MediQueue-blue?style=for-the-badge&logo=vercel)](https://your-live-site-url.vercel.app)
[![Client Repo](https://img.shields.io/badge/GitHub-Client%20Repository-black?style=for-the-badge&logo=github)](https://github.com/your-username/mediqueue-client)
[![Server Repo](https://img.shields.io/badge/GitHub-Server%20Repository-green?style=for-the-badge&logo=github)](https://github.com/your-username/mediqueue-server)

MediQueue is a modern, full-stack web application designed to simplify online tutor discovery and session management. Students can seamlessly browse verified tutors, search by subject or date range, and book real-time learning sessions. Tutors can manage their availability, schedules, and active listings through an intuitive dashboard.

---

## 🌟 Key Features

- **🔐 Secure JWT & Google Authentication:** Full authentication flow supporting Email/Password with strength validation (uppercase, lowercase, 6+ characters) and 1-click Google OAuth login paired with JWT token management on private routes.
- **⚡ Real-Time Booking & Automated Slot Management:** Interactive session booking with validation against session launch dates and dynamic total slot updates ($limit aggregation and atomic slot decrements).
- **🔍 Smart Search & Date Filtering:** Search tutors by name using case-insensitive MongoDB `$regex` pattern matching and filter listings by availability windows via `$gte` and `$lte` operators.
- **🌓 Light / Dark Theme Toggle:** Persistent theme switching available across the entire site for an optimized visual experience in any environment.
- **📊 Comprehensive User Dashboard:** Private management portals ("My Tutors" & "My Booked Sessions") providing full CRUD capabilities with confirmation modals, real-time table state updates, and status toggles.
- **🎯 Dynamic Routing & Custom UX:** Route-based dynamic document titles, smooth toast notifications, custom loading state spinners, and a dedicated 404 page.

---

## 🛠️ Tech Stack & Dependencies

### **Client Side**
- **Framework:** React.js / Vite
- **Styling & Components:** Tailwind CSS, DaisyUI / Flowbite / Tailwind components
- **Routing:** React Router DOM (v6)
- **Icons & Animations:** Lucide React / React Icons, Framer Motion
- **Form Helpers & Utilities:** React Datepicker, SweetAlert2 / React Hot Toast, Axios

### **Server Side**
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Native Driver
- **Authentication:** JSON Web Tokens (`jsonwebtoken`), Firebase Admin / OAuth integrations
- **Environment Management:** `dotenv`, `cors`

---

## 🚀 Getting Started Locally

Follow these steps to set up and run MediQueue locally on your machine.

### **1. Clone the Repositories**

```bash
# Clone the client-side repository
git clone [https://github.com/your-username/mediqueue-client.git](https://github.com/your-username/mediqueue-client.git)

# Clone the server-side repository
git clone [https://github.com/your-username/mediqueue-server.git](https://github.com/your-username/mediqueue-server.git)
