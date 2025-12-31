import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("c1", "c2")).toBe("c1 c2");
    });

    it("should handle conditional classes", () => {
      expect(cn("c1", true && "c2", false && "c3")).toBe("c1 c2");
    });

    it("should merge tailwind classes properly using tailwind-merge", () => {
      // p-4 overrides p-2
      expect(cn("p-2 p-4")).toBe("p-4");
      // text-red-500 overrides text-blue-500
      expect(cn("text-blue-500", "text-red-500")).toBe("text-red-500");
    });
  });
});
