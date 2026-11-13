# Software Requirements Specification (SRS)
## GrowGlobal – A Responsive Digital Platform to Help Local Businesses Reach Global Customers

**Document Reference:** IEEE 830-1998 Compliant Specification  
**Academic Course:** 25CS208 – Web Technology  
**Academic Year:** 2026–2027  
**Version:** 1.0.0  
**Status:** Approved for Implementation & IA-3 Evaluation  

---

## 1. Introduction

### 1.1 Purpose
The purpose of this Software Requirements Specification (SRS) document is to establish a rigorous, formal specification of the functional, non-functional, security, and interface requirements for **GrowGlobal**. This document serves as the single source of truth for software engineers, designers, quality assurance testers, and academic evaluators participating in the 25CS208 Web Technology microproject curriculum.

### 1.2 Tagline & Mission
* **Tagline:** *From Local Business to Global Brand.*
* **Mission:** To empower local artisans, traditional manufacturers, independent boutique owners, and micro-entrepreneurs by bridging the digital divide through clean, responsive, high-performance web technology.

---

## 2. Problem Statement & Scope

### 2.1 Problem Statement
Many small businesses, local shop owners, regional artisans, and creators possess unique, export-quality products but remain severely constrained within regional geographic confines. Traditional marketing is localized, expensive, and unable to capture international consumer interest. Most existing commercial SaaS platforms are prohibitively expensive, technically complex, or feature heavy runtime overheads unsuitable for lightweight digital onboarding.

### 2.2 Proposed Solution
**GrowGlobal** provides a responsive, modern frontend web platform that enables local businesses to establish a high-credibility digital identity. The system includes:
- A responsive marketing landing page with Stripe/Linear-inspired SaaS aesthetics.
- An interactive digital product showcase with live multi-currency price estimation (INR, USD, EUR, GBP, AED).
- A rigorous, regex-validated business onboarding and registration gateway.
- An integrated 24/7 conversational AI assistant chatbot.
- An interactive, zero-eval project cost calculator.
- A centralized business management dashboard for tracking visitor traffic, catalog items, and international inquiries.

---

## 3. Intended Audience & Stakeholders

1. **Local Business Owners & Artisans:** Primary end users seeking to establish a digital footprint and receive international business inquiries.
2. **Global Prospective Customers:** International buyers and domestic consumers browsing artisanal catalogs and submitting inquiries.
3. **Course Instructors & Evaluators (25CS208):** Academic supervisors assessing mastery of HTML5 semantic structure, modern CSS3 layout engines (Grid & Flexbox), client-side DOM manipulation, state persistence via LocalStorage, asynchronous REST API handling, and security fundamentals.
4. **DevOps & QA Engineers:** Personnel validating cross-browser compliance, performance benchmarks, and automated Vercel/GitHub deployments.

---

## 4. Overall System Description & Architecture

### 4.1 System Architectural Perspective
GrowGlobal is architectured as a modular, responsive frontend web application following the classic separation of concerns:
- **Presentation Layer (HTML5 & CSS3):** Semantic markup, custom CSS properties for design tokenization (`css/variables.css`), core component styles (`css/styles.css`), and responsive grid/flexbox layouts (`css/layout.css`).
- **Logic & Interaction Layer (Vanilla JavaScript ES6+):** Modular scripts handling client-side state, form validations, arithmetic computations, simulated NLP keyword matching, and asynchronous network requests (`js/*.js`).
- **Persistence Layer (Browser LocalStorage):** Client-side storage for business credentials, active session tokens, product catalog additions, customer inquiries, and theme preferences.
- **External Integration Layer:** REST API integration via the asynchronous `fetch()` API querying live exchange rates with deterministic offline fallback.

```
+-------------------------------------------------------------------------+
|                           BROWSER VIEWPORT                              |
|   (Desktop 1440px+ | Laptop 1024px | Tablet 768px | Mobile 375px+)      |
+-------------------------------------------------------------------------+
|                           PRESENTATION TIER                             |
|  index.html | register.html | signup.html | signin.html | home.html     |
|      css/variables.css  |  css/styles.css  |  css/layout.css            |
+-------------------------------------------------------------------------+
|                           CONTROLLER TIER                               |
|   theme.js   | validation.js | calculator.js | chatbot.js | app.js      |
+-------------------------------------------------------------------------+
|                     DATA & INTEGRATION TIER                             |
|          storage.js (LocalStorage)  |  api.js (fetch API REST)          |
+-------------------------------------------------------------------------+
```

---

## 5. Functional Requirements (FR-01 to FR-08)

### FR-01: Responsive Multi-Page Navigation & Visual System
* The system shall provide consistent, sticky, glassmorphic navigation across all pages (`index.html`, `register.html`, `signup.html`, `signin.html`, `home.html`).
* On viewports $\le 768\text{px}$, the navigation shall transform into a sliding mobile drawer activated by an accessible hamburger button with animated state transitions.
* The system shall include an instantaneous Light/Dark theme toggle with CSS custom properties and LocalStorage persistence.

### FR-02: Strict Client-Side Regex Registration Engine
* The system shall validate registration inputs in real time using the following regular expressions:
  - **Full Name:** `/^[a-zA-Z\s]{2,50}$/`
  - **Employee / Register ID:** `/^[A-Z0-9]{6,12}$/i`
  - **Email Address:** `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
  - **Mobile Number:** `/^[6-9]\d{9}$/`
  - **Division:** Mandatory dropdown selection.
  - **Password:** `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/`
  - **Confirm Password:** Strict equality match with Password.
* Visual indicators must dynamically apply `.is-valid` (green border) or `.is-invalid` (red border with inline textual feedback).
* The form submission button must remain disabled until 100% of the input fields satisfy validity criteria.

### FR-03: Quick Sign-Up & Sign-In Verification
* The system shall provide streamlined authentication interfaces with password visibility toggling.
* The sign-in form shall verify credentials against LocalStorage or provide immediate auto-fill capability for evaluators (`demo@growglobal.com` / `GrowGlobal@2026`).
* Clear architectural disclaimers must inform users that production deployments require server-side salted hashing.

### FR-04: Business Dashboard & Catalog Management
* The dashboard (`home.html`) shall display high-level KPI metric cards (Store Visitors, Inquiries Received, Active Products, Pipeline Value).
* On desktop viewports ($\ge 1024\text{px}$), the dashboard shall render as a 3-column CSS Grid. On mobile viewports, it shall reflow into a single-column Flexbox layout with a sliding drawer.
* The user shall be capable of creating and deleting product showcase items via modal dialogs, updating the LocalStorage catalog immediately.

### FR-05: Real-Time Customer Inquiries Capture
* Public visitors shall be able to submit inquiries from the landing page contact form or custom bundle modal.
* Submissions shall be sanitized and stored in the LocalStorage inquiry pipeline, generating toast notifications and reflecting on the business dashboard.

### FR-06: Autonomous Conversational Assistant Chatbot
* The application shall inject a persistent, floating chatbot trigger button at the bottom-right corner (`js/chatbot.js`).
* The chatbot shall employ keyword matching to answer queries regarding GrowGlobal mission, packages (Basic ₹4,999, Standard ₹9,999, Premium ₹14,999), custom rates (₹800/hr), and contact channels.
* Interactions must feature safe DOM manipulation (`textContent`), simulated typing latency, and clickable FAQ chips.

### FR-07: Interactive Safe JavaScript Calculator
* The platform shall feature an interactive arithmetic calculator (`js/calculator.js`) supporting digits 0–9, basic arithmetic ($+$, $-$, $\times$, $\div$), decimal inputs, clear, and backspace.
* The arithmetic evaluation engine must **strictly avoid `eval()`** or `new Function()`, executing safe arithmetic and intercepting division by zero with `Error: Division by zero`.
* The engine shall also compute custom hourly development packages at the baseline rate of ₹800/hour.

### FR-08: REST API Currency Conversion & Fallback Engine
* The system shall asynchronously request live foreign exchange rates using `fetch()` (`js/api.js`).
* The system shall dynamically calculate equivalent package pricing in USD, EUR, GBP, and AED.
* If external network calls are blocked or offline, the system shall seamlessly fall back to deterministic cached exchange rates without throwing unhandled exceptions.

---

## 6. Non-Functional Requirements

### 6.1 Performance Requirements
* Initial page load time must not exceed 1.5 seconds on standard 4G networks.
* Lighthouse Performance audit score target: $\ge 90/100$.
* Zero external CSS framework dependencies (e.g., Bootstrap, Tailwind CDN) to prevent bloated payload transfers.

### 6.2 Usability & Accessibility (WCAG 2.1 AA)
* Contrast ratios between text and background colors must achieve at least 4.5:1 in both light and dark themes.
* Interactive tap targets on mobile screens must measure at least $44 \times 44\text{px}$.
* Screen reader accessible attributes (`aria-label`, `aria-expanded`, `role`) must be implemented on buttons, modal dialogs, and drawers.

### 6.3 Security & Safe Data Handling
* All user input rendered onto DOM trees must utilize `textContent` or sanitized DOM node insertion to mitigate Cross-Site Scripting (XSS).
* Plaintext passwords shall not be recorded in browser storage; simulated non-plaintext representations are generated via Web Crypto API.
* Form submissions shall be protected against accidental multi-clicks via automatic button disabling upon submission.

### 6.4 Maintainability & Modularity
* Codebase strictly adheres to separation of concerns: HTML provides structure, CSS dictates presentation, and JS coordinates behavior.
* CSS custom properties are centralized in `variables.css`.

---

## 7. Cost Estimation & Commercial Proposal

For commercial feasibility analysis within the Web Technology curriculum:

| Item Description | Quantity / Scope | Unit Rate | Total Amount (INR) |
|---|---|---|---|
| Frontend Engineering & UI Design | 72 Working Hours | ₹800 / hour | ₹57,600 |
| Domain Registration (.in / .com) | 1 Year Tier | ₹1,200 / year | ₹1,200 |
| High-Speed Static Edge Hosting | Vercel / GitHub Pages | Free Tier Baseline | ₹0 |
| **Total Estimated Initial Investment** | — | — | **₹58,800** |

*Note: Custom feature bundles beyond initial delivery are billed at the standard rate of ₹800 per developer hour.*

---

## 8. Two-Year Technical Maintenance Warranty Agreement

GrowGlobal includes a comprehensive **Two-Year Technical Maintenance Warranty** commencing from the formal delivery date.

### 8.1 In-Scope Coverage
1. Correction of verified defects or errors in agreed core website functionalities.
2. Cross-browser layout compatibility updates for updated versions of Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge.
3. Bug remediation within the safe calculator, regex validation engines, and chatbot assistant scripts.

### 8.2 Exclusions & Limitations
1. Development of brand-new pages, redesigns, or features not specified in this original SRS.
2. Third-party network API outages, registrar domain expirations, or host provider outages.
3. Code corruption resulting from client-side modifications, third-party plugin injections, or unauthorized script modifications.
4. **Commercial Profit Disclaimer:** GrowGlobal assists businesses in improving digital visibility and inquiry potential; the warranty explicitly **does not promise or guarantee fixed business revenue, sales quotas, or profits**.

---

## 9. Verification & Acceptance Criteria

The system shall be accepted for evaluation when:
1. All 5 primary HTML pages (`index.html`, `register.html`, `signup.html`, `signin.html`, `home.html`) load cleanly without 404 or console errors.
2. The registration form blocks invalid submissions and enables only upon passing all 7 regex tests.
3. The chatbot assistant reliably responds to all keyword inquiries and chip clicks.
4. The calculator evaluates arithmetic expressions without `eval()` and detects zero division.
5. The dashboard accurately manages product entries and customer inquiries with LocalStorage synchronization.
6. The entire project runs immediately via VS Code Live Server.
