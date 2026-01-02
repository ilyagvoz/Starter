# Modern Full-Stack Monorepo Starter

A high-performance, type-safe, and scalable full-stack web application starter kit using the latest industry best practices. Built with **Turborepo**, **Bun**, **Hono**, **React**, and **Drizzle ORM**.

## 🚀 Tech Stack

| Category            | Choice                                                    | Description                                                       |
| :------------------ | :-------------------------------------------------------- | :---------------------------------------------------------------- |
| **Monorepo**        | [Turborepo](https://turbo.build/)                         | High-performance build system for TypeScript monorepos.           |
| **Package Manager** | [pnpm](https://pnpm.io/)                                  | Fast, disk-efficient package manager.                             |
| **Runtime**         | [Bun](https://bun.sh/)                                    | Ultra-fast JavaScript runtime for backend and scripts.            |
| **Frontend**        | [React](https://react.dev/) + [Vite](https://vitejs.dev/) | Modern UI library with instant HMR and optimized builds.          |
| **Backend**         | [Hono](https://hono.dev/)                                 | Small, fast web framework running on Bun.                         |
| **Database**        | [libsql](https://github.com/tursodatabase/libsql)         | Open-source fork of SQLite, edge-ready and compatible with Turso. |
| **ORM**             | [Drizzle ORM](https://orm.drizzle.team/)                  | TypeScript-first ORM with great inference.                        |
| **Validation**      | [Zod](https://zod.dev/)                                   | Schema validation for API inputs, env vars, and shared types.     |
| **Authentication**  | [Hono JWT](https://hono.dev/helpers/jwt)                  | JSON Web Token based authentication with password hashing.        |
| **Styling**         | [Tailwind CSS](https://tailwindcss.com/)                  | Utility-first CSS framework.                                      |
| **CI/CD**           | GitHub Actions                                            | Automated workflows for linting and building.                     |

## 📂 Project Structure

```text
starter/
├── .github/                 # CI/CD workflows
├── apps/
│   ├── api/                 # Backend (Bun + Hono + Drizzle)
│   │   ├── src/
│   │   │   ├── db/          # Database schema & client
│   │   │   ├── env.ts       # Type-safe env validation
│   │   │   └── index.ts     # App entry point
│   │   └── package.json
│   └── web/                 # Frontend (React + Vite + Tailwind)
│       ├── src/
│       │   ├── components/  # UI Components
│       │   ├── lib/         # Utils
│       │   └── App.tsx
│       └── package.json
├── packages/
│   ├── shared/              # Shared logic (Zod schemas, types)
│   ├── eslint-config/       # Shared ESLint configurations
│   ├── tailwind-config/     # Shared Tailwind configuration
│   └── tsconfig/            # Shared TypeScript base configs
├── turbo.json               # Pipeline configuration
├── package.json             # Root manifest
└── pnpm-workspace.yaml      # Workspace definition
```

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- [pnpm](https://pnpm.io) (v8+)
- Node.js (v18+ for tooling compatibility)

### Installation

1.  **Install dependencies**:

    ```bash
    pnpm install
    ```

2.  **Environment Setup**:
    Copy the example environment file for the API.

    ```bash
    cp apps/api/.env.example apps/api/.env
    ```

3.  **Database Setup**:
    Initialize the local SQLite database.
    ```bash
    cd apps/api
    pnpm db:push
    # Optional: Seed data
    pnpm db:seed
    ```

### Running the App

Start both the backend and frontend in development mode:

```bash
pnpm dev
```

- **API**: http://localhost:3111
- **Web**: http://localhost:3100

## 📦 Scripts

- `pnpm dev`: Start development servers for all apps.
- `pnpm build`: Build all apps and packages.
- `pnpm lint`: Lint all apps and packages.
- `pnpm typecheck`: Run TypeScript checks across the workspace.
- `pnpm format`: Format code with Prettier.
- `pnpm update-deps`: Recursive update of all dependencies.

## 🔒 Type Safety Features

- **Shared Schemas**: Zod schemas defined in `packages/shared` are imported by both `apps/api` (for request validation) and `apps/web` (for form validation).
- **Env Validation**: `apps/api/src/env.ts` ensures the application fails fast if required environment variables are missing.
  | **Authentication** | [Hono JWT](https://hono.dev/helpers/jwt) | JSON Web Token based authentication with password hashing.
- **Strict TypeScript**: Configured with strict mode enabled via `packages/tsconfig`.

## ✨ Features

- **Full-Stack Authentication**: Complete Register/Login flow with JWT and `Bun.password` hashing.
- **Type-Safe API Client**: Hono RPC client for end-to-end type safety.
- **Protected Routes**: React Context based auth state and protected route examples.

## 🧪 Testing

The project employs a comprehensive testing strategy:

- **Backend (`apps/api`)**: Integration tests using `bun:test` and an in-memory SQLite database.
- **Frontend (`apps/web`)**: Component tests using `vitest`, `@testing-library/react`, and `jsdom`.
- **Shared Packages**: Unit tests for schemas and utilities using `bun:test`.

Run all tests with:

```bash
pnpm test
```
