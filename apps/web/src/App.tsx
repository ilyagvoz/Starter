import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Zap } from "lucide-react";
import { Button } from "./components/ui/Button";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Documentation from "./pages/Documentation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-white"
      : "text-slate-400 hover:text-white";
  };

  return (
    <header className="flex-none border-b border-slate-800 bg-slate-950/80 backdrop-blur">
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
            className="text-slate-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300 hidden md:inline">
                Hello, {user.name}
              </span>
              <Button size="sm" variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Layout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-slate-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer className="flex-none border-t border-slate-800 bg-slate-950 py-3">
        <div className="container mx-auto px-4 text-center text-[10px] text-slate-600 uppercase tracking-widest">
          © 2024 Start • Built with Bun & Turborepo
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
