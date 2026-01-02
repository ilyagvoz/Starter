import { Badge } from "../components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Check, Code2, Layers, Zap } from "lucide-react";

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-8 text-slate-200">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
          World-Class <span className="text-indigo-500">Tech Stack</span>
        </h1>
        <p className="text-slate-400">
          Curated choices for maximum performance and developer experience.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <TechCard
          title="Turborepo"
          description="High-performance build system for TypeScript monorepos."
          icon={<Layers className="h-6 w-6 text-purple-500" />}
        />
        <TechCard
          title="Bun Runtime"
          description="Ultra-fast JavaScript runtime for backend and scripts. Drop-in Node.js replacement."
          icon={<Zap className="h-6 w-6 text-yellow-500" />}
        />
        <TechCard
          title="Hono"
          description="Small, fast web framework. Runs on Bun, Node, and Edge environments."
          icon={<Code2 className="h-6 w-6 text-orange-500" />}
        />
        <TechCard
          title="React + Vite"
          description="Modern UI library with instant HMR and optimized builds."
          icon={<Code2 className="h-6 w-6 text-blue-500" />}
        />
        <TechCard
          title="Drizzle ORM"
          description="TypeScript-first ORM with great inference. If you know SQL, you know Drizzle."
          icon={<Code2 className="h-6 w-6 text-green-500" />}
        />
        <TechCard
          title="Zod"
          description="Schema validation for API inputs, env vars, and shared types."
          icon={<Check className="h-6 w-6 text-indigo-500" />}
        />
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          Type Safety Features
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureHighlight
            title="Shared Schemas"
            description="Zod schemas defined in `packages/shared` are imported by both `apps/api` (backend validation) and `apps/web` (frontend forms)."
          />
          <FeatureHighlight
            title="Env Validation"
            description="Strict environment variable validation ensures the application fails fast if keys are missing."
          />
          <FeatureHighlight
            title="Strict TypeScript"
            description="Configured with strict mode enabled via `packages/tsconfig` for maximum safety."
          />
        </div>
      </div>
    </div>
  );
}

function TechCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function FeatureHighlight({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-6">
      <Badge
        variant="outline"
        className="mb-3 text-indigo-400 border-indigo-500/30"
      >
        {title}
      </Badge>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
