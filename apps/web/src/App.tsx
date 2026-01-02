import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Zap, Sun, Moon } from "lucide-react";
import { Button } from "./components/ui/Button";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Documentation from "./pages/Documentation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="px-2">
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground";
  };

  return (
    <header className="flex-none border-b border-border bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Zap size={18} fill="currentColor" />
          </div>
          <span>Start</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/features"
            className={`transition-colors ${isActive("/features")}`}
          >
            Features
          </Link>
          <Link to="/docs" className={`transition-colors ${isActive("/docs")}`}>
            Documentation
          </Link>
          <a
            href="https://github.com/ilyagvoz/Starter"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:inline">
                Hello, {user.name}
              </span>
              <Button size="sm" variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Layout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer className="flex-none border-t border-border bg-background py-3">
        <div className="container mx-auto px-4 text-center text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2024 Start • Built with Bun & Turborepo
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
