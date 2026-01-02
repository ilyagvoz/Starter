import { Badge } from "../components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Code2, Layers, Zap, Database, Shield } from "lucide-react";
import { InlineCode } from "../components/ui/InlineCode";

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-8 text-foreground">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
          World-Class <span className="text-indigo-500">Tech Stack</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Curated choices for maximum performance and developer experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <TechCard
          title="Turborepo"
          description="High-performance build system for TypeScript monorepos. Blazing fast task execution."
          icon={<Layers className="h-5 w-5 text-purple-500" />}
        />
        <TechCard
          title="Bun Runtime"
          description="Ultra-fast JavaScript runtime, package manager, and test runner. Drop-in Node.js replacement."
          icon={<Zap className="h-5 w-5 text-yellow-500" />}
        />
        <TechCard
          title="Hono"
          description="Small, fast web framework. Runs on Bun, Node, and Edge environments with built-in RPC."
          icon={<Code2 className="h-5 w-5 text-orange-500" />}
        />
        <TechCard
          title="React + Vite"
          description="The gold standard for modern UI development with instant HMR and optimized builds."
          icon={<Code2 className="h-5 w-5 text-blue-500" />}
        />
        <TechCard
          title="Drizzle ORM"
          description="TypeScript-first ORM with great inference. Lightweight, performant, and SQL-like."
          icon={<Database className="h-5 w-5 text-emerald-500" />}
        />
        <TechCard
          title="Zod"
          description="TypeScript-first schema validation with static type inference. Shared across the stack."
          icon={<Shield className="h-5 w-5 text-indigo-500" />}
        />
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          Type Safety Features
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureHighlight
            title="Shared Schemas"
            description={
              <>
                Zod schemas defined in <InlineCode>packages/shared</InlineCode>{" "}
                are imported by both <InlineCode>apps/api</InlineCode> (backend
                validation) and <InlineCode>apps/web</InlineCode> (frontend
                forms).
              </>
            }
          />
          <FeatureHighlight
            title="Env Validation"
            description="Strict environment variable validation ensures the application fails fast if keys are missing."
          />
          <FeatureHighlight
            title="Strict TypeScript"
            description={
              <>
                Configured with strict mode enabled via{" "}
                <InlineCode>packages/tsconfig</InlineCode> for maximum safety.
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

export function TechCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-border bg-muted/20 hover:bg-muted/40 transition-all duration-200 group">
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background border border-border shadow-sm group-hover:border-indigo-500/30 transition-colors">
          {icon}
        </div>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export function FeatureHighlight({
  title,
  description,
}: {
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/30">
      <Badge variant="default" className="mb-3">
        {title}
      </Badge>
      <div className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </div>
    </div>
  );
}
