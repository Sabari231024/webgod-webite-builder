
# WebGod Website Builder

WebGod is a modern, full-stack website builder application built with Next.js, TypeScript, and Prisma. It provides a flexible platform for creating, managing, and deploying web projects with a rich set of UI components and integrations.

## Features
- Next.js app directory structure
- TypeScript for type safety
- Modular UI components (Accordion, Dialog, Table, etc.)
- Prisma ORM for database management
- API routes for backend logic
- Project management module
- Hooks and utilities for enhanced functionality

## Project Structure
- `src/` - Main source code
  - `app/` - Next.js app directory
  - `components/` - Reusable UI components
  - `modules/` - Feature modules (e.g., projects, messages)
  - `lib/` - Utility functions and database access
  - `hooks/` - Custom React hooks
  - `trpc/` - tRPC integration for type-safe APIs
  - `inngest/` - Event-driven functions
- `prisma/` - Prisma schema and migrations
- `public/` - Static assets

## Getting Started
1. Install dependencies:
	```cmd
	npm install
	```
2. Set up the database:
	```cmd
	npx prisma migrate dev
	```
3. Run the development server:
	```cmd
	npm run dev
	```

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## License
MIT
