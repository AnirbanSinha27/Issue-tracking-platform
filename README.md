# 🛡️ ApniSec – Enterprise Issue Tracking Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**A production-ready issue tracking platform for cybersecurity companies**

[Features](#-features) • [Architecture](#-architecture) • [Setup](#-installation) • [API Docs](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Security](#-security)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**ApniSec** is a full-stack, enterprise-grade issue tracking platform specifically designed for cybersecurity companies. Built with modern web technologies and strict Object-Oriented Programming principles, it demonstrates production-ready SaaS engineering practices including custom authentication, rate limiting, secure issue management, and automated email notifications.

### Key Highlights

- ✅ **Zero Third-Party Auth** – Custom JWT implementation
- ✅ **Strict OOP Backend** – Clean, maintainable, testable code
- ✅ **Production Security** – Rate limiting, IDOR prevention, secure cookies
- ✅ **Real-World SaaS Features** – Email notifications, SEO optimization
- ✅ **Interview-Ready** – Demonstrates advanced architectural patterns

---

## 🚀 Features

### 🔐 Authentication & Authorization

- **Custom JWT-based authentication** with no third-party dependencies
- Secure `httpOnly` cookie-based session management
- Access token expiry handling (15 minutes)
- Support for both cookie and Bearer token authentication
- Protected route middleware
- User registration with email verification
- Secure logout with token invalidation

### 🎯 Issue Management

- **CRUD operations** for security issues
- **Issue categorization** by type:
  - Cloud Security
  - Red Team Assessment
  - VAPT (Vulnerability Assessment and Penetration Testing)
- **Advanced filtering** by issue type and status
- **Ownership enforcement** – Users can only manage their own issues
- **IDOR (Insecure Direct Object Reference) prevention**
- Real-time issue updates
- Comprehensive issue metadata (created/updated timestamps)

### 🚦 Rate Limiting

- **Custom OOP-based rate limiter** implementation
- IP-based and user-based tracking
- **100 requests per 15 minutes** limit
- Standard rate-limit headers:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`
- Automatic cleanup of expired rate limit entries
- Configurable limits per endpoint

### 📧 Email Notifications

- **Automated email system** powered by Resend
- **Welcome emails** on user registration
- **Issue creation notifications** for stakeholders
- HTML email templates with branding
- Fire-and-forget pattern (non-blocking)
- Centralized email service abstraction
- Error handling without blocking API responses

### 🎨 Frontend Experience

- **SEO-optimized landing page** with cybersecurity theme
- Modern, responsive UI built with Tailwind CSS
- Protected dashboard with authentication checks
- Issue creation and management interface
- User profile management
- Loading states and error handling
- Form validation with user feedback
- Mobile-responsive design

---

## 🧱 Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **Next.js 15+** | React framework with App Router |
| **React 19** | UI component library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |

### Backend

| Technology | Purpose |
|------------|---------|
| **Next.js API Routes** | Serverless API endpoints |
| **JWT** | Token-based authentication |
| **Prisma ORM** | Type-safe database client |
| **PostgreSQL** | Relational database |
| **Resend** | Transactional email service |

### Development Tools

- **ESLint** – Code quality
- **Prettier** – Code formatting
- **TypeScript** – Static type checking
- **Prisma Studio** – Database GUI

---

## 🏗️ Architecture

### Backend Design Philosophy

ApniSec follows a **strict Object-Oriented Programming (OOP) architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                         REQUEST FLOW                         │
└─────────────────────────────────────────────────────────────┘

Route Handler → Request Validator → Service Layer → Repository → Database
      ↓                ↓                   ↓              ↓
  Rate Limit    Input Validation   Business Logic   Data Access
  Auth Check    Schema Validation  Email Service    SQL Queries
```

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/              # Protected routes
│   │   ├── dashboard/
│   │   ├── issues/
│   │   └── profile/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   └── issues/
│   └── page.tsx                  # Landing page
│
├── backend/                      # Backend architecture
│   ├── handlers/                 # HTTP request handlers
│   │   ├── auth/
│   │   └── issues/
│   ├── services/                 # Business logic layer
│   │   ├── AuthService.ts
│   │   ├── IssueService.ts
│   │   └── EmailService.ts
│   ├── repositories/             # Data access layer
│   │   ├── UserRepository.ts
│   │   └── IssueRepository.ts
│   ├── validators/               # Input validation
│   │   ├── AuthValidator.ts
│   │   └── IssueValidator.ts
│   ├── rate-limiter/             # Rate limiting logic
│   │   └── RateLimiter.ts
│   ├── utils/                    # Utility functions
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── response.ts
│   ├── errors/                   # Custom error classes
│   │   └── AppError.ts
│   └── interfaces/               # TypeScript interfaces
│       └── types.ts
│
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   └── forms/                    # Form components
│
└── lib/                          # Shared utilities
    ├── prisma.ts                 # Prisma client
    └── config.ts                 # Configuration
```

### Key Architectural Principles

1. **Separation of Concerns** – Each layer has a single responsibility
2. **Dependency Injection** – Classes receive dependencies via constructors
3. **Interface-Based Design** – Contracts define behavior, not implementation
4. **Error Handling** – Centralized error handling with custom error classes
5. **No Business Logic in Routes** – Routes only orchestrate the flow
6. **Repository Pattern** – Abstract database operations
7. **Service Layer** – Encapsulate business rules
8. **Validation Layer** – Input validation before processing

---

## 📦 Installation

### Prerequisites

- **Node.js** 18+ 
- **PostgreSQL** 14+
- **npm** or **yarn** or **pnpm**

### Step-by-Step Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/apnisec-issue-platform.git
cd apnisec-issue-platform
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

See [Environment Variables](#-environment-variables) section for details.

4. **Set up the database**

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# (Optional) Seed the database
npx prisma db seed
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/apnisec?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="15m"

# Email Service (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="ApniSec <noreply@yourdomain.com>"

# Application
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Rate Limiting
RATE_LIMIT_WINDOW_MS="900000"  # 15 minutes
RATE_LIMIT_MAX_REQUESTS="100"
```

### Environment Variables Explained

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `JWT_EXPIRES_IN` | Token expiration time | `15m` |
| `RESEND_API_KEY` | Resend API key for emails | Required |
| `EMAIL_FROM` | Sender email address | Required |
| `NODE_ENV` | Environment mode | `development` |
| `NEXT_PUBLIC_APP_URL` | Base URL of the app | `http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit time window (ms) | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

---

## 📡 API Reference

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK` + `httpOnly` cookie set
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt-token-here"
  }
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
# or cookie-based
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

#### Logout

```http
POST /api/auth/logout
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Issue Management Endpoints

#### Get All Issues

```http
GET /api/issues?type=CLOUD_SECURITY&limit=10&offset=0
Authorization: Bearer <token>
```

**Query Parameters:**
- `type` (optional): Filter by issue type (`CLOUD_SECURITY`, `RED_TEAM`, `VAPT`)
- `limit` (optional): Number of results (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "issues": [
      {
        "id": "uuid",
        "title": "AWS S3 Bucket Misconfiguration",
        "description": "Found publicly accessible S3 bucket",
        "type": "CLOUD_SECURITY",
        "status": "OPEN",
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z",
        "userId": "uuid"
      }
    ],
    "total": 1,
    "limit": 10,
    "offset": 0
  }
}
```

#### Create Issue

```http
POST /api/issues
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "SQL Injection Vulnerability",
  "description": "Found SQL injection in login form",
  "type": "VAPT"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "issue": {
      "id": "uuid",
      "title": "SQL Injection Vulnerability",
      "description": "Found SQL injection in login form",
      "type": "VAPT",
      "status": "OPEN",
      "createdAt": "2024-01-01T00:00:00Z",
      "userId": "uuid"
    }
  }
}
```

#### Get Single Issue

```http
GET /api/issues/:id
Authorization: Bearer <token>
```

**Response:** `200 OK`

#### Update Issue

```http
PUT /api/issues/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "IN_PROGRESS"
}
```

**Response:** `200 OK`

#### Delete Issue

```http
DELETE /api/issues/:id
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Issue deleted successfully"
}
```

---

## 🔒 Security

### Authentication Security

- **JWT tokens** stored in `httpOnly` cookies to prevent XSS attacks
- **Password hashing** using bcrypt with configurable salt rounds
- **Token expiration** enforced (15 minutes default)
- **Secure cookie attributes**: `httpOnly`, `secure` (in production), `sameSite`

### Authorization Security

- **Ownership checks** on all issue operations (IDOR prevention)
- **User context** extracted from JWT on every protected request
- **No user enumeration** in error messages

### Rate Limiting

- **IP-based tracking** for anonymous requests
- **User-based tracking** for authenticated requests
- **Automatic cleanup** of expired rate limit entries
- **Standard headers** for client awareness

### Input Validation

- **Schema validation** on all inputs using custom validators
- **SQL injection prevention** via Prisma parameterized queries
- **XSS prevention** via React's built-in escaping
- **CSRF protection** via `sameSite` cookie attribute

### Best Practices Implemented

- Environment variables for sensitive data
- No secrets in version control
- Database connection pooling
- Error messages that don't leak sensitive info
- Secure password requirements (min length, complexity)

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration with email notification
- [ ] User login with JWT cookie
- [ ] Access protected routes (dashboard, profile)
- [ ] Create issue with email notification
- [ ] View list of user's own issues
- [ ] Update issue (only own issues)
- [ ] Delete issue (only own issues)
- [ ] Rate limiting blocks after 100 requests
- [ ] Invalid tokens rejected
- [ ] IDOR prevention (cannot access others' issues)
- [ ] Logout clears authentication

### Testing with cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}' \
  -c cookies.txt

# Get issues (using cookie)
curl -X GET http://localhost:3000/api/issues \
  -b cookies.txt

# Create issue
curl -X POST http://localhost:3000/api/issues \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Test Issue","description":"Test","type":"VAPT"}'
```

### Rate Limit Testing

```bash
# Trigger rate limit (run 101 times)
for i in {1..101}; do
  curl -X GET http://localhost:3000/api/issues -b cookies.txt
done
```

---

## 🚀 Deployment

### Recommended Platforms

- **Vercel** (recommended for Next.js)
- **Render**
- **AWS EC2 + RDS**

### Deployment Checklist

- [ ] Set all environment variables
- [ ] Use a managed PostgreSQL instance (not local)
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS headers
- [ ] Set up SSL/TLS (HTTPS)
- [ ] Configure rate limiting for production scale
- [ ] Set up monitoring (e.g., Sentry, LogRocket)
- [ ] Configure backup strategy for database
- [ ] Set up CI/CD pipeline
- [ ] Run database migrations on production
- [ ] Test email delivery in production

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard.

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Format code
npm run format

# Database operations
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Run migrations
npx prisma generate        # Generate Prisma Client
npx prisma db seed         # Seed database
```

### Code Quality

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

---

## 👨‍💻 Author

Built with a focus on:
- Production-grade engineering
- Clean architecture
- Real-world backend practices
- Security-first mindset
- Interview-ready design patterns

---

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Prisma** for the excellent ORM
- **Vercel** for hosting and deployment
- **Resend** for reliable email delivery

---


<div align="center">

**Built with ❤️ for the cybersecurity community**

⭐ Star this repo if you find it helpful!

</div>