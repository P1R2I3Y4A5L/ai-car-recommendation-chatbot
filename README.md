# 🚗 Vroomy — AI Car Recommendation & Comparison Web Application

Vroomy is a full-stack, AI-assisted car buying advisory platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **SQLite with Prisma ORM**, and **Google Gemini API**.

It empowers buyers to discover cars using natural language queries, compare technical specifications side-by-side, filter vehicle matrices deterministically, and view verified specifications and safety ratings.

---

## 🌟 Key Features

1. **AI Automotive Assistant**:
   - Natural language comprehension powered by Google Gemini 1.5 Flash (`@google/generative-ai`).
   - Structured parameter extraction (budget, body type, fuel type, seating capacity, intent).
   - Zero hallucination: Prompts provide only verified database records to the LLM.
   - Graceful degradation: If `GEMINI_API_KEY` is omitted, users receive clear guidance while manual exploration and comparison remain fully operational.

2. **Automotive Catalog & Exploration**:
   - Deterministic filtering across:
     - **Market / Currency**: India (INR / Lakhs) and Global (USD / Thousands).
     - **Body Type**: SUV, Sedan, Hatchback, MPV, Coupe, Crossover.
     - **Fuel Type**: Petrol, Diesel, Electric, Hybrid, CNG.
     - **Transmission**: Manual, Automatic, AMT, CVT, DCT.
     - **Price & Seating**: Dynamic budget limits and minimum passenger count.
   - Server-side pagination and sorting (price ascending/descending, alphabetical).

3. **In-Depth Vehicle Profiles**:
   - Detailed specifications: Powertrain displacement, horsepower, torque, fuel tank capacity, electric battery kWh, range, dimensions, ground clearance, and boot volume.
   - Verified safety scores (Global NCAP / Euro NCAP star ratings).
   - Available variant trims with pricing differentials.
   - Verification timestamp and data provenance notice.

4. **Multi-Vehicle Comparison Engine**:
   - Select 2 to 4 vehicles simultaneously.
   - Side-by-side matrix highlighting best-in-class values (highest mileage/range, greatest ground clearance, lowest acceleration time, highest safety rating).
   - Automated synthesis and trade-off summary.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Server & Client Components) |
| Language | TypeScript 5 (Strict Mode) |
| Styling | Tailwind CSS |
| Database & ORM | SQLite with Prisma ORM (`@prisma/client`) |
| AI Integration | Google Gemini 1.5 Flash via `@google/generative-ai` SDK |
| Validation | Zod 3 (`z.infer`, safe parsing on all API inputs) |
| Icons | Lucide React |
| Testing | Jest & `ts-jest` |

---

## 🚀 Setup & Execution Guide

### Prerequisites
- Node.js (v18.18.0 or v20+ recommended)
- npm, pnpm, or yarn

### 1. Installation
Clone or navigate to the project directory:
```bash
cd c:\vroomy
npm install
```

### 2. Environment Variables Configuration
Copy the template and supply your Gemini API key:
```bash
cp .env.example .env
```
Edit `.env`:
```env
# Google Gemini API Key (Obtain from https://aistudio.google.com/app/apikey)
GEMINI_API_KEY="AIzaSyYourActualKeyHere"

# SQLite Local Database
DATABASE_URL="file:./dev.db"

# Public URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```
*(Note: If `GEMINI_API_KEY` is left blank, the app will run with manual browsing, filtering, and comparison features fully available).*

### 3. Database Initialization & Seeding
Generate Prisma Client, apply database migrations, and seed starter cars:
```bash
# Generate the Prisma client
npm run db:generate

# Run SQLite migrations
npx prisma migrate dev --name init

# Seed starter database (18 realistic models across India & Global markets)
npm run db:seed
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

Run the automated test suite covering recommendation ranking, comparisons, API validation, and Gemini configuration handling:
```bash
npm test
```

To run type checking and linting:
```bash
npm run typecheck
npm run lint
```

---

## 📁 Project Architecture

```
c:\vroomy\
├── prisma\
│   ├── schema.prisma            # SQLite schema (Car, CarSpec, Variant, CarFeature, CarMarket)
│   └── seed.ts                  # Repeatable, idempotent seed script (18 cars with specs & trims)
├── src\
│   ├── app\
│   │   ├── api\
│   │   │   ├── cars\            # GET /api/cars (with filter query params)
│   │   │   │   └── [id]\        # GET /api/cars/[id] (detail endpoint)
│   │   │   ├── chat\            # POST /api/chat (Gemini AI agent + DB grounding)
│   │   │   └── compare\         # POST /api/compare (2-4 car comparison matrix)
│   │   ├── cars\[id]\           # Vehicle detail page & not-found view
│   │   ├── chat\                # Interactive AI chat interface
│   │   ├── compare\             # Interactive comparison engine
│   │   ├── explore\             # Catalog with filter matrix and pagination
│   │   ├── globals.css          # Tailwind & custom automotive design tokens
│   │   ├── layout.tsx           # Root Next.js layout
│   │   └── page.tsx             # Home landing page with hero & featured models
│   ├── components\
│   │   ├── cars\
│   │   │   ├── CarCard.tsx      # Reusable vehicle card component
│   │   │   └── CarGrid.tsx      # Responsive vehicle grid with zero state
│   │   ├── chat\
│   │   │   ├── ChatMessage.tsx  # Message bubble rendering text & matched car cards
│   │   │   └── TypingIndicator.tsx # Animated pulsing loader
│   │   └── ui\
│   │       ├── Footer.tsx       # Application footer with demo disclaimer
│   │       └── Navbar.tsx       # Responsive top navigation with mobile toggle
│   ├── lib\
│   │   ├── car-queries.ts       # Prisma query abstraction layer
│   │   ├── comparison-engine.ts # Comparison matrix compiler & difference evaluator
│   │   ├── db.ts                # Prisma singleton instance
│   │   ├── gemini.ts            # Gemini SDK client, prompt templates & preference extractor
│   │   ├── recommendation-engine.ts # Requirement scoring & ranking algorithm
│   │   ├── utils.ts             # Currency, formatting, and badge color utilities
│   │   └── validators.ts        # Zod validation schemas
│   └── types\
│       └── index.ts             # Shared TypeScript definitions
├── tests\
│   ├── comparison-engine.test.ts # Matrix & trade-off tests
│   ├── gemini-config.test.ts     # Missing key safety & degradation tests
│   ├── recommendation-engine.test.ts # Ranking, budget, and seating tests
│   ├── setup.ts                  # Test environment config
│   └── validators.test.ts        # Zod schema input boundary tests
├── .env.example
├── jest.config.ts
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚠️ Notes & Limitations

- **Demo Data Indicator**: Data entries are marked with `isDemo: true` and clear UI callouts remind users to verify numbers with official dealers before purchase.
- **SQLite Persistence**: Local SQLite files (`prisma/dev.db`) work for development and local testing. If deploying to serverless platforms like Vercel, switch `DATABASE_URL` in `schema.prisma` to a hosted database (e.g., Supabase, Turso, or PostgreSQL).
