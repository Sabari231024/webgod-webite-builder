# src Directory

This directory contains the main source code for the WebGod Website Builder. It is organized into feature modules, UI components, hooks, and supporting libraries.

## Structure
- `app/` - Next.js app directory (pages, layouts, API routes)
- `components/` - Reusable UI components
- `generated/` - Generated code (e.g., Prisma client)
- `hooks/` - Custom React hooks
- `inngest/` - Event-driven functions and integrations
- `lib/` - Utility functions and database access
- `modules/` - Feature modules (projects, messages, usage, etc.)
- `trpc/` - tRPC integration for type-safe APIs
- `types.ts` - Shared TypeScript types
- `prompt.ts` - System prompt for AI agent
- `middleware.ts` - Next.js middleware

## Required npm Modules
- next
- react
- @tanstack/react-query
- zod
- lucide-react
- @clerk/nextjs
- @inngest/agent-kit
- @e2b/code-interpreter
- tailwindcss
- shadcn/ui
- prisma
- superjson
- class-variance-authority
- rate-limiter-flexible

## Functionality
Each subdirectory contains its own documentation file describing its purpose and the functionality of its files.