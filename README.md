# Interview Prep Strategy Builder

An interview-preparation product that turns a target job description and a candidate profile into a practical, personalized preparation plan.

[Open the live demo](https://interview-ai-strategy-builder.vercel.app/)

## Product Overview

Candidates often have to translate a job description into interview topics, identify gaps in their experience, and decide what to study next. This application brings those steps into one workflow: provide a role and a resume or short profile, then review a generated strategy organized around interview questions, skill gaps, and a day-by-day roadmap.

The application includes authenticated report history, so users can return to previously generated plans instead of losing their preparation work between sessions.

## Features

- Account registration, login, and logout with JWTs stored in HTTP-only cookies
- Candidate profile input by resume upload or written self-description
- PDF and DOCX text extraction, with a 5 MiB upload limit and server-side type validation
- Gemini-generated match score, technical and behavioral questions, answer guidance, skill gaps, and preparation roadmap
- Saved plans with report details scoped to the authenticated owner
- AI-assisted resume generation and PDF download
- Responsive React interface with inline validation and retryable generation errors

## Engineering Highlights

- **Structured AI output:** Google GenAI responses are requested as JSON using a Zod-derived schema, keeping report data aligned with the frontend's report model.
- **Session security:** Passwords are hashed with bcrypt. JWTs are issued in HTTP-only cookies, logout tokens are blacklisted, and report queries are constrained to the signed-in user.
- **Document handling:** Multer applies upload limits and file filtering. PDF content is extracted with `pdf-parse`; DOCX content is extracted with Mammoth.
- **Separation of concerns:** React feature folders separate pages, hooks, context, and API services; the Express backend separates routes, controllers, middleware, models, and AI services.
- **Useful failure states:** Invalid inputs and generation failures are presented in the UI with a retry path instead of relying on browser-console errors.

## Technology

| Area | Tools |
| --- | --- |
| Client | React 19, React Router 7, Vite 7, Tailwind CSS 4, Axios |
| API | Node.js, Express 5 |
| Data | MongoDB, Mongoose |
| AI | Google GenAI SDK, Zod, Zod-to-JSON-Schema |
| Documents | Multer, `pdf-parse`, Mammoth, Puppeteer |
| Authentication | JWT, bcryptjs, HTTP-only cookies |

## Architecture

```text
Frontend (React / Vite)
	├── Auth pages and session provider
	├── Interview plan form and saved reports
	└── Report sections: questions, gaps, and roadmap
							│ credentialed /api requests
							▼
Backend (Express)
	├── Authentication and authorization middleware
	├── Resume validation and text extraction
	├── Google GenAI service with structured report schema
	└── MongoDB models for users, sessions, and reports
```

Key implementation areas:

- `Frontend/src/features/auth/` — registration, login, session state, and auth API
- `Frontend/src/features/interview/` — plan generation, saved plans, report UI, and API
- `Backend/src/routes/` — HTTP endpoint definitions
- `Backend/src/controllers/` — request validation and report persistence
- `Backend/src/middlewares/` — authentication and resume upload validation
- `Backend/src/services/ai.service.js` — Gemini prompts and generated PDF workflow
- `Backend/src/models/` — MongoDB schemas

## Run Locally

### Requirements

- Node.js 20.19+ or 22.12+
- npm
- A reachable MongoDB database
- A Google Gemini API key

### 1. Configure the backend

Create `Backend/.env`:

```env
MONGO_URI=mongodb_connection_string
JWT_SECRET=long_random_secret
GOOGLE_GENAI_API_KEY=google_genai_api_key
FRONTEND_URL=http://localhost:5173
```

Install dependencies and start the API:

```bash
cd Backend
npm install
npm run dev
```

The API listens on `http://localhost:3000`. The install step runs Puppeteer's browser setup for PDF generation.

### 2. Configure and start the frontend

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Then, in a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the URL printed by Vite. Use `localhost` consistently for the frontend URL; do not switch between `localhost` and `127.0.0.1` during cookie-based local testing.

## API Overview

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create an account |
| `POST` | `/api/auth/login` | Public | Sign in and set the session cookie |
| `POST` | `/api/auth/logout` | Public | Revoke the current session |
| `GET` | `/api/auth/get-me` | Public | Return the current user, or `null` when signed out |
| `POST` | `/api/interview/` | Authenticated | Generate and save a preparation report |
| `GET` | `/api/interview/` | Authenticated | List the signed-in user's reports |
| `GET` | `/api/interview/report/:interviewId` | Authenticated | Fetch an owned report |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Authenticated | Generate and download a tailored PDF |

## Scripts and Checks

Frontend scripts, run from `Frontend/`:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Backend scripts, run from `Backend/`:

```bash
npm run dev
npm start
```

An automated backend test suite is not configured yet; `npm test` is currently a placeholder. The frontend build and lint scripts are available for local checks.

## Deployment

The frontend is configured for Vercel and the API for Render. `Frontend/vercel.json` rewrites `/api/*` requests to the Render service, keeping browser API calls on the frontend origin.

For production deployment:

1. Set `MONGO_URI`, `JWT_SECRET`, `GOOGLE_GENAI_API_KEY`, `FRONTEND_URL`, and `NODE_ENV=production` in the backend environment.
2. Set `FRONTEND_URL` to the exact deployed frontend origin and allow the deployed backend to reach MongoDB.
3. Leave `VITE_API_URL` unset in the Vercel build so requests use the configured `/api` rewrite.
4. Keep `.env` files and credentials out of version control; rotate any key that has been exposed.

## Data and AI Usage

Resume text and the candidate's self-description and target job description are sent to the configured Google GenAI service to create a report. Extracted resume text and report inputs are stored with the report in MongoDB. Do not use real candidate documents in a public demo without permission.

## Current Scope

- The backend does not yet have an automated test suite or CI workflow.
- AI report generation requires a configured Google GenAI API key and may take several seconds.
- Resume uploads are limited to PDF/DOCX files up to 5 MiB.
- No formal open-source license is included in this repository.