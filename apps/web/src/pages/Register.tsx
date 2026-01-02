import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, client } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await client.auth.register.$post({
        json: { name, email, password },
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: "Invalid response from server" };
      }

      if (!res.ok) {
        setError(
          typeof data.error === "object"
            ? JSON.stringify(data.error)
            : data.error || "Registration failed",
        );
        return;
      }

      login(data.token, data.user);
      navigate("/");
    } catch {
      setError("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && (
          <div className="bg-red-500/10 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-500/20 mb-4 text-sm font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
