# شِفَاء — Shifaa 🏥
### Arabic Digital Health Platform

<p align="center">
  <img src="https://img.shields.io/badge/Language-Arabic%20RTL-teal?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker" />
</p>

<p align="center">
  <strong>Book doctors · Track your health · Never miss a medication</strong><br/>
  A full-featured Arabic RTL digital health platform with subscription bundles, medication reminders, period tracking, and more.
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Subscription Bundles](#-subscription-bundles)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Docker Setup](#-docker-setup)
- [Pages](#-pages)
- [Data Model](#-data-model)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Shifaa (شِفَاء)** is a comprehensive Arabic-first digital health platform built with React and Vite. It enables users to find and book doctors, track their daily physical and mental health, manage medications with smart popup reminders, and monitor women's reproductive health — all in a fully RTL Arabic interface.

> The name **شِفَاء** means *healing* and *wellness* in Arabic.

---

## ✨ Features

### 🩺 Doctor Booking
- Browse 8+ specialist doctors with ratings, prices, and availability
- Live search and filter by specialty, rating, price, and doctor gender
- Gender-aware specialty tabs (women's / men's / shared specialties)
- Booking modal with date picker, time slots, and appointment type selection
- Automatic health data attachment when booking (based on subscription tier)

### 📊 Health Tracking
- **Physical Health Block** — daily symptoms, pain level slider, sleep hours, activity level, chronic diseases (Premium+), last checkup date
- **Mental Health Block** — mood emoji tracker, stress slider, sleep quality, anxiety toggle, personal notes
- All questions are optional — users answer only what they want
- Data auto-saved to localStorage and sent to doctor on booking

### 💊 Medication Reminder *(Plus and above)*
- Add medications with name, frequency (1–4x/day), duration, and custom times
- Real-time popup notifications at exact medication times
- "Snooze 10 minutes" functionality
- Edit and delete medications with confirmation

### 🌸 Women's Health
- **Period Tracker** — input last period date, auto-calculate:
  - 8-day period window (highlighted in rose)
  - Ovulation window days 11–16 (highlighted in teal)
  - Next period date (28-day cycle)
  - Full color-coded monthly calendar
- **Pregnancy Tracker** — input LMP date, auto-calculate:
  - Current pregnancy week
  - Trimester (1st / 2nd / 3rd)
  - Estimated due date
  - Weekly milestone cards (40 weeks coverage)
  - Progress bar

### 🔔 Smart Popup System
- Medicine reminders fire at exact scheduled times (checked every 60 seconds)
- Appointment reminders fire 60 minutes before booked appointments
- Both popups run globally across all pages

### 💳 Subscription & Payment
- 4-tier bundle system with feature gating
- Dummy credit card payment form with full validation
- Auto-format card number (XXXX XXXX XXXX XXXX) and expiry (MM/YY)
- Success animation and auto-redirect after payment

---

## 💎 Subscription Bundles

| Feature | ⚪ Essential | 🔵 Plus | 🟣 Premium | 🔴 Ultimate |
|---|:---:|:---:|:---:|:---:|
| Browse & book doctors | ✅ | ✅ | ✅ | ✅ |
| Health tracking | ✅ | ✅ | ✅ | ✅ |
| Period & pregnancy tracking | ✅ | ✅ | ✅ | ✅ |
| Medication reminders | ❌ | ✅ | ✅ | ✅ |
| Online consultations | ❌ | 1/mo | 3/mo | Unlimited |
| Chronic disease dashboard | ❌ | ❌ | ✅ | ✅ |
| AI symptom analysis | ❌ | ❌ | ✅ | ✅ |
| Personalized nutrition tips | ❌ | ❌ | ✅ | ✅ |
| Monthly therapy session | ❌ | ❌ | ❌ | ✅ |
| 24/7 chat support | ❌ | ❌ | ❌ | ✅ |
| **Price** | **Free** | **49 EGP/mo** | **99 EGP/mo** | **199 EGP/mo** |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Font | Cairo (Google Fonts) |
| Storage | localStorage (no backend) |
| Containerization | Docker + Docker Compose |
| Production Server | Nginx (Alpine) |
| Language | Arabic RTL |

---

## 📁 Project Structure

```
shifa/
├── 🐳 Dockerfile              # Multi-stage build (node → nginx)
├── 🐳 docker-compose.yml      # Dev (port 5173) + Prod (port 8080)
├── 🐳 nginx.conf              # SPA fallback + gzip + asset caching
├── 🐳 .dockerignore
├── 📦 package.json
├── ⚙️  vite.config.js          # Host 0.0.0.0 + polling for Docker
├── ⚙️  tailwind.config.js
├── ⚙️  postcss.config.js
├── 📄 index.html              # lang="ar" dir="rtl" + Cairo font
└── src/
    ├── main.jsx
    ├── App.jsx                # Router + global popup system
    ├── index.css              # Tailwind + custom animations
    ├── pages/
    │   ├── Home.jsx           # Hero, gender select, services, bundles, contact
    │   ├── Doctors.jsx        # Filter, doctor cards, booking modal
    │   ├── Health.jsx         # Physical + mental health questionnaire
    │   ├── WomensHealth.jsx   # Period tracker + pregnancy tracker
    │   ├── Medications.jsx    # Add/edit/delete meds (Plus+ only)
    │   └── Payment.jsx        # Bundle payment form
    ├── components/
    │   ├── Navbar.jsx         # Fixed nav + mobile hamburger + bottom nav
    │   ├── BundleGuard.jsx    # Blur overlay for locked features
    │   ├── Toast.jsx          # Auto-dismiss notification
    │   ├── MedPopup.jsx       # Medicine reminder popup
    │   ├── ApptPopup.jsx      # Appointment reminder popup
    │   ├── BookingModal.jsx   # Doctor booking flow
    │   └── DoctorCard.jsx     # Doctor info card
    ├── hooks/
    │   ├── useLocalStorage.js # Typed localStorage hook
    │   ├── useBundle.js       # Bundle access control helpers
    │   └── usePopupReminder.js# Global reminder interval logic
    └── utils/
        ├── bundleConfig.js    # Bundle definitions + hasAccess()
        └── dateHelpers.js     # Date math + pregnancy milestones
```

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started) and Docker Compose installed
- OR Node.js 20+ for local development without Docker

### Option A — Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shifaa.git
cd shifaa

# 2. Start development server with hot reload
docker-compose up dev

# App is live at → http://localhost:5173
```

```bash
# Build and run production version
docker-compose up prod --build

# Production build is live at → http://localhost:8080
```

### Option B — Local (without Docker)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shifaa.git
cd shifaa

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# App is live at → http://localhost:5173
```

---

## 🐳 Docker Setup

The project includes a full Docker workflow for both development and production:

### Development Container (`shifa-dev`)
- Based on `node:20-alpine`
- Mounts source files as a volume for **live hot reload**
- Runs `vite --host 0.0.0.0` so the port is accessible from the host
- Uses `usePolling: true` in Vite config for filesystem watch inside Docker

### Production Container (`shifa-prod`)
- Multi-stage build — Node builds the app, Nginx serves it
- Based on `nginx:alpine` — extremely lightweight
- Includes SPA route fallback (`try_files $uri /index.html`)
- Gzip compression enabled for all JS/CSS/HTML assets
- Static assets cached for 1 year

### Useful Docker Commands

```bash
# Start dev with live logs
docker-compose up dev

# Start prod build
docker-compose up prod --build

# Rebuild everything from scratch
docker-compose down && docker-compose up --build

# Follow live logs
docker-compose logs -f dev

# Open a shell inside the dev container
docker exec -it shifa-dev sh

# Stop all containers
docker-compose down
```

### Debug localStorage from browser console

```javascript
// View all Shifaa data
Object.entries(localStorage)
  .filter(([k]) => k.startsWith('shifa'))
  .forEach(([k, v]) => console.log(k, JSON.parse(v)))

// Reset all data
Object.keys(localStorage)
  .filter(k => k.startsWith('shifa'))
  .forEach(k => localStorage.removeItem(k))

// Simulate a Plus subscription
localStorage.setItem('shifa_bundle', '"plus"')
location.reload()
```

---

## 📄 Pages

| Route | Page | Description |
|---|---|---|
| `/` | الرئيسية Home | Hero, gender selector, services overview, bundles banner, contact |
| `/doctors` | الأطباء Doctors | Search, filter, doctor cards, booking modal |
| `/health` | صحتي Health | Physical + mental health questionnaire |
| `/womens-health` | صحة المرأة Women's Health | Period tracker, ovulation calendar, pregnancy tracker |
| `/medications` | الأدوية Medications | Add medications, view schedule, popup reminders *(Plus+)* |
| `/payment` | الدفع Payment | Credit card form, bundle upgrade |

---

## 🗄 Data Model

All data is stored in the browser's `localStorage` with no backend required:

```javascript
// User profile
shifa_user      → { name, email, gender, age }

// Active subscription bundle
shifa_bundle    → "essential" | "plus" | "premium" | "ultimate"

// Health questionnaire answers
shifa_health    → {
  physical: { symptoms[], painLevel, sleepHours, activity, chronicDiseases[], lastCheckup, currentMeds },
  mental:   { mood, stressLevel, sleepQuality, hasAnxiety, notes },
  lastUpdated: "ISO date string"
}

// Saved medications
shifa_meds      → [{ id, name, timesPerDay, durationMonths, times[], notes, status }]

// Booked appointments
shifa_appts     → [{ id, doctorName, specialty, dateTime, status }]

// Period tracking
shifa_period    → { lastPeriodStart: "ISO date", cycleHistory: ["ISO date", ...] }

// Pregnancy tracking
shifa_pregnancy → { lmpDate: "ISO date" }
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Primary | `#0D9488` | Buttons, links, active states |
| Women's | `#FB7185` | Women's health section accent |
| Success | `#10B981` | Confirmations, active badges |
| Warning | `#F59E0B` | Alerts, pending states |
| Background | `#F8FAFC` | Page background |
| Text Primary | `#1E293B` | Main text |
| Text Secondary | `#64748B` | Labels, placeholders |
| Font | Cairo | All Arabic text |

---

## 🌍 Localization

This project is **Arabic-first**:
- `lang="ar"` and `dir="rtl"` set on the HTML root
- All UI text, labels, placeholders, and messages are in Arabic
- Date formatting uses `ar-EG` locale
- Cairo font (Google Fonts) optimized for Arabic readability
- Line height `1.8` for comfortable Arabic reading

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature description"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

### Commit Convention
```
feat:     New feature
fix:      Bug fix
style:    UI/design changes
refactor: Code refactoring
docs:     Documentation updates
chore:    Build/config changes
```

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ for Arabic-speaking users across the MENA region.

> **شِفَاء** — *"And when I am ill, it is He who cures me"* — Quran 26:80

---

<p align="center">
  <sub>Made with React + Vite + Tailwind + Docker · Full Arabic RTL · No backend required</sub>
</p>
