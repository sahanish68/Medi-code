import { describe, it, expect } from "vitest";

describe("User Authorization & Data Boundary Check", () => {
  function canUserAccessResource(resourceOwnerId: string, currentUserId: string): boolean {
    if (!currentUserId || !resourceOwnerId) return false;
    return resourceOwnerId === currentUserId;
  }

  it("permits owner user to access their own prescription resource", () => {
    const userA = "usr-111";
    expect(canUserAccessResource("usr-111", userA)).toBe(true);
  });

  it("denies access when User A attempts to view User B's prescription", () => {
    const userA = "usr-111";
    const userB = "usr-222";
    expect(canUserAccessResource("usr-222", userA)).toBe(false);
  });
});
