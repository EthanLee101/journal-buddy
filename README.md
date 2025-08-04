# journal-buddy

A private, secure journaling application with AI-powered insights and mood tracking. Built with Next.js 14, TypeScript, and modern web technologies.

## Features

- **Private Journaling**: Secure, encrypted journal entries
- **AI Insights**: Sentiment analysis and emotional insights using OpenAI
- **Mood Tracking**: Visual mood trends and analytics
- **Modern UI**: Beautiful, responsive interface with dark mode support
- **Authentication**: Secure login with Google and GitHub
- **File Uploads**: Attach images and documents to entries

## Tech Stack

### Frontend
- **Next.js 14** (App Router) - SSR, API routes, excellent TypeScript support
- **TypeScript** - Type safety, better DX, maintainability
- **Tailwind CSS** - Utility-first, fast development, consistent design
- **Shadcn/ui** - High-quality, accessible components
- **React Hook Form + Zod** - Form handling with runtime validation
- **TanStack Query** - Server state management, caching
- **Framer Motion** - Smooth animations for better UX
- **Recharts** - Data visualization for mood tracking

### Backend & Database
- **Next.js API Routes** - Serverless functions, same repo
- **PostgreSQL** (Supabase) - Relational data, JSON support, scalable
- **NextAuth.js v5** - Authentication with multiple providers
- **Uploadthing** - File uploads for journal attachments

### AI & Analytics
- **OpenAI GPT-4** - Sentiment analysis, mood insights
- **Langchain** - AI workflow orchestration
- **Pinecone** - Vector database for semantic search of entries
- **@tensorflow/tfjs** - Client-side emotion detection (optional)
