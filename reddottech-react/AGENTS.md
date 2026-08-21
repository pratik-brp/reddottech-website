# Red Dot Technologies — Agent Guidelines & System Architecture

## Overview
Full-stack production web application for **Red Dot Technologies** (Kathmandu, Nepal), delivering professional IT certifications (PECP), executive training, and AI courses.

## Tech Stack & Architecture
- **Frontend**: TanStack Router + TanStack Start (SSR), React 19, TypeScript, Tailwind CSS v4, Lucide React, Framer Motion, Embla Carousel.
- **Backend**: Node.js + Express (`server/server.js`), MySQL 8.x (`mysql2/promise`), session token auth with `scrypt` hashing.
- **Production Entry**: `server/prod-entry.js` serving both SSR pages and `/api/*` endpoints on unified port (`PORT=5000`).

## Key Project Conventions
1. **Database Source of Truth**:
   - MySQL database is the sole source of truth. All queries use parameterized placeholders to prevent SQL injection.
   - Schema defined in `server/schema.sql`.
2. **API & Error Handling**:
   - Always catch errors gracefully in UI components with `.catch()` and `.finally()` so spinners never hang indefinitely.
   - All server errors are logged server-side and client receives sanitized generic messages.
3. **Security Standards**:
   - All user-rendered HTML must be sanitized via `sanitizeHtml()` from `@/lib/sanitize`.
   - Public POST endpoints (`/api/contacts`, `/api/subscriptions`, `/api/certificates/claim`, `/api/ai-leads`, `/api/upload`, `/api/auth/login`) are protected by IP rate limiting.
   - SVG uploads are blocked to prevent stored XSS.
4. **Development Commands**:
   - `npm run dev:all`: Starts Express backend (port 5000) and TanStack Vite frontend (port 5173).
   - `npm run build`: Production client + SSR build.
