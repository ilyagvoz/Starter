# Modern Full-Stack Monorepo Starter Plan

## 1. Goal
Create a high-performance, type-safe, and scalable full-stack web application starter kit using the latest industry best practices. This monorepo will serve as a foundation for rapid prototyping and production-ready applications.

## 2. Tech Stack Recommendations

| Category | Choice | Rationale |
| :--- | :--- | :--- |
| **Monorepo Tool** | **Turborepo** | Industry standard for TS monorepos. Fast task scheduling and intelligent caching. Works seamlessly with package managers. |
| **Package Manager** | **pnpm** | Extremely fast, efficient disk usage via content-addressable storage, and strict workspace isolation. |
| **Runtime** | **Bun** | Ultra-fast JavaScript runtime. Replaces Node.js for the backend and scripts. Validated as a modern choice for performance. |
| **Frontend** | **React + Vite** | React is the ecosystem king. Vite provides near-instant HMR (Hot Module Replacement) and optimized builds. |
| **Backend** | **Hono** | A small, ultra-fast web framework that runs on any runtime (Bun, Node, Edge). deeply integrated TypeScript support. Preferable over Express for new projects. |
| **Language** | **TypeScript** | Strict typing across the entire stack. Shared types between frontend and backend. |
| **Database** | **libsql** | An open-source fork of SQLite. It is **Edge-ready**, supports remote connections, and is highly portable across Bun, Node, and Cloudflare Workers. |
| **ORM** | **Drizzle ORM** | Lightweight, "if you know SQL, you know Drizzle" philosophy. Best-in-class TypeScript inference. Configured for `drizzle-orm/libsql`. |
| **Validation** | **Zod** | TypeScript-first schema validation. We will define schemas in a shared package to validate API inputs (backend) and forms (frontend) with the exact same code. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework. Best practice for maintainable, co-located styling in components. |
| **State Mgt** | **TanStack Query** | (React Query) The standard for server state management (caching, fetching) on the frontend. |
| **Linting** | **ESLint + Prettier** | The battle-tested standard for code quality and formatting. |

## 3. Architecture & Monorepo Structure

We will separate the application into **apps** (deployable units) and **packages** (shared internal libraries).

### Proposed Folder Structure

```text
starter/
├── apps/
│   ├── web/                 # React Frontend (Vite)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── api/                 # Bun + Hono Backend
│       ├── src/
│       │   ├── db/          # Drizzle setup (libsql) & schema
│       │   ├── routes/
│       │   └── index.ts
│       └── package.json
├── packages/
│   ├── shared/              # Shared Code (The "Glue")
│   │   ├── src/
│   │   │   └── schema.ts    # Zod schemas shared by API & Web
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── ui/                  # Shared UI Component Library (Optional but Recommended)
│   │   ├── src/             # Reusable React + Tailwind components
│   │   └── package.json
│   ├── config/              # Shared configurations
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── tailwind/
│   │   └── package.json
├── .github/                 # CI/CD workflows
├── turbo.json               # Turborepo pipeline config
├── package.json             # Root manifest
├── pnpm-workspace.yaml      # Workspace definition
└── README.md
```

## 4. Key Best Practices to Implement

### Type Safety End-to-End
*   Define Zod schemas in `packages/shared`.
*   Import schemas in `apps/api` to validate incoming requests.
*   Import schemas in `apps/web` to validate forms (e.g., using `react-hook-form` + `@hookform/resolvers/zod`).
*   Export TypeScript types inferred from Zod schemas for full intellisense.

### Environment Management
*   Use a strictly typed environment variable validator (using Zod) to ensure the app doesn't crash at runtime due to missing keys.

### Development Experience (DX)
*   **Edge-Ready DB**: Using `libsql` allows for local file-based development while being 100% compatible with remote Turso databases for production.
*   **Single Command Start**: `pnpm dev` at root should start the backend and frontend concurrently.

## 5. Implementation Roadmap

1.  **Scaffold Monorepo**: Initialize git, pnpm workspace, and Turborepo.
2.  **Config Packages**: Set up shared `tsconfig`, `eslint`, and `tailwind` configurations.
3.  **Backend Setup**: Initialize `apps/api` with Bun and Hono.
4.  **Database Setup**: Configure Drizzle ORM with `@libsql/client`.
5.  **Shared Library**: Create `packages/shared` with initial Zod schemas.
6.  **Frontend Setup**: Initialize `apps/web` with Vite, React, and Tailwind.
7.  **Integration**: Connect Frontend to Backend using TanStack Query and shared types.
