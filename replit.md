# Apex Coach - AI-Powered Fitness Dashboard

## Overview

Apex Coach is a modern fitness tracking application that provides users with comprehensive health and fitness monitoring through an AI-powered dashboard. The application features real-time fitness metrics tracking, workout planning, nutrition monitoring, goal setting, and personalized AI recommendations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with custom Tailwind CSS styling
- **Theme System**: Custom theme provider with dark/light mode support
- **Grid Layout**: React Grid Layout for customizable dashboard widgets

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **API**: RESTful API with JSON responses
- **Development**: Hot reloading with Vite integration

## Key Components

### Database Layer
- **Users**: User profiles with membership tiers and authentication
- **Fitness Metrics**: Daily health data (steps, calories, HRV, sleep)
- **Workouts**: Exercise sessions with detailed tracking
- **Nutrition**: Daily nutritional intake monitoring
- **Goals**: User-defined fitness objectives with progress tracking
- **AI Recommendations**: Personalized coaching insights
- **Dashboard Layouts**: Customizable widget arrangements

### Widget System
- **Draggable Widgets**: Interactive dashboard components using React Grid Layout
- **Responsive Design**: Adaptive layouts for different screen sizes
- **Real-time Updates**: Live data synchronization with 30-second refresh intervals
- **Customization**: User-configurable widget positioning and sizing

### AI Integration
- **Recommendation Engine**: Contextual fitness and nutrition advice
- **Performance Analysis**: Trend analysis and improvement suggestions
- **Personalization**: Adaptive recommendations based on user behavior

## Data Flow

1. **User Authentication**: Session-based authentication with secure user management
2. **Data Collection**: Fitness metrics ingested from various sources
3. **Real-time Processing**: Live updates through React Query with optimistic updates
4. **AI Analysis**: Background processing of user data for recommendations
5. **Dashboard Rendering**: Dynamic widget layout with responsive grid system
6. **State Persistence**: Layout preferences and user settings stored in database

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Router via Wouter)
- TanStack Query for advanced data fetching and caching
- Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)

### UI and Styling
- Radix UI component library for accessible primitives
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- React Grid Layout for dashboard widget management

### Development Tools
- Vite for fast development and building
- TypeScript for type safety
- ESBuild for production bundling
- PostCSS with Autoprefixer for CSS processing

## Deployment Strategy

### Development Environment
- **Runtime**: Replit with Node.js 20
- **Database**: PostgreSQL 16 with automatic provisioning
- **Hot Reloading**: Vite development server with HMR
- **Port Configuration**: Port 5000 for development, port 80 for production

### Production Build
- **Frontend**: Vite build generating optimized static assets
- **Backend**: ESBuild bundling server code for Node.js production
- **Database**: Drizzle Kit for schema migrations and management
- **Deployment**: Autoscale deployment target on Replit

### Environment Configuration
- Database URL configuration through environment variables
- Separate development and production build processes
- Automatic database schema synchronization

## Changelog
- June 26, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.