# GrowGlobal – From Local Business to Global Brand
### A Responsive Digital Platform to Help Local Businesses Reach Global Customers

**Academic Course:** 25CS208 – Web Technology  
**Academic Year:** 2026–2027  
**Project Category:** Responsive Frontend Web Application  
**Design Standard:** Stripe / Linear / Framer inspired Modern SaaS Aesthetic  

---

## 🌟 Executive Overview & Identity

* **Project Name:** GrowGlobal
* **Project Title:** GrowGlobal – A Responsive Digital Platform to Help Local Businesses Reach Global Customers.
* **Tagline:** *From Local Business to Global Brand.*
* **Academic Course:** 25CS208 – Web Technology
* **Academic Year:** 2026–2027
* **Value Proposition:**
  > *"GrowGlobal helps businesses improve their digital visibility, attract potential customers and create more opportunities for revenue growth."*  
  *(Note: Transparent business practice; no guaranteed fixed profits).*

---

## 👥 Senior Engineering Team & Role Delegation

1. **Project Manager:** Architecture governance, milestone scheduling, and IEEE 830 compliance.
2. **Product Manager:** Business model formulation, package pricing tiers (₹4,999 / ₹9,999 / ₹14,999), and customer journey mapping.
3. **UI/UX Designer & Figma Engineer:** Design tokenization (`variables.css`), high-contrast dark/light mode palette, and micro-interactions.
4. **Frontend Developer:** Semantic HTML5 views, responsive CSS Grid and Flexbox layouts, and modular vanilla JavaScript ES6+ engineering.
5. **Quality Assurance Engineer:** 24-point test matrix, cross-browser compatibility verification, and zero-eval arithmetic validation.
6. **DevOps Engineer:** Repository configuration, clean path routing, and Vercel edge deployment setup (`vercel.json`).
7. **Security Analyst:** Regex enforcement, XSS mitigation, secure password representation, and form submission locks.

---

## 💻 Pure Technology Stack

In strict compliance with academic standards, **no heavyweight frontend frameworks (React, Angular, Vue, Next.js) or bloated libraries** are used. The platform runs smoothly on **VS Code Live Server**:

* **HTML5:** Clean, semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
* **CSS3:** Custom properties (CSS variables), modern CSS Grid (Desktop 3-column dashboard), and CSS Flexbox (Mobile layouts and UI components).
* **JavaScript (ES6+):** Modular scripts, DOM manipulation via `textContent`, arrow functions, classes, and async/await.
* **Storage & Persistence:** Client-side `localStorage` with automated data seeding and defensive error handling.
* **REST API Integration:** Asynchronous `fetch()` API for live foreign currency conversion with deterministic offline mock fallback.
* **Version Control & Hosting:** Git, GitHub repository, and Vercel cloud deployment.

---

## 📁 Project Architecture & Directory Structure

```
GrowGlobal/ (micro web/)
│
├── index.html                  # Main Marketing Landing Page
├── register.html               # Business Registration Gateway (Regex Validation)
├── signup.html                 # Quick Sign-Up Interface
├── signin.html                 # Sign-In Interface (Demo Auto-Fill)
├── home.html                   # Business Management Dashboard
├── vercel.json                 # Vercel Deployment Configuration
│
├── css/
│   ├── variables.css           # Design Tokens, Palette & Dark/Light Variables
│   ├── styles.css              # Core Components, Cards, Modals, Buttons, Forms
│   └── layout.css              # Grid Layouts, 3-Col Dashboard, Responsive Queries
│
├── js/
│   ├── app.js                  # Main App Controller, Toast Alerts & Modals
│   ├── validation.js           # Strict JavaScript Regex Validation Engine
│   ├── theme.js                # Dark/Light Mode Switcher & LocalStorage Sync
│   ├── calculator.js           # Safe JavaScript Calculator (No eval)
│   ├── chatbot.js              # Floating Assistant Chatbot (Keyword NLP)
│   ├── api.js                  # REST API Fetch & Multi-Currency Converter
│   └── storage.js              # LocalStorage Manager & Sample Data Seeder
│
├── assets/
│   ├── icons/                  # SVG Icons & Favicon
│   └── images/                 # Demonstration Graphics & Placeholders
│
├── docs/
│   ├── SRS.md                  # Detailed IEEE 830 Software Requirements Spec
│   ├── PROJECT_PROPOSAL.md     # Formal Commercial Project Proposal
│   ├── TESTING_REPORT.md       # Comprehensive QA Testing Matrix & Audit
│   └── README.md               # Documentation Suite Index
│
└── README.md                   # Master Documentation (This file)
```

---

## 🚀 Key Functional Modules

### 1. Landing Page (`index.html`)
* **Sticky Glassmorphic Navigation:** Responsive bar with dark/light mode toggle, logo, and mobile hamburger drawer.
* **Hero Section:** High-impact heading *"Take Your Business From Local to Global"* with live interactive preview card and dual CTA buttons.
* **Verified Demo Statistics:** 500+ businesses onboarded, 120% inquiry growth, 35+ global export markets.
* **Comprehensive Services:** 6 detailed cards covering web engineering, catalog showcase, chatbot, lead pipeline, safe calculator, and 2-year warranty.
* **Pricing Packages:**
  * **BASIC (₹4,999):** Professional single-page landing site, business info, contact form, mobile responsive.
  * **STANDARD (₹9,999 - Most Popular):** Multi-section website, 15-item product showcase, AI chatbot, multi-currency display, 2-year warranty.
  * **PREMIUM (₹14,999):** Complete business application, unlimited showcase, dashboard demo, technical SEO, priority support.
  * **Hourly Custom Rate:** ₹800/hour for bespoke engineering.
* **Currency Switcher:** Toggle pricing in INR (₹), USD ($), EUR (€), GBP (£), and AED using live `fetch()` API rates.
* **Sample Testimonials:** Realistic client case studies (weavers, spice exporters, brassware crafters).
* **Interactive FAQ Accordion:** Clean animated accordion answering top customer questions.
* **Inquiry Contact Form:** Real-time validated form saving leads directly to LocalStorage with toast feedback.

### 2. Business Registration (`register.html`)
Strict client-side JavaScript regex validation with real-time feedback:
* **Full Name:** `/^[a-zA-Z\s]{2,50}$/`
* **Employee / Register ID:** `/^[A-Z0-9]{6,12}$/i`
* **Email Address:** `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
* **Mobile Number:** `/^[6-9]\d{9}$/`
* **Division:** Mandatory dropdown selection.
* **Password:** Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special symbol (`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/`).
* **Confirm Password:** Strict equality match.
* **Visual States:** Red borders (`is-invalid`) with inline error messages; green borders (`is-valid`) upon success; submit button remains disabled until 100% valid.
* **Password Utilities:** Show/hide toggle and dynamic 3-stage strength meter bar.

### 3. Sign-In & Sign-Up (`signin.html`, `signup.html`)
* Password visibility toggle button.
* Remember-me checkbox and forgot password modal.
* **1-Click Auto-Fill Demo Credentials:** Evaluators can click a pill to instantly populate test credentials:
  * **Email:** `demo@growglobal.com`
  * **Password:** `GrowGlobal@2026`
* Direct guest demo launch link.

### 4. Business Dashboard (`home.html`)
* **Desktop Layout:** 3-column CSS Grid (Sidebar navigation, center KPIs/products/inquiries/traffic, right profile/calculator/activity log).
* **Mobile Layout:** Single-column Flexbox layout with responsive sliding sidebar drawer.
* **Interactive Products Table:** View showcase products, add new products via modal dialog, delete products with instant LocalStorage sync.
* **Customer Inquiries Pipeline:** Review customer leads, view full message payloads, and check status badges.
* **Visual Analytics:** CSS progress bar breakdown of international traffic sources.
* **Integrated Project Calculator:** Embedded safe calculator for computing custom ₹800/hr quotes.

### 5. Floating Assistant Chatbot (`js/chatbot.js`)
* Floating trigger button at bottom-right corner.
* Context-aware keyword matching answering queries about services, pricing, standard package inclusions, mobile responsiveness, and contact channels.
* Clickable quick-question chips, simulated typing indicator (550ms delay), safe `textContent` rendering, and auto-scroll.

### 6. Safe JavaScript Calculator (`js/calculator.js`)
* Interactive keypad (digits 0–9, $+$, $-$, $\times$, $\div$, decimal, clear, backspace, equals).
* **Zero `eval()` execution:** Employs safe state-machine arithmetic.
* **Zero Division Guard:** Displays `Error: Division by zero`.
* Preset rate chips for quick computation at ₹800/hr (5 hrs = ₹4,000; 10 hrs = ₹8,000; 20 hrs = ₹16,000).

---

## 🛠️ How to Run Locally

### Method 1: VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Click **File &rarr; Open Folder...** and select `E:\WEB TECH\micro web` (or the folder containing `index.html`).
3. Right-click `index.html` in the explorer and select **"Open with Live Server"**.
4. The website will open automatically at `http://127.0.0.1:5500/index.html`.

### Method 2: Direct Browser Launch
* Double-click `index.html` directly to open it in Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## 🌐 Git, GitHub & Vercel Deployment Instructions

### Step 1: Initialize Git Locally
Open PowerShell or Terminal in the project root:
```powershell
cd "E:\WEB TECH\micro web"
git init
git add .
git commit -m "feat: initial commit for GrowGlobal 25CS208 Web Technology microproject"
```

### Step 2: Push to GitHub
1. Create a new repository named `GrowGlobal-WebTech` on GitHub.
2. Link your local repository and push:
```powershell
git remote add origin https://github.com/<your-username>/GrowGlobal-WebTech.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Navigate to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New Project"** &rarr; **"Import Git Repository"**.
3. Select `GrowGlobal-WebTech`.
4. Framework Preset: Leave as **Other** (Static Site).
5. Root Directory: `./`
6. Click **Deploy**. Vercel will deploy the static site globally with free HTTPS SSL.

---

## 📋 Academic Evaluation Deliverables (25CS208)

### 1. IA-3 Evaluation Checklist
- [x] Semantic HTML5 structure across 5 distinct pages.
- [x] Responsive design for Desktop (1440px+), Laptop (1024px), Tablet (768px), and Mobile (375px+).
- [x] Modern CSS3 Flexbox and CSS Grid layout engines.
- [x] Complex JavaScript regex validation on `register.html`.
- [x] Modular client-side storage via `localStorage`.
- [x] Interactive floating chatbot with NLP keyword response engine.
- [x] Zero-eval JavaScript arithmetic calculator.
- [x] Dynamic multi-currency REST API integration with `fetch()`.
- [x] High-contrast Dark and Light mode theme toggle.
- [x] IEEE 830 SRS, Project Proposal, and QA Testing reports in `/docs`.

### 2. Five-Slide Presentation Outline
* **Slide 1 – Title & Identity:** GrowGlobal: From Local Business to Global Brand. Problem statement & 25CS208 course details.
* **Slide 2 – Problem & Solution:** High SaaS costs vs. GrowGlobal's accessible, responsive digital enablement for regional artisans.
* **Slide 3 – System Architecture & Tech Stack:** Clean separation of concerns (HTML5, CSS Grid/Flexbox, ES6+ JS, LocalStorage, fetch API).
* **Slide 4 – Core Interactive Features:** Live demonstration of regex validation, floating chatbot assistant, and safe calculator.
* **Slide 5 – Commercial Viability & Summary:** Pricing tiers (Basic ₹4,999, Standard ₹9,999, Premium ₹14,999, ₹800/hr rate), 2-year warranty, and Lighthouse 95+ score.

### 3. Video Demonstration Script (3 to 5 Minutes)
1. **0:00 - 0:45 (Introduction):** State project name, tagline, team roles, and mission.
2. **0:45 - 1:45 (Landing Page Tour):** Showcase hero section, dark/light theme switch, multi-currency converter, packages, and FAQ accordion.
3. **1:45 - 2:45 (Registration & Validation):** Demonstrate real-time regex feedback on invalid vs valid inputs, password strength meter, and disabled submit button.
4. **2:45 - 3:45 (Dashboard & Storage):** Sign in to dashboard, show 3-column CSS Grid, add a new product to catalog, view customer inquiry, and test calculator.
5. **3:45 - 4:30 (Chatbot & Conclusion):** Open floating chatbot, ask pricing questions, summarize 2-year warranty and academic takeaways.

---

## 🛡️ Technical Warranty & Commercial Terms

* **Two-Year Technical Maintenance Warranty:** All standard and premium websites include a 2-year warranty covering agreed functionality defects and browser compatibility patches.
* **Commercial Profit Disclaimer:** GrowGlobal enhances digital visibility and inquiry generation; it explicitly does not guarantee fixed commercial revenues or profits.
* **Commercial Baseline Rate:** ₹800 per developer hour for custom modules.

---

*© 2026–2027 GrowGlobal Development Team. Department of Computer Science & Engineering. Academic Course 25CS208 – Web Technology.*
