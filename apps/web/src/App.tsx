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
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span>TurboStart</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32 text-center">
          <Badge variant="success" className="mb-6 px-3 py-1 text-sm">
            v1.0 Now Available
          </Badge>
          <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
            The Ultimate <br />
            <span className="bg-glow-conic bg-clip-text text-transparent">
              Full-Stack Monorepo
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
            Build production-ready applications faster with Bun, React, Hono, and
            Turborepo. Type-safe from database to frontend.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base">
              Deploy Now
            </Button>
            <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
              Read the Docs
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              title="Lightning Fast"
              description="Powered by Bun runtime and Vite for instant HMR and blazing fast builds."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-emerald-500" />}
              title="Type Safe"
              description="End-to-end type safety with TypeScript, Zod, and Drizzle ORM."
            />
            <FeatureCard
              icon={<Database className="h-6 w-6 text-blue-500" />}
              title="Edge Ready"
              description="Deploy anywhere with Hono and LibSQL. Works on Cloudflare, Vercel, or Docker."
            />
          </div>
        </section>

        {/* Users Demo Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-3xl border-slate-800 bg-slate-900/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Data Demo</CardTitle>
                  <CardDescription>
                    Fetching users from the Hono API via TanStack Query.
                  </CardDescription>
                </div>
                <Badge variant="outline">GET /api/users</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-lg border border-slate-800 p-4 animate-pulse"
                    >
                      <div className="h-10 w-10 rounded-full bg-slate-800" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-1/3 rounded bg-slate-800" />
                        <div className="h-3 w-1/4 rounded bg-slate-800" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {users?.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500 font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-slate-200">
                            {user.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-500 font-mono">
                        ID: {user.id}
                      </div>
                    </div>
                  ))}
                  {users?.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                      No users found. Check the API connection!
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2024 TurboStart. Open Source MIT License.</p>
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