# Interview AI Strategy Builder

An AI-powered interview preparation platform that turns a job description and a candidate profile into a personalized interview strategy.

## Why This Project

Preparing for an interview usually means searching through a job description, identifying skill gaps, and building a study plan manually. This application brings those steps into one workflow: users can create an account, upload a resume or describe their experience, and receive an AI-generated preparation plan.

## Features

- User registration and login with JWT-based authentication
- Job description and candidate profile input
- PDF and DOCX resume upload
- AI-generated interview strategy using Google Gemini
- Technical questions, behavioral questions, skill-gap analysis, and preparation guidance
- Saved interview plans for returning users
- Generated resume PDF download
- Responsive React interface built with Sass

## Tech Stack

**Frontend**

- React 19
- Vite
- React Router
- Axios
- Sass

**Backend**

- Node.js and Express
- MongoDB with Mongoose
- Google GenAI SDK
- JWT and bcryptjs authentication
- Multer, pdf-parse, and Puppeteer for document workflows
- Zod response validation

## Project Structure

```text
Backend/    Express API, authentication, AI service, MongoDB models
Frontend/   React and Vite client application
```

## Run Locally

### Prerequisites

- Node.js 18+
- MongoDB database
- Google Gemini API key

### 1. Configure the backend

Create `Backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

Install dependencies and start the API:

```bash
cd Backend
npm install
npm run dev
```

The API runs on `http://localhost:3000`.

### 2. Start the frontend

In a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL printed by Vite.

## Available Scripts

### Frontend

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

### Backend

```bash
npm run dev       # Start the API with nodemon
```

## Deployment Notes

Before deploying, set the backend environment variables in the hosting provider and configure CORS, cookies, and MongoDB network access for the production domains. The frontend API clients currently point to `http://localhost:3000`; update that API base URL to the deployed backend URL before creating the production frontend build.

Never commit `.env` files or API keys. If credentials have ever been exposed, rotate them before publishing this repository.

## Future Improvements

- Add a production API URL through a frontend environment variable
- Add automated tests for authentication and report generation
- Add deployment configuration and CI checks
- Add interview plan sharing and progress tracking

## License

This project is available for portfolio and demonstration purposes.