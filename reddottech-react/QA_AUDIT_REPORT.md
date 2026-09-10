# QA Audit Report — reddottech.com.np

**Application:** Red Dot Technologies — Certification & Training Platform
**Stack:** TanStack Start/Router (SSR) + React 19 + Vite · Express · MySQL 8 (mysql2) · Tailwind CSS v4
**Audit Date:** August 24, 2026
**Auditor:** Senior QA / Security / Performance Review
**Overall Verdict:** ❌ **NOT READY FOR PRODUCTION**

---

## Methodology

- Full static codebase audit (routes, server, auth, DB layer, uploads, public assets)
- Production build executed (`npm run build`) and production entry booted (`server/prod-entry.js`) against live local MySQL
- ~60 real HTTP tests executed: page rendering, API authz, validation, rate limits, full CRUD cycle, file upload, CORS, security headers
- All test data cleaned up after testing; database verified restored to pre-test state (5 courses / 2 certificates / 3 contacts / 1 admin)
- Limitations: pixel-level visual testing and real cross-browser/device sweeps were outside available tooling; those findings are based on code analysis and marked accordingly.

---

## 1. Website Discovery — Route Map

### Public Pages
| Route | Notes |
|---|---|
| `/` | Homepage |
| `/about` | About Us |
| `/courses` | Course catalog |
| `/courses/:id` | Course detail (client-fetched) |
| `/pecp` | PECP Program |
| `/ai-unlocked` | AI Unlocked Academy (largest page, 170KB source) |
| `/free` | Free learning hub / downloads |
| `/contact` | Contact form |
| `/verify` | Certificate verification portal |

### Authentication
| Route | Notes |
|---|---|
| `/admin/login` | Single-admin login |

### Admin (Client-guarded, backend-enforced APIs)
| Route | Purpose |
|---|---|
| `/admin` → `/admin/dashboard` | Stats overview |
| `/admin/courses`, `/admin/courses/create` | Course CRUD ("Course Studio") |
| `/admin/certificates` | Certificates hub |
| `/admin/contacts` | Inquiries & leads |
| `/admin/subscriptions` | Newsletter audience |
| `/admin/settings` | Site settings, system info, DB export |
| `/admin/ai-unlocked` | AI course leads / payment verifications |

### API Endpoints
| Method | Endpoint | Auth Required |
|---|---|---|
| GET | `/api/health` | No |
| GET | `/api/settings` | No (whitelisted keys only) |
| POST | `/api/auth/login` | No (rate-limited) |
| POST | `/api/auth/logout` | No |
| GET | `/api/auth/me` | Yes (Bearer token) |
| POST | `/api/auth/change-password` | Yes |
| POST | `/api/auth/change-email` | Yes |
| GET / POST | `/api/courses` | GET no / POST yes |
| GET / PUT / DELETE | `/api/courses/:id` | GET no / PUT·DELETE yes |
| GET | `/api/certificates` | Yes |
| POST | `/api/certificates/claim` | No (rate-limited) ⚠️ |
| DELETE | `/api/certificates/:id` | Yes |
| GET | `/api/certificates/verify/:query` | No (rate-limited) |
| GET / POST / DELETE | `/api/contacts[/:id]` | GET·DELETE yes / POST no |
| GET / POST / DELETE | `/api/subscriptions[/:id]` | GET·DELETE yes / POST no |
| POST | `/api/settings` | Yes |
| GET | `/api/settings/all` | Yes |
| GET / POST / PUT / DELETE | `/api/ai-leads[/:id]` | GET·PUT·DELETE yes / POST no ⚠️ |
| POST | `/api/ai-access/verify-code` | No |
| GET | `/api/ai-access/check-status` | No |
| GET | `/api/stats` | Yes |
| GET | `/api/admin/system-info` | Yes |
| GET | `/api/admin/export-db` | Yes (full JSON backup download) |
| POST | `/api/upload` | Yes |
| POST | `/api/upload-receipt` | No ⚠️ |
| GET | `/uploads/*` | No (static files, incl. receipts ⚠️) |

### Error / System Pages
- Branded 404 via root `notFoundComponent` (returns true HTTP 404 ✅)
- Root `errorComponent` with "Try again" recovery path ✅

No user-side customer accounts exist — the model is: anonymous visitors + single admin.

---

## 2. Verified Working (Evidence-Based ✅)

| Check | Result |
|---|---|
| Typecheck (`tsc --noEmit`) | ✅ Clean |
| Production build (`vite build`) | ✅ Succeeds in ~13s |
| SSR page rendering | ✅ All 9 public routes return 200 with full HTML (warm: 110–280ms) |
| Unknown route handling | ✅ Real HTTP 404 status + branded 404 page |
| Backend authorization | ✅ `/api/stats`, `/api/contacts`, `POST /api/courses` all return **401 without token** (live-tested) |
| CORS allowlist | ✅ Disallowed origin rejected with **403** (live-tested) |
| Input validation | ✅ Missing contact fields → 400; malformed JSON → 400; unknown certificate verify → 404; short new password → 400 |
| Login error handling | ✅ Generic "Invalid email or password" (no user enumeration via message) |
| Login brute-force lockout | ✅ Live-tested: 8×401 then **429** (15-min lock per email+IP) |
| Contact form rate limit | ✅ Live-tested: exactly 15/min then **429** |
| Course CRUD cycle | ✅ Create → read back → update → verify persisted → delete → subsequent GET returns 404 |
| Password hashing | ✅ scrypt + random salt + timing-safe comparison (`server/auth.js:11-26`) |
| Session hygiene | ✅ Old sessions revoked on login & password change; expired sessions purged |
| XSS rendering defense | ✅ Every `dangerouslySetInnerHTML` goes through DOMPurify (`src/lib/sanitize.ts`); user names rendered as escaped React text |
| Admin SSR data leakage | ✅ None pre-auth (live-verified on `/admin/dashboard`, `/admin/courses`) |
| SQL injection | ✅ All queries parameterized throughout (`server/db.js`, `server/server.js`) |
| Static path traversal | ✅ `serveStatic()` resolves + prefix-checks against client dir (`prod-entry.js:47-79`) |
| robots.txt / sitemap.xml | ✅ Present, correct, admin/api disallowed |
| Favicon set | ✅ favicon.ico/svg + apple-touch-icon present and referenced |
| MySQL pool config | ✅ utf8mb4, connection limits, keep-alive (`server/db.js:12-24`) |

---

## 3. Test Case Report

Severity legend: 🔴 Critical · 🟠 High · 🟡 Medium · 🔵 Low

| ID | Severity | Category | Page/Feature | Steps to Reproduce | Expected | Actual | Recommendation |
|---|---|---|---|---|---|---|---|
| TC-01 | 🔴 Critical | Security / Secrets | Git repository | `git log --oneline` → commit `49c547d "chore: add .env configuration"` | Secrets never committed | `.env` is tracked in git history despite `.gitignore`; contains admin password (`admin123`) and DB credentials | Rotate ALL credentials immediately; purge history with `git filter-repo`; force-push; consider all past creds compromised |
| TC-02 | 🔴 Critical | Business Logic | Certificate registry | `POST /api/certificates/claim` twice with identical `certificate_id`, different names → `GET /api/certificates/verify/:id` | Duplicate ID rejected with 409 | **Live-verified**: public verify now returns the impostor record ("QA Impostor" replaced "QA Original"). Anyone can forge or overwrite any certificate's public verification record, or mint certificates for arbitrary names/emails with zero proof of completion | Add UNIQUE constraint on `certificates.certificate_id`; ignore/reject client-supplied IDs on the public claim endpoint (409 on conflict); require signed issuance tokens for real credentials |
| TC-03 | 🔴 Critical | Privacy / PII | `public/uploads/` | Deploy site → `GET /uploads/receipt_BRPGrouplogo_1787302885608.png` etc. | Payment receipts private | Real customer payment receipts are committed in the repo and served publicly with no authentication (`receipt_*.png` files confirmed in `public/uploads/`) | Remove from repo AND deploy artifacts; serve receipts only behind admin auth; purge from git history |
| TC-04 | 🟠 High | Security Headers | All SSR pages | `GET /` → inspect response headers | CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy | **Live-verified: none present** on HTML responses. Headers are only set inside the Express API app, never in the SSR handler (`prod-entry.js:103-122`) | Set security headers globally in the `createServer` wrapper; add Content-Security-Policy and HSTS |
| TC-05 | 🟠 High | Security / Abuse | `POST /api/upload-receipt` | Unauthenticated POST with base64 data-URI → file instantly public at `/uploads/receipt_*` | Gated by enrollment token / captcha | Public unauthenticated disk-write: ~3.7MB × 15/min per IP ≈ 8GB/hr/IP storage-fill DoS; MIME type trusted from client declaration, content bytes never validated | Require a valid lead ID + one-time token; validate magic bytes server-side; cap size ≤2MB |
| TC-06 | 🟠 High | API / Mass Assignment | `POST /api/ai-leads` | Public POST body including `"status":"verified"`, `"accessCode":"RDT..."`, `"emailSent":true` | Server controls workflow fields | Client can set `status`, `emailSent`, `emailSentAt`, `accessCode`, `notes` (`server.js:906-955`) — enables self-verified enrolments | Whitelist writable fields for the public endpoint (name, email, org, track, txn, receiptUrl only); move privileged writes behind auth |
| TC-07 | 🟠 High | Functional / Auth | Admin account recovery | Lose admin password | Forgot-password flow exists | No flow at all. `password_reset_tokens` table is created (`db.js:176`) but zero code references it — no endpoint, no UI | Implement forgot/reset with email delivery, or document a secure break-glass procedure |
| TC-08 | 🟠 High | Data Integrity | Course slugs | Create two courses with the same name (live-tested) | Unique slug or auto-suffix | Both receive slug `duplicate-slug-test`; lookup uses `WHERE id = ? OR slug = ?` so routing is ambiguous | UNIQUE index on `courses.slug`; append `-2`, `-3` suffixes; return 409 on collision |
| TC-09 | 🟠 High | SEO / UX | `/courses/:id` | `GET /courses/nonexistent-course-xyz` | HTTP 404 | **Live-verified: HTTP 200** with empty shell; client-side "Course Not Found" message = soft-404. Page is also not server-rendered and has a static title/description for every course | Fetch in a route loader; throw 404 for missing courses; generate dynamic meta per course |
| TC-10 | 🟡 Medium | Privacy | Verify endpoint | `GET /api/certificates/verify/<partial name or email>` | Minimal fields, exact-match lookup | Returns **full holder email** and performs LIKE `%query%` matching on name/email (`server.js:530-543`) → holder enumeration | Exact match on certificate ID only; mask emails in responses (`j***@d***.com`) |
| TC-11 | 🟡 Medium | Performance | Media assets | Inspect `dist/client` | Optimized images | Total **34.7MB**; `hero-3d.png` 1.6MB; 15+ PNGs between 700–900KB; CSS bundle 223KB; homepage HTML 159KB | Convert to WebP/AVIF, responsive `srcset`, compress to ≤200KB for heroes |
| TC-12 | 🟡 Medium | Reliability | Rate limiting behind proxy | Deploy behind cPanel/LiteSpeed reverse proxy | Per-client limits work | Limiter keyed on `req.ip` with **no `trust proxy` configured** (`server.js:69`) → all visitors share proxy IP ⇒ collective 429 lockouts; falls back to spoofable `X-Forwarded-For` | `app.set('trust proxy', 1)` and key on socket address |
| TC-13 | 🟡 Medium | Data Integrity | Admin AI leads panel | Kill API → open Admin → AI Unlocked | Show DB truth or an error | `getAiLeads()` silently falls back to `localStorage["rdt_ai_payment_leads"]` (`api.ts:431-439`) → fake local records displayed as real payments | Remove localStorage fallback for reads |
| TC-14 | 🟡 Medium | UX / Consistency | Image upload | Upload fails (network/API error) | Error surfaced, save blocked | `uploadImage()` silently resolves the giant base64 string into the DB row (`api.ts:129`) — multi-MB LONGTEXT rows served in course JSON | Throw on failure; block form submission until upload succeeds |
| TC-15 | 🟡 Medium | API / Scale | List endpoints | `/api/courses`, `/api/contacts`, `/api/certificates`, `/api/ai-leads` | Pagination | Full-table dumps, unbounded as data grows | Add LIMIT/OFFSET + total count |
| TC-16 | 🟡 Medium | API Validation | Course create/update | POST name longer than 255 chars | 400 validation error | No length/type checks anywhere in handlers → MySQL strict-mode error surfaces as **500** | Add server-side zod schema validation |
| TC-17 | 🟡 Medium | Access Control | Public course detail | `GET /api/courses/:id` for a `status='draft'` course | Draft hidden from public | Status not filtered on the detail route (public list relies on UI filtering) | Add `AND status = 'published'` to public queries |
| TC-18 | 🟡 Medium | Code Quality | Lint | `npm run lint` | Clean | **2,778 problems** (2,692 auto-fixable prettier formatting, 12 warnings) | Run `npm run format`; add pre-commit hook |
| TC-19 | 🔵 Low | API Consistency | Unknown API routes | `PUT /api/courses/` (empty id) | JSON-shaped 404 `{success:false}` | Express default plain-text `Cannot PUT /api/courses/` | Add JSON catch-all 404 handler for `/api/*` |
| TC-20 | 🔵 Low | SEO | `<head>` metadata | View source of any page | canonical URL, og:image, Twitter cards | No canonical tags anywhere; `og-image.png` exists in public but is unreferenced; no twitter:* meta | Add canonical + Open Graph image + Twitter card meta |
| TC-21 | 🔵 Low | Repo Hygiene | `public/` folder | Inspect deployed assets | Clean tree | Contains `error_log`, stray `index.php`, cPanel leftovers, duplicate images under hash filenames (`ba.png` content ×3) | Prune; exclude junk in packaging step |
| TC-22 | 🔵 Low | Security | AI access codes | Inspect `server.js:753-781` | Strong crypto | Hardcoded salts (`RDT-AIHP-2026`…) + FNV-32 checksum (weak), mitigated by DB status check | Move salts to env vars; use HMAC-SHA256 |
| TC-23 | 🔵 Low | Auth UX | Sessions | Login from device B while device A active | Concurrent sessions or clear warning | New login silently revokes all previous sessions (`auth.js:34`) — single-device policy surprises admins | Document behavior or make configurable |
| TC-24 | 🔵 Low | Timing Side-Channel | Login | Compare response times: existing vs non-existing email | Near-constant time | Unknown email skips scrypt entirely → faster 401 leaks registered-admin existence | Perform a dummy scrypt computation when user not found |

---

## 4. Final QA Score: 62/100

| Area | Score | Basis |
|---|---|---|
| Functional | **74/100** | CRUD, auth, rate limiting all work; certificate forgery, slug collisions, missing password reset |
| UI/UX | **75/100** | Consistent shadcn/Tailwind design system; loading/error/empty states present in code (static review) |
| Responsive | **76/100** | Pervasive sm/md/lg breakpoints + mobile navigation in code; pixel-level device sweep not performed |
| Performance | **55/100** | 34.7MB asset payload, 1.6MB hero PNG, 223KB CSS bundle, 159KB homepage HTML, no pagination |
| Security | **52/100** | Strong auth crypto & verified rate limits, BUT secrets in git, cert forgery, public receipt upload, mass assignment, missing CSP/HSTS |
| Accessibility | **65/100** | Semantic markup and partial aria usage observed; full keyboard/contrast/screen-reader audit not performed |
| SEO | **58/100** | SSR + sitemap + robots are good; soft-404s, no canonical/OG-image/Twitter meta, static course titles, non-SSR course pages |
| API / Backend | **70/100** | Correct verbs/status codes mostly, fully parameterized SQL; validation gaps and mass assignment |
| Production Readiness | **50/100** | Builds and runs correctly, but three independently exploitable critical issues block release |

---

## 5. Executive Summary

The application is well-architected for its scale: genuine server-side rendering, backend-enforced authorization (not just frontend guards), fully parameterized SQL, scrypt password hashing with proper session revocation, working rate limits, and a clean production build.

However, it is undermined by **three critical issues that are trivially exploitable by any outsider today**:

1. **Certificate records can be forged or overwritten by anyone** through a public endpoint (proven live during this audit).
2. **Real customer payment receipts ship inside the public web root**, downloadable without authentication.
3. **Admin and database credentials sit in git history**, exposed via a committed `.env` file.

Performance is dragged down substantially by unoptimized media (34.7MB of shipped assets). Once the four highest-priority fixes are applied, the platform is fundamentally sound and could reach production quality within a few days of work.

---

## 6. Critical Issues (Blockers)

- **TC-01** — `.env` with admin password + DB credentials committed to git history
- **TC-02** — Public certificate claim allows forging/overwriting any certificate's public verification record (live-proven)
- **TC-03** — Real customer payment receipts committed and served publicly under `/uploads/`

## High Priority Issues

- **TC-04** — No security headers on any SSR page (no CSP/HSTS/XFO/nosniff)
- **TC-05** — Unauthenticated receipt upload = storage-exhaustion abuse vector
- **TC-06** — Mass assignment on public lead creation (self-verification possible)
- **TC-07** — No password-recovery mechanism for the sole admin account
- **TC-08** — Duplicate course slugs cause ambiguous routing
- **TC-09** — Soft-404s and non-server-rendered, statically-titled course pages damage SEO
- **TC-10** — Certificate verification exposes holder emails and supports enumeration

## Medium / Low Priority Issues

- TC-11 Image weight / payload optimization
- TC-12 Rate limiter breaks behind reverse proxy (trust proxy)
- TC-13 LocalStorage fallback shows fake leads in admin
- TC-14 Silent upload failure stores base64 blobs in DB
- TC-15 No pagination on list endpoints
- TC-16 No server-side input-length validation (500s possible)
- TC-17 Draft courses exposed via public detail API
- TC-18 Lint debt (2,778 problems)
- TC-19 Non-JSON API 404 shape · TC-20 Missing canonical/OG/Twitter meta · TC-21 Repo junk files · TC-22 Weak access-code checksum crypto · TC-23 Single-session surprise · TC-24 Login timing oracle

---

## 7. Recommended Fix Order

1. Fix authentication/security secrets: rotate credentials, purge `.env` from git history (**TC-01**)
2. Remove publicly exposed receipts; gate receipt serving (**TC-03**)
3. Fix certificate registry integrity: unique IDs, strip client-supplied cert IDs (**TC-02**)
4. Close API abuse vectors: mass-assignment whitelist + gated receipt upload (**TC-06, TC-05**)
5. Add admin password-reset flow (**TC-07**)
6. Add global security headers incl. CSP + HSTS (**TC-04**)
7. Data integrity: unique slugs, server-side validation, draft filtering (**TC-08, TC-16, TC-17**)
8. SEO: route loaders for real 404s + dynamic meta, canonical/OG tags (**TC-09, TC-20**)
9. Reliability/performance: trust-proxy fix, pagination, WebP conversion, remove localStorage fallback (**TC-11–TC-15, TC-12**)
10. Final regression testing + real-device responsive/browser compatibility sweep

---

## 8. Production Readiness Verdict

# ❌ NOT READY FOR PRODUCTION

Fix items 1–4 of the Recommended Fix Order before any public exposure — each is independently exploitable in the current state. After applying them, the platform is fundamentally sound and would qualify as **⚠️ READY WITH FIXES** within a few days of work.

---

*End of report — generated from live testing evidence gathered on August 24, 2026.*
