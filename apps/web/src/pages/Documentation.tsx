import { Card, CardContent } from "../components/ui/Card";
import { Terminal } from "lucide-react";

export default function Documentation() {
  return (
    <div className="container mx-auto px-4 py-8 text-foreground max-w-4xl">
      <div className="mb-10 border-b border-border pb-8">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          Documentation
        </h1>
        <p className="text-xl text-muted-foreground">
          Getting started with the Start Monorepo.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Project Structure
        </h2>
        <Card className="border-border bg-muted/30 font-mono text-sm text-muted-foreground">
          <CardContent className="pt-6 overflow-x-auto">
            <pre className="text-foreground">{`starter/
├── .github/                 # CI/CD workflows
├── apps/
│   ├── api/                 # Backend (Bun + Hono + Drizzle)
│   ├── web/                 # Frontend (React + Vite + Tailwind)
├── packages/
│   ├── shared/              # Shared logic (Zod schemas, types)
│   ├── eslint-config/       # Shared ESLint configurations
│   ├── tailwind-config/     # Shared Tailwind configuration
│   └── tsconfig/            # Shared TypeScript base configs
├── turbo.json               # Pipeline configuration
└── pnpm-workspace.yaml      # Workspace definition`}</pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Getting Started
        </h2>

        <div className="space-y-8">
          <Step number={1} title="Install Dependencies" code="pnpm install" />
          <Step
            number={2}
            title="Environment Setup"
            description="Copy the example environment file for the API."
            code="cp apps/api/.env.example apps/api/.env"
          />
          <Step
            number={3}
            title="Database Setup"
            description="Initialize the local SQLite database and seed it."
            code={`cd apps/api
pnpm db:push
pnpm db:seed`}
          />
          <Step
            number={4}
            title="Run the App"
            description="Start both the backend and frontend in development mode."
            code="pnpm dev"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Authentication
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            The project comes with a complete authentication system out of the
            box.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Backend:</strong> Uses{" "}
              <code className="bg-muted px-1 rounded">hono/jwt</code> for token
              generation and{" "}
              <code className="bg-muted px-1 rounded">Bun.password</code> for
              secure hashing.
            </li>
            <li>
              <strong className="text-foreground">Frontend:</strong> Includes{" "}
              <code className="bg-muted px-1 rounded">AuthContext</code> for
              managing session state and persisting tokens in LocalStorage.
            </li>
            <li>
              <strong className="text-foreground">Type Safety:</strong> Shared
              Zod schemas for registration and login validation across API and
              UI.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Testing</h2>
        <p className="text-muted-foreground mb-4">
          The monorepo ensures reliability through a multi-layer testing
          strategy.
        </p>
        <div className="space-y-4 text-muted-foreground">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">API Integration:</strong>{" "}
              Tests in <code className="bg-muted px-1 rounded">apps/api</code>{" "}
              run with <code className="bg-muted px-1 rounded">bun:test</code>{" "}
              using an in-memory SQLite instance for fast, isolated execution.
            </li>
            <li>
              <strong className="text-foreground">Frontend Components:</strong>{" "}
              Tests in <code className="bg-muted px-1 rounded">apps/web</code>{" "}
              use <code className="bg-muted px-1 rounded">vitest</code> and{" "}
              <code className="bg-muted px-1 rounded">
                @testing-library/react
              </code>{" "}
              to verify UI behavior and state.
            </li>
            <li>
              <strong className="text-foreground">Shared Logic:</strong> Schemas
              and utilities in{" "}
              <code className="bg-muted px-1 rounded">packages/shared</code> are
              unit tested to ensure consistency across the stack.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Available Scripts
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ScriptCard
            cmd="pnpm dev"
            desc="Start development servers for all apps."
          />
          <ScriptCard cmd="pnpm build" desc="Build all apps and packages." />
          <ScriptCard cmd="pnpm lint" desc="Lint all apps and packages." />
          <ScriptCard
            cmd="pnpm typecheck"
            desc="Run TypeScript checks across the workspace."
          />
          <ScriptCard
            cmd="pnpm update-deps"
            desc="Update all dependencies recursively."
          />
        </div>
      </section>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  code,
}: {
  number: number;
  title: string;
  description?: string;
  code: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 font-bold border border-indigo-600/20 shadow-sm">
        {number}
      </div>
      <div className="flex-1 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        )}
        <div className="relative rounded-lg bg-muted/50 p-4 border border-border">
          <pre className="font-mono text-sm text-foreground overflow-x-auto">
            {code}
          </pre>
        </div>
      </div>
    </div>
  );
}

function ScriptCard({ cmd, desc }: { cmd: string; desc: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4 flex items-center gap-4 transition-colors hover:bg-muted/50">
      <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded bg-muted border border-border">
        <Terminal className="h-5 w-5 text-indigo-500" />
      </div>
      <div>
        <div className="font-mono text-sm font-bold text-foreground">{cmd}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
