import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

vi.mock("./context/AuthContext", async () => {
  const actual = await vi.importActual("./context/AuthContext");
  return {
    ...actual,
    useAuth: () => ({
      user: { id: 1, name: "Test User", email: "test@example.com" },
      token: "fake-token",
      logout: vi.fn(),
      login: vi.fn(),
      isAuthenticated: true,
      client: {},
    }),
  };
});

vi.mock("./context/ThemeContext", async () => {
  const actual = await vi.importActual("./context/ThemeContext");
  return {
    ...actual,
    useTheme: () => ({
      theme: "light",
      toggleTheme: vi.fn(),
    }),
  };
});

describe("Contrast Audit", () => {
  it("should have no accessibility violations in light mode when logged in", async () => {
    document.documentElement.classList.add("light");
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});
