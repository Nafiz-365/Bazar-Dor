# 🛒 বাজার দর / BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে** — A real-time Bangladeshi market price tracking web application.

## 📖 Description

BazarDor is a Next.js web application that displays the daily prices of essential commodities (rice, lentils, oil, vegetables, fish, meat, eggs, spices) from markets across Bangladesh. Users can track price changes, compare prices across different bazaars, and stay informed about market trends — all in Bangla.

## 🚀 Live Demo

🔗 [Visit BazarDor](https://bazar-dor-bd63c31fa7ff.herokuapp.com/)

## 🛠️ Technologies Used

| Technology                       | Purpose                                                 |
| -------------------------------- | ------------------------------------------------------- |
| **Next.js 16** (App Router)      | Core framework & page routing                           |
| **TypeScript**                   | Type safety across the codebase                         |
| **Tailwind CSS v4**              | Utility-first styling                                   |
| **DaisyUI v5**                   | UI component library                                    |
| **BetterAuth**                   | Authentication (Email/Password + Google + GitHub OAuth) |
| **MongoDB Atlas**                | Database for user accounts via BetterAuth adapter       |
| **React Hot Toast**              | Toast notifications                                     |
| **Lucide React**                 | Icon library                                            |
| **Hind Siliguri** (Google Fonts) | Bengali typography                                      |

## ✨ Key Features

1. **📊 Live Price Ticker (Marquee)** — An infinite scrolling price ticker in the navbar showing all product prices with change indicators (▲/▼) in real-time from the API.

2. **🔼🔽 Price Change Sections** — The home page highlights the **top 6 price risers** and **top 6 price fallers** of the day, with color-coded badges (red for rise, green for fall).

3. **🗂️ Category Filtering with Sort** — Browse products by category (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) with a sort dropdown to order by price ascending or descending (C1 feature).

4. **🔐 Protected Product Detail Page** — The product detail page (`/product/[id]`) is a protected route. Unauthenticated users are redirected to sign-in. The page shows market-by-market price breakdown (min/max/avg) in a table format.

5. **🔑 Authentication with Social Login** — Full auth flow using BetterAuth: email/password sign-up & sign-in, Google OAuth, and GitHub OAuth with toast notifications on success/error.

6. **👤 Profile & Update Feature** — Authenticated users can view their profile and update their display name (C3 feature) using BetterAuth's `updateUser` API.

7. **📱 Fully Responsive Design** — Works seamlessly on mobile, tablet, and desktop with a collapsible mobile navbar and responsive product grid (1→2→3→4 columns).

8. **🇧🇩 Full Bangla Interface** — All UI text, numbers (Bengali digits), dates, and messages are in Bangla, making it accessible to Bangladeshi users.

## 📋 Pages

| Route              | Description                                      |
| ------------------ | ------------------------------------------------ |
| `/`                | Home — Hero, price risers, fallers, all products |
| `/category/[slug]` | Category page with sort dropdown                 |
| `/product/[id]`    | Product detail page (protected)                  |
| `/signin`          | Sign in with email/password or social            |
| `/signup`          | Register a new account                           |
| `/profile`         | User profile & update name (protected)           |
| `*`                | 404 Not Found page                               |

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials (optional)
- GitHub OAuth credentials (optional)

### Installation

```bash
git clone <repo-url>
cd bazar-dor
npm install
```

### Environment Variables

Create a `.env` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://openapi.programming-hero.com/api/bazardor
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🚢 Deployment

Deploy on [Heroku](https://www.heroku.com/) — set all environment variables in the Heroku app configuration and set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production domain.
