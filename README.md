# Pathway Infinity

## Project Overview
**Industry**: Launchpad Philly  
**Developer**: [Mohamed Souare]  
**Completion Date**: June 27th 2025  
**GitHub Repository**: [Your repository URL]  

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
- **Frontend**: Next.js 14 +, React
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Custom components with modern design
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Deployment**: [Platform to be determined]
- **Other Tools**: 
  - Font: Nunito
  - Animations: Custom CSS animations
  - Version Control: Git

## Technical Implementation

### Key Components
1. **HeroSection**: Main landing page component with animated background
2. **AnimatedBackground**: Dynamic visual element for enhanced user experience
3. **Questionnaire**: Interactive career assessment system
4. **User Authentication**: Secure login and signup functionality
5. **Dashboard**: Personal user space for saved career paths
6. **Results Display**: Detailed career recommendations presentation

### Database Schema
```prisma
// Current schema structure
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Models to be implemented
```

### Environment Variables
Required environment variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/pathways_infinity_db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
AI_API_KEY="your-api-key"
```

### User Interface Elements
- Modern gradient backgrounds
- Glassmorphism effects
- Smooth animations
- Responsive design
- Custom scrollbar styling
- Interactive UI components

## Setup Instructions

1. Clone the repository
```bash
git clone [your-repo-url]
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001) with your browser

## Current Status and Future Enhancements

### Implemented Features
- Modern, responsive UI design
- Landing page with animated components
- Basic routing structure
- UI components library
- Styling system with Tailwind CSS
- Animation system with Framer Motion

### Planned Features
- AI integration for career recommendations
- User authentication system
- Personal dashboard
- Career path database
- Result saving functionality
- Advanced analytics

## Contributing
Contributions, issues, and feature requests are welcome!

## License
[Your chosen license]

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
