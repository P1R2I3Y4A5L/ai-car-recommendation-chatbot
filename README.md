# 🚗 AutoMind AI — Intelligent Car Recommendation Chatbot

> A modern, premium automotive technology frontend architecture built to help car buyers find their ideal vehicle based on budget, lifestyle, family needs, and safety standards through an AI-powered conversational recommendation experience.

![Status: Phase 1 Completed](https://img.shields.io/badge/Status-Phase%201%20Completed-emerald)
![Architecture: Zero--Build ESM + Tailwind](https://img.shields.io/badge/Architecture-ESM%20%2B%20Tailwind%203.4-blue)
![Backend Ready: Abstracted Service Layer](https://img.shields.io/badge/Backend%20Ready-Abstracted%20Services-cyan)

---

## ⚡ Quick Start (Running Locally)

To launch the web application on your local machine:

### Option 1: One-Click Windows Batch Runner
Double-click:
```bat
run_app.bat
```

### Option 2: Python HTTP Server Runner
In PowerShell or Command Prompt, run:
```bash
py run_app.py
# or
python run_app.py
```
This automatically boots a local HTTP server and opens your default browser at **`http://localhost:3000`**.

---

## 🌟 Key Application Highlights

* **Automotive Tech Design System**: Custom carbon slate palette, electric cyan & indigo accents, high-contrast typography (*Plus Jakarta Sans* and *Space Grotesk*), and subtle cubic-bezier animations.
* **Dual-Pane AI Chatbot Experience**:
  * **Left Side**: Dynamic conversational interface with step-by-step guidance, quick selection chips, and user text input.
  * **Right Side**: Live updating preference summary tracking Budget, Powertrain, Body Style, Usage, Seating, and Match Confidence Meter with direct recommendation triggers.
* **Multi-Factor AI Recommendation Engine**: Transparent compatibility scoring (0–100%) weighting budget alignment, fuel efficiency, cabin space, NCAP crash safety, and active feature matches.
* **Side-by-Side Comparison Matrix**: Compare 2 to 4 vehicles simultaneously with toggleable difference highlighting and mobile horizontal scrolling.
* **Garage Wishlist (Saved Cars)**: Save, remove, and manage shortlisted models with reactive state persistence in `localStorage`.
* **Future Admin Foundation**: Administrative dashboard, fleet catalog management (Add / Edit / Delete vehicle UI with modal), user directory, and market demand analytics.

---

## 📁 Project Architecture & Clean Folder Structure

```
C:\ai-car-recommendation-chatbot\
├── index.html                           # Single Page App shell with Tailwind CDN & typography
├── run_app.py                           # Python development HTTP server
├── run_app.bat                          # One-click Windows launcher
├── README.md                            # Complete technical documentation
└── src/
    ├── types/
    │   └── index.d.ts                   # Complete TypeScript interfaces for Car, User, Preferences, etc.
    ├── data/                            # Realistic mock datasets (separated from UI components)
    │   ├── cars.js                      # 16+ detailed car models with specs, safety stars, and imagery
    │   ├── users.js                     # User profile, admin profile, and mock user list
    │   ├── chat.js                      # Conversational decision steps & suggested prompts
    │   ├── history.js                   # Past recommendation sessions
    │   └── admin.js                     # Analytics KPIs, monthly trends, and activity log
    ├── services/                        # Service Abstraction Layer (swappable with real APIs)
    │   ├── carService.js                # getCars, getFeatured, getCarById, compareCars, searchCars
    │   ├── recommendationService.js     # generateRecommendations, getRecommendationHistory
    │   ├── chatService.js               # processMessage, getSuggestedQuestions, preference parsing
    │   ├── userService.js               # profile, saved wishlist, comparison tray
    │   ├── authService.js               # login, signup, session simulation
    │   └── adminService.js              # fleet CRUD, user list, analytics telemetry
    ├── state/
    │   └── store.js                     # Global reactive state, event bus, theme, and toast system
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.js                # Public navbar with live badges and mobile drawer toggle
    │   │   ├── Sidebar.js               # SaaS user & admin collapsible navigation sidebar
    │   │   ├── Header.js                # Top header with greeting, live search, notifications bell
    │   │   ├── MobileNav.js             # Bottom sticky navigation bar and off-canvas drawer
    │   │   └── Footer.js                # Comprehensive automotive tech footer
    │   ├── common/
    │   │   ├── Icons.js                 # 30+ crisp SVG icons (automotive, tech, navigation)
    │   │   ├── Button.js                # Reusable button variants (primary, secondary, gradient, danger)
    │   │   ├── Badge.js                 # Automotive badges (powertrain, status, trim)
    │   │   ├── MatchScore.js            # Tiered AI compatibility score pill with gradient rings
    │   │   ├── Modal.js                 # Accessible backdrop-blurred modal dialog
    │   │   ├── Toast.js                 # Animated notification stack (success, warning, error, info)
    │   │   ├── EmptyState.js            # Empty state screens for saved cars, comparisons, search
    │   │   └── SkeletonLoader.js        # Pulsing skeleton loaders for async states
    │   ├── cars/
    │   │   ├── CarCard.js               # Product card with image, specs grid, match %, save, compare
    │   │   ├── CarComparison.js         # 2-4 cars matrix with difference highlighting
    │   │   ├── CarSpecification.js      # Technical OEM specification table
    │   │   └── FilterPanel.js           # Multi-parameter filter sidebar (budget slider, fuel, body, safety)
    │   ├── chat/
    │   │   ├── ChatMessage.js           # AI/User bubbles with quick-choice chips
    │   │   ├── ChatInput.js             # Chat input bar with carousel of suggested prompts
    │   │   └── PreferenceSidebar.js     # Live preference vector & match confidence gauge
    │   ├── dashboard/
    │   │   ├── DashboardCard.js         # KPI statistic cards with delta indicators
    │   │   └── RecentActivity.js        # Timeline of recent search & save events
    │   └── admin/
    │       └── CarManagementModal.js    # Add/Edit vehicle modal form with spec inputs
    ├── pages/
    │   ├── LandingPage.js               # Hero, How It Works, Features, Preview, Categories, CTA
    │   ├── AboutPage.js                 # Technology methodology, architecture diagram, and FAQ
    │   ├── LoginPage.js                 # Email/password form with demo autofill & Google placeholder
    │   ├── SignupPage.js                # Account registration form
    │   ├── DashboardPage.js             # SaaS command center with KPIs, saved preview, and recommendations
    │   ├── ChatbotPage.js               # Dedicated dual-pane AI recommendation interface
    │   ├── ResultsPage.js               # Ranked match cards, filter sidebar, and sorting dropdown
    │   ├── CarDetailsPage.js            # High-res gallery, "Why this car matches you" AI breakdown, specs
    │   ├── ComparePage.js               # Comparison matrix with quick dropdown slot selector
    │   ├── SavedCarsPage.js             # Saved garage wishlist with bulk compare
    │   ├── HistoryPage.js               # Consultation sessions timeline
    │   ├── ProfilePage.js               # Driver credentials & preference profile
    │   ├── SettingsPage.js              # Account, Preferences, Appearance (Dark/Light), Privacy
    │   ├── AdminDashboardPage.js        # Admin metrics, brand demand shares, and streaming events
    │   ├── AdminCarsPage.js             # Car catalog table with search, filter, and CRUD modal
    │   ├── AdminUsersPage.js            # Registered users table and activity status
    │   └── AdminAnalyticsPage.js        # Body style, budget elasticity, and volume trend charts
    ├── router.js                        # Client-side hash router and global event coordinators
    ├── main.js                          # Application bootstrap and initialization
    └── styles/
        └── main.css                     # Custom scrollbars, card elevation, and light mode adaptation
```

---

## 🗺️ Application Route Sitemap

| Route | View Name | Description |
|---|---|---|
| `#/` | **Landing / Home** | Hero with CTA, How It Works (3 steps), Features, Catalog preview, Trust badges |
| `#/about` | **About / Methodology** | Multi-attribute scoring explanation, Phase roadmap, FAQ |
| `#/login` | **Sign In** | Authentication screen with 1-click demo credential autofill |
| `#/signup` | **Sign Up** | Registration UI for new user accounts |
| `#/dashboard` | **User Dashboard** | SaaS command center with 4 KPI cards, AI shortlisted cars, saved preview |
| `#/chat` | **AI Car Finder** | Dual-pane conversational advisor with interactive chips & live preference summary |
| `#/results` | **Recommendations** | Ranked cars grid with AI match scores, filter panel, and sorting |
| `#/car/:id` | **Car Details** | Image gallery, "Why this car matches you" AI breakdown, specs, features |
| `#/compare` | **Compare Cars** | 2 to 4 car side-by-side comparison matrix with difference highlighting |
| `#/saved` | **Saved Garage** | User wishlist collection with empty state and quick compare |
| `#/history` | **Search History** | Chronological archive of previous AI consultation sessions |
| `#/profile` | **Driver Profile** | User avatar, driving profile, location, and edit profile dialog |
| `#/settings` | **System Settings** | Account, Preferences, Notifications, Dark/Light Appearance, Privacy |
| `#/admin` | **Admin Dashboard** | Fleet telemetry, top brands, user growth, streaming platform events |
| `#/admin/cars` | **Car Management** | Searchable catalog table with Add/Edit modal form and delete UI |
| `#/admin/users` | **User Directory** | Registered user list, recommendations count, and activity status |
| `#/admin/analytics` | **Recommendation Analytics** | Distribution charts for body style, budget elasticity, and growth |

---

## 🔌 Future Backend Integration Guide (Phases 2 – 6)

The frontend is intentionally designed so **no UI components need to be rewritten** when adding the backend:

### Replacing `carService.js` (Phase 2 & 3)
```javascript
// Current (Phase 1):
export const carService = {
  async getAllCars(filters, sortBy) {
    let results = [...mockCars];
    // client filter...
    return results;
  }
};

// Future (Phase 2):
export const carService = {
  async getAllCars(filters, sortBy) {
    const params = new URLSearchParams({ ...filters, sort: sortBy });
    const res = await fetch(`/api/v1/cars?${params}`);
    if (!res.ok) throw new Error('Failed to fetch cars');
    return await res.json();
  }
};
```

### Replacing `recommendationService.js` with Real AI Model (Phase 5)
```javascript
// Future (Phase 5):
export const recommendationService = {
  async generateRecommendations(preferences) {
    const res = await fetch('/api/v1/ai/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences })
    });
    return await res.json();
  }
};
```

All responses already adhere to the exact TypeScript schemas defined in `src/types/index.d.ts`.
