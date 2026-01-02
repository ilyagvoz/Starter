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
import { Zap, Shield, Database } from "lucide-react";

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
          <p className="mx-auto mb-6 max-w-2xl text-slate-400 text-lg">
            Build production-ready applications faster with Bun, React, Hono,
            and Turborepo. Type-safe from database to frontend.
          </p>
        </section>

        {/* Content Grid */}
        <div className="flex-1 grid gap-6 md:grid-cols-2 min-h-0 overflow-hidden pb-4">
          {/* Features */}
          <section className="flex flex-col gap-4 min-h-0 overflow-y-auto pr-2">
            <FeatureCard
              icon={<Zap className="h-5 w-5 text-yellow-500" />}
              title="Lightning Fast"
              description="Powered by Bun runtime and Vite for instant HMR and blazing fast builds."
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5 text-emerald-500" />}
              title="Type Safe"
              description="End-to-end type safety with TypeScript, Zod, and Drizzle ORM."
            />
            <FeatureCard
              icon={<Database className="h-5 w-5 text-blue-500" />}
              title="Edge Ready"
              description="Deploy anywhere with Hono and LibSQL. Works on Cloudflare or Vercel."
            />
          </section>

          {/* Users Demo Section */}
          <section className="flex flex-col min-h-0">
            <Card className="flex flex-col h-full border-slate-800 bg-slate-900/50 overflow-hidden">
              <CardHeader className="flex-none p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Live Data Demo</CardTitle>
                    <CardDescription className="text-xs">
                      Fetching from Hono API.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    GET /api/users
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4 pt-0 overflow-y-auto">
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-12 w-full rounded-lg border border-slate-800 animate-pulse bg-slate-800/20"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {users?.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-3 transition-colors hover:bg-slate-800/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-xs">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-200">
                              {user.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-600 font-mono">
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

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition-colors">
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3 space-y-0">
        <div className="h-8 w-8 flex items-center justify-center rounded bg-slate-800">
          {icon}
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <p className="text-sm text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
}
