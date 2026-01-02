import { useQuery } from "@tanstack/react-query";
import type { User } from "@repo/shared";
import { Badge } from "../components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Zap, Shield, Database, Layers, Code2 } from "lucide-react";
import { FeatureHighlight, TechCard } from "./Features";

export default function Home() {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      return res.json();
    },
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden container mx-auto px-4 py-4 gap-4">
        {/* Hero Section */}
        <section className="flex-none text-center py-6">
          <Badge variant="success" className="mb-3 px-2 py-0.5 text-xs">
            v1.0 Ready
          </Badge>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-6xl">
            The Ultimate{" "}
            <span className="text-indigo-500">Full-Stack Monorepo</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground text-lg">
            Build production-ready applications faster with Bun, React, Hono,
            and Turborepo. Type-safe from database to frontend.
          </p>
        </section>

        {/* Type Safety Section */}
        <section className="flex-none mb-4">
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureHighlight
              title="Shared Schemas"
              description="Zod schemas defined in shared packages are used by both API and Web."
            />
            <FeatureHighlight
              title="Env Validation"
              description="Strict validation ensures the application fails fast if keys are missing."
            />
            <FeatureHighlight
              title="Strict TypeScript"
              description="Configured with strict mode for maximum safety and confidence."
            />
          </div>
        </section>

        {/* Content Grid */}
        <div className="flex-1 grid gap-6 md:grid-cols-2 min-h-0 overflow-hidden pb-4">
          {/* Tech Stack - 6 Elements */}
          <section className="flex flex-col gap-4 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
            <TechCard
              title="Turborepo"
              description="High-performance build system for TypeScript monorepos."
              icon={<Layers className="h-5 w-5 text-purple-500" />}
            />
            <TechCard
              title="Bun Runtime"
              description="Ultra-fast JavaScript runtime, package manager, and test runner."
              icon={<Zap className="h-5 w-5 text-yellow-500" />}
            />
            <TechCard
              title="Hono"
              description="Small, fast web framework. Runs on Bun, Node, and Edge."
              icon={<Code2 className="h-5 w-5 text-orange-500" />}
            />
            <TechCard
              title="React + Vite"
              description="Modern UI development with instant HMR and optimized builds."
              icon={<Code2 className="h-5 w-5 text-blue-500" />}
            />
            <TechCard
              title="Drizzle ORM"
              description="TypeScript-first ORM with great inference. Lightweight and performant."
              icon={<Database className="h-5 w-5 text-emerald-500" />}
            />
            <TechCard
              title="Zod"
              description="TypeScript-first schema validation shared across the stack."
              icon={<Shield className="h-5 w-5 text-indigo-500" />}
            />
          </section>

          {/* Users Demo Section */}
          <section className="flex flex-col min-h-0">
            <Card className="flex flex-col h-full border-border bg-muted/20 overflow-hidden shadow-sm">
              <CardHeader className="flex-none p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">
                      Live Data Demo
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Fetching from Hono API.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    GET /api/users
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4 pt-0 overflow-y-auto custom-scrollbar">
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-12 w-full rounded-lg border border-border animate-pulse bg-muted/20"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {users?.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-background p-3 transition-all hover:border-indigo-500/30 hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 font-bold text-xs border border-indigo-500/20">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">
                              {user.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                          ID: {user.id}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
