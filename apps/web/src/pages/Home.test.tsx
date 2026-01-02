import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";
import Home from "./Home";

// Mock the fetch API
const fetchMock = vi.fn();
globalThis.fetch = fetchMock;

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe("Home Page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading state initially", () => {
    // Mock a promise that doesn't resolve immediately
    fetchMock.mockReturnValue(new Promise(() => {}));

    render(<Home />, { wrapper });

    // Check for skeleton loaders (we used animate-pulse in the component)
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders users when data loads", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        createdAt: new Date().toISOString(),
      },
    ];

    fetchMock.mockResolvedValue({
      json: async () => mockUsers,
    });

    render(<Home />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });
});
