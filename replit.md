# LinuxHelper - Command Search Application

## Overview

LinuxHelper is a web application that helps users find and understand Linux commands through natural language search. The application features a modern React frontend with a clean, responsive design and an Express.js backend that serves command data. Users can search for commands using everyday language and filter by categories like files, processes, network, and system operations.

## Recent Changes

- **July 29, 2025**: 
  - **Major Database Migration**: Replaced in-memory storage with PostgreSQL database using Drizzle ORM
  - **Improved Search Algorithm**: Enhanced search precision to show only relevant results, filtering out common words
  - **Export to Bash Scripts**: Added functionality to export selected commands to executable bash scripts
  - **Expanded Command Database**: Added 75+ comprehensive Linux commands covering:
    - File operations: cp, mv, rm, cat, ls, mkdir, du, nano, grep, find, zip/unzip, chmod, chown, head, tail
    - Process management: ps, htop, pstree, kill, renice, nohup, jobs, lsof by process
    - System monitoring: uptime, uname, who, systemctl, journalctl, history, env, lscpu, meminfo
    - System updates: apt update/upgrade/dist-upgrade, yum update, dnf upgrade, pacman -Syu, zypper update, autoremove/autoclean
    - Network tools: ping, wget, traceroute, lsof, ip addr/route, curl, netstat, telnet, ssh, scp
    - Each command includes detailed Polish explanations, parameter breakdowns, and comprehensive keywords for better search matching
  - **Database Architecture**: Migrated from MemStorage to DatabaseStorage with full CRUD operations
  - **Data Persistence**: All commands now stored in PostgreSQL with proper schema and migrations
  - **Search Precision**: Returns empty results for non-matching queries, shows relevant commands only

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints for command search and retrieval
- **Development**: Hot module replacement with Vite integration

### Key Design Decisions

**Monorepo Structure**: The application uses a shared workspace structure with separate `client/`, `server/`, and `shared/` directories. This allows for type sharing between frontend and backend while maintaining clear separation of concerns.

**Database Strategy**: Uses Drizzle ORM with PostgreSQL for type-safe database operations. The schema defines commands with structured metadata including parameters, keywords, and categories for effective search functionality.

**UI Component Strategy**: Leverages shadcn/ui for consistent, accessible components with a modern design system. The components are built on Radix UI for robust accessibility features.

## Key Components

### Frontend Components
- **Header**: Application branding and navigation
- **SearchSection**: Natural language search input with real-time search
- **CategoryFilters**: Filter commands by category (files, processes, network, system)
- **CommandResultCard**: Display command details with copy functionality and parameter explanations

### Backend Components
- **Storage Layer**: Abstract storage interface with in-memory implementation for development
- **Route Handlers**: RESTful endpoints for command search and retrieval
- **Database Schema**: Structured command storage with metadata

### Shared Types
- **Command Schema**: Defines command structure with title, command, category, description, explanation, parameters, and keywords
- **User Schema**: Basic user structure for potential authentication features

## Data Flow

1. **Search Flow**: User enters natural language query → Frontend debounces input → API call to `/api/commands/search` → Backend searches commands by query and category → Results returned and displayed
2. **Category Filtering**: User selects category → Frontend updates active category → API call with category filter → Filtered results displayed
3. **Command Interaction**: User views command card → Can copy command to clipboard → Toast notification for user feedback

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Libraries**: Radix UI components, Lucide React icons
- **Utilities**: TanStack Query, date-fns, clsx, class-variance-authority
- **Development**: TypeScript, Vite, Tailwind CSS

### Backend Dependencies
- **Server**: Express.js, Node.js
- **Database**: Drizzle ORM, @neondatabase/serverless, connect-pg-simple
- **Utilities**: Zod for validation, nanoid for ID generation
- **Development**: tsx for TypeScript execution, esbuild for production builds

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx for TypeScript execution with automatic restarts
- **Database**: Neon Database connection with environment-based configuration

### Production
- **Build Process**: Vite builds frontend to `dist/public`, esbuild bundles backend to `dist/index.js`
- **Static Serving**: Express serves built frontend files in production
- **Database**: Production PostgreSQL via Neon Database with connection pooling

### Configuration
- **Environment Variables**: `DATABASE_URL` for database connection
- **Build Scripts**: Separate build commands for frontend and backend with external package bundling
- **Database Migrations**: Drizzle Kit handles schema migrations with `db:push` command

The application is designed to be easily deployable to platforms like Replit, Vercel, or similar hosting services with minimal configuration required.