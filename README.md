# Pathway Infinity  ∞

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Maintainability](https://img.shields.io/badge/Maintainability-A-brightgreen?style=for-the-badge)](https://codeclimate.com)


## Project Overview
**Industry**: Launchpad Philly  
**Developer**: [Mohamed Souare]  
**Completion Date**: June 27th 2025  
**GitHub Repository**: [https://github.com/MO-fr/Pathway-Infinity.git]  

## Business Problem

### Problem Statement
Career guidance and path selection is a critical challenge for many individuals, particularly students and career changers. Traditional career counseling methods are often expensive, not easily accessible, and don't leverage modern technology to provide personalized recommendations. Many people struggle to identify career paths that align with their interests, skills, and personality traits.

### Target Users
- Students preparing to choose their career path
- Professionals looking to switch careers
- Career counselors and educational institutions
- Anyone seeking career guidance and professional direction

### Current Solutions and Limitations
Most existing career guidance solutions rely on static questionnaires or require expensive one-on-one counseling sessions. Digital solutions often lack personalization and don't take advantage of modern AI capabilities to provide nuanced recommendations based on multiple factors.

## Solution Overview

### Project Description
Pathway Infinity is a modern, AI-powered career guidance platform that helps users discover and explore career paths tailored to their unique characteristics. The application combines beautiful UI design with sophisticated AI algorithms to provide personalized career recommendations through an interactive questionnaire system.

### Key Features
- **Interactive Questionnaire**: Dynamic, user-friendly questionnaire that adapts to user responses
- **AI-Powered Recommendations**: Personalized career path suggestions based on user inputs
- **Modern UI/UX**: Clean, responsive design with smooth animations and transitions
- **User Dashboard**: Personalized space to save and track career recommendations
- **Career Path Exploration**: Detailed information about various career paths and requirements

### Value Proposition
Pathway Infinity makes career guidance accessible, personalized, and engaging through:
- Modern, intuitive interface
- AI-powered personalization
- Comprehensive career path information
- Seamless user experience across devices

### Technology Stack

#### Frontend & UI
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-ff69b4?style=flat-square&logo=framer)](https://www.framer.com/motion/)

#### Styling
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![PostCSS](https://img.shields.io/badge/PostCSS-8.0-dd3a0a?style=flat-square&logo=postcss)](https://postcss.org/)

#### Database & ORM
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-316192?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon-Serverless-orange?style=flat-square)](https://neon.tech/)

#### Authentication & Security
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-latest-black?style=flat-square)](https://next-auth.js.org/)
[![bcrypt](https://img.shields.io/badge/bcrypt-latest-purple?style=flat-square)](https://www.npmjs.com/package/bcrypt)

#### Development Tools
[![ESLint](https://img.shields.io/badge/ESLint-8.0-4B32C3?style=flat-square&logo=eslint)](https://eslint.org/)
[![Git](https://img.shields.io/badge/Git-latest-F05032?style=flat-square&logo=git)](https://git-scm.com/)
[![npm](https://img.shields.io/badge/npm-latest-CB3837?style=flat-square&logo=npm)](https://www.npmjs.com/)

## Technical Implementation

### Current Features
1. **User Authentication**:
   - Secure signup and login functionality
   - Session management with NextAuth.js
   - Protected routes and middleware
   - Automatic redirect to dashboard after authentication

2. **Landing Page**:
   - Modern, animated hero section
   - Feature highlights
   - How it works section
   - Smooth scrolling navigation
   - Call-to-action buttons

3. **Dashboard**:
   - Streamlined two-card layout
   - Career quiz quick access
   - Direct link to saved programs
   - Personalized welcome message
   - Clean, centered design

4. **Results Management**:
   - Save quiz results functionality
   - Toast notifications for success/error feedback
   - View saved results in dedicated page
   - Individual result detail pages
   - Protected result access (user-specific)

5. **User Experience Improvements**:
   - Toast notifications for user feedback
   - Responsive design across all devices
   - Loading states with smooth animations
   - Error handling with user-friendly messages
   - Consistent styling throughout

### Recent Updates (July 2025)
1. **Enhanced Results Display**:
   - Added detailed AI analysis section in saved results
   - Improved school matches presentation with colored borders
   - Added comprehensive school information display (industries, program length, housing, cost)
   - Included direct website links for each school

2. **UI/UX Improvements**:
   - Added visual separation between school cards with mint-colored borders
   - Simplified footer design for better focus
   - Enhanced mobile responsiveness
   - Improved readability with better spacing and typography

3. **Technical Enhancements**:
   - Updated dependencies
   - Improved error handling
   - Added proper TypeScript types
   - Enhanced API route security

4. **Navigation**:
   - Responsive navbar with mobile menu
   - User session status display
   - Smooth transitions between pages
   - Protected route handling

5. **Career Quiz**:
   - Distraction-free, 6-question quiz
   - One question at a time, with smooth transitions
   - Visual progress bar
   - Mobile-friendly layout

6. **Results Page**:
   - Displays comprehensive AI analysis
   - Shows detailed school matches with complete information
   - Interactive school cards with hover effects
   - Direct links to school websites
   - Clean, responsive UI with proper visual hierarchy
   - Fallback handling for missing data

### Database Schema
```prisma
// Current implemented schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String      @id @default(cuid())
  email         String      @unique
  name          String
  password      String
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  savedPrograms Program[]
}

model Program {
  id          String    @id @default(cuid())
  title       String
  description String
  type        String
  duration    String
  cost        String?
  location    String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  users       User[]
}
```

### Environment Setup
Required environment variables in `.env`:
```env
# Database Configuration
DATABASE_URL="postgresql://[username]:[password]@[host]/pathway-infinity?sslmode=require"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3001"

# Optional Features
AI_API_KEY="your-api-key"  # If implementing AI features
```

Make sure to:
1. Replace the DATABASE_URL with your actual database connection string
2. Generate a secure NEXTAUTH_SECRET for production
3. Update NEXTAUTH_URL based on your deployment environment

### User Interface Elements
- Modern gradient backgrounds
- Glassmorphism effects
- Smooth animations
- Responsive design
- Custom scrollbar styling
- Interactive UI components

## Setup and Installation

1. Clone the repository
```bash
git clone [https://github.com/MO-fr/Pathway-Infinity.git]
cd pathway-infinity
```

2. Install dependencies
```bash
npm install
```

3. Set up your environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database
```bash
npx prisma generate
npx prisma migrate deploy
```

5. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## 🚀 Current Status (as of June 2025)

### Major Features (Complete)
- **Distraction-Free Career Quiz**: 6-question, one-at-a-time quiz with smooth transitions, mobile-friendly layout, and a visual progress bar.
- **Results Page**: Personalized career path recommendations based on quiz answers, with a clean, responsive UI and fallback handling for missing data.
- **Navbar Hides on Quiz/Results**: Navbar is automatically hidden during the quiz and results for a focused experience.
- **State Management**: Uses React state and sessionStorage for quiz flow and answer persistence.
- **No Lint Errors**: Codebase is clean, with no unused variables or imports, and follows project coding standards.
- **Modern, Accessible UI**: All pages are responsive, simple, and easy to use for non-technical students.

### User Flow
1. **Dashboard**: User lands on a dashboard with options to start the career quiz, view saved programs, or start over.
2. **Quiz**: User answers 6 questions, one at a time, with animated transitions and a step indicator.
3. **Results**: After the last question, answers are processed and the user is shown their top two career path matches.
4. **Navigation**: User can return to dashboard, retake the quiz, or explore recommended programs.

### Technical Highlights
- **Next.js 14+ / React 18+**
- **Framer Motion** for smooth UI transitions
- **Tailwind CSS** for styling
- **NextAuth.js** for authentication
- **Prisma + PostgreSQL** for data
- **No new libraries added without approval**
- **All code documented and production-grade**

### Recently Completed
- ✅ Career quiz and results page fully implemented
- ✅ Navbar hides on quiz/results routes
- ✅ All ESLint issues resolved
- ✅ Mobile and desktop UI tested

### In Progress / Next Steps
- 🔄 AI-powered program matching (future)
- 🔄 User profile customization
- 🔄 Program comparison tools
- 🔄 Progress tracking

---

For setup, contribution, and deployment instructions, see below.

## Contributing
Contributions, issues, and feature requests are welcome!

## License
[MIT]

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## How the Site Works

Pathway Infinity is designed to guide users through a seamless experience for exploring career paths and educational opportunities. Here's how the site works:

1. **Homepage**:
   - Users are greeted with a visually appealing homepage featuring sections like Hero, Features, and How It Works.
   - The Animated Background and CTA Section encourage users to engage with the platform.

2. **Authentication**:
   - Users can sign up or log in using the NextAuth authentication system.
   - Secure routes ensure user data is protected.

3. **Dashboard**:
   - After logging in, users access a personalized dashboard displaying saved career paths and educational programs.

4. **Quiz**:
   - Users can take a questionnaire to analyze their interests and receive tailored career recommendations.
   - The Quiz Progress component tracks their progress.

5. **Results**:
   - The results page displays career paths and educational programs based on the quiz analysis.

6. **Saved Items**:
   - Users can save career paths and programs for future reference.

7. **Responsive Design**:
   - The site is fully responsive, ensuring a smooth experience across devices.

8. **Technology Stack**:
   - Built with Next.js, React, Tailwind CSS, Prisma, and PostgreSQL.
   - PostCSS and Tailwind handle styling, while Prisma manages database interactions.

9. **Global State Management**:
   - Zustand and React Context API are used for managing shared state across components.

10. **Deployment**:
    - The site is configured to work both locally and online, ensuring accessibility for all users.
