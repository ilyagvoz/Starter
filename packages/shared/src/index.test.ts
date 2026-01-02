import { describe, expect, it } from "bun:test";
import { createUserSchema } from "./schema";

describe("Shared Schemas", () => {
  describe("createUserSchema", () => {
    it("should validate a correct user", () => {
      const input = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };
      const result = createUserSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should fail validation with invalid email", () => {
      const input = {
        name: "John Doe",
        email: "not-an-email",
        password: "password123",
      };
      const result = createUserSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toBeDefined();
      }
    });

    it("should fail validation with missing name", () => {
      const input = {
        email: "john@example.com",
        password: "password123",
      };
      const result = createUserSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should fail validation with short password", () => {
      const input = {
        name: "John Doe",
        email: "john@example.com",
        password: "short",
      };
      const result = createUserSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toBeDefined();
      }
    });
  });
});
