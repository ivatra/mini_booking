import { isRangeOverlap } from "@shared";
import { describe, it, expect } from "vitest";

describe("isRangeOverlap", () => {
  it("should return false for overlapping ranges (partial overlap)", () => {
    const result = isRangeOverlap(
      "2026-03-05",
      "2026-03-07",
      "2026-03-03",
      "2026-03-06",
    );

    expect(result).toBe(false);
  });

  it("should return true when range is completely inside another", () => {
    const result = isRangeOverlap(
      "2026-03-03",
      "2026-03-05",
      "2026-03-01",
      "2026-03-10",
    );

    expect(result).toBe(true);
  });

  it("should return false for non-overlapping ranges", () => {
    const result = isRangeOverlap(
      "2026-03-10",
      "2026-03-15",
      "2026-03-01",
      "2026-03-05",
    );

    expect(result).toBe(false);
  });

  it("should return false for adjacent ranges (edge case)", () => {
    const result = isRangeOverlap(
      "2026-03-05",
      "2026-03-10",
      "2026-03-01",
      "2026-03-05",
    );

    expect(result).toBe(false);
  });

  it("should handle same start and end dates", () => {
    const result = isRangeOverlap(
      "2026-03-05",
      "2026-03-05",
      "2026-03-05",
      "2026-03-05",
    );

    expect(result).toBe(true);
  });
});
