# Modern Full-Stack Monorepo Starter

A high-performance, type-safe, and scalable full-stack web application starter kit using the latest industry best practices. Built with **Turborepo**, **Bun**, **Hono**, **React**, and **Drizzle ORM**.

## 🚀 Tech Stack

| Category            | Choice                                                    | Description                                                       |
| :------------------ | :-------------------------------------------------------- | :---------------------------------------------------------------- |
| **Monorepo**        | [Turborepo](https://turbo.build/)                         | High-performance build system for TypeScript monorepos.           |
| **Package Manager** | [pnpm](https://pnpm.io/)                                  | Fast, disk-efficient package manager.                             |
| **Runtime**         | [Bun](https://bun.sh/)                                    | Ultra-fast JavaScript runtime for backend and scripts.            |
| **Frontend**        | [React](https://react.dev/) + [Vite](https://vitejs.dev/) | Modern UI library with instant HMR and optimized builds.          |
| **UI Components**   | [Base UI](https://base-ui.com/)                           | Accessible, unstyled React components and primitives.             |
| **Backend**         | [Hono](https://hono.dev/)                                 | Small, fast web framework running on Bun.                         |
| **Database**        | [libsql](https://github.com/tursodatabase/libsql)         | Open-source fork of SQLite, edge-ready and compatible with Turso. |
| **ORM**             | [Drizzle ORM](https://orm.drizzle.team/)                  | TypeScript-first ORM with great inference.                        |
| **Validation**      | [Zod](https://zod.dev/)                                   | Schema validation for API inputs, env vars, and shared types.     |
| **Authentication**  | [Hono JWT](https://hono.dev/helpers/jwt)                  | JSON Web Token based authentication with password hashing.        |
| **Styling**         | [Tailwind CSS](https://tailwindcss.com/)                  | Utility-first CSS framework with full Light/Dark mode support.    |
| **CI/CD**           | GitHub Actions                                            | Automated workflows for linting and building.                     |

## 📂 Project Structure

```text
starter/
├── .gemini/                 # AI agent context files (Base UI, etc.)
├── .github/                 # CI/CD workflows
├── apps/
│   ├── api/                 # Backend (Bun + Hono + Drizzle)
│   └── web/                 # Frontend (React + Vite + Tailwind)
├── packages/
│   ├── shared/              # Shared logic (Zod schemas, types)
│   ├── eslint-config/       # Shared ESLint configurations
│   ├── tailwind-config/     # Shared Tailwind configuration
│   └── tsconfig/            # Shared TypeScript base configs
├── AGENTS.md                # AI Agent guidelines and resource map
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

## ✨ Key Features

- **Full-Stack Authentication**: Complete Register/Login flow with JWT and `Bun.password` hashing.
- **Accessible UI**: Powered by **Base UI**, ensuring W3C ARIA compliance and high-quality UX.
- **Dark Mode**: Native support for Light and Dark modes using Tailwind CSS variables.
- **Type-Safe API**: Hono RPC client for end-to-end type safety between backend and frontend.
- **Shared Schemas**: Zod schemas defined in `packages/shared` for consistent validation across the stack.

## 🧪 Testing

The project employs a comprehensive testing strategy:

- **Backend (`apps/api`)**: Integration tests using `bun:test` and an in-memory SQLite database.
- **Frontend (`apps/web`)**: Component tests using `vitest`, `@testing-library/react`, and `jsdom`.
- **Shared Packages**: Unit tests for schemas and utilities using `bun:test`.

Run all tests with:

```bash
pnpm test
```
