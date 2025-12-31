import { useQuery } from "@tanstack/react-query";
import type { User } from "@repo/shared";
import { Button } from "./components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { Zap, Shield, Database } from "lucide-react";

function App() {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      return res.json();
    },
  });

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
      {/* Navbar */}
      <header className="flex-none border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Zap size={18} fill="currentColor" />
            </div>
            <span>TurboStart</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="/README.md" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col min-h-0 overflow-hidden container mx-auto px-4 py-4 gap-4">
        {/* Hero Section */}
        <section className="flex-none text-center py-2">
          <Badge variant="success" className="mb-2 px-2 py-0.5 text-xs">
            v1.0 Ready
          </Badge>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            The Ultimate <span className="text-indigo-500">Full-Stack Monorepo</span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-sm text-slate-400 md:text-base">
            Build production-ready applications faster with Bun, React, Hono, and
            Turborepo. Type-safe from database to frontend.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button size="sm" className="h-9 px-6">
              Deploy Now
            </Button>
            <Button variant="secondary" size="sm" className="h-9 px-6" asChild>
              <a href="/README.md" target="_blank" rel="noreferrer">Read the Docs</a>
            </Button>
          </div>
        </section>

        {/* Content Grid */}
        <div className="flex-1 grid gap-4 md:grid-cols-2 min-h-0 overflow-hidden">
          {/* Features */}
          <section className="flex flex-col gap-3 min-h-0 overflow-y-auto pr-1">
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
                  <Badge variant="outline" className="text-[10px]">GET /api/users</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4 pt-0 overflow-y-auto">
                {isLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 w-full rounded-lg border border-slate-800 animate-pulse bg-slate-800/20" />
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
                            <div className="text-sm font-medium text-slate-200">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-600 font-mono">ID: {user.id}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="flex-none border-t border-slate-800 bg-slate-950 py-3">
        <div className="container mx-auto px-4 text-center text-[10px] text-slate-600 uppercase tracking-widest">
          © 2024 TurboStart • Built with Bun & Turborepo
        </div>
      </footer>
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
      <CardHeader>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
}

export default App;