/**
 * Safely generates a unique string identifier.
 * Works seamlessly in all browser environments (HTTPS, HTTP localhost, older JS engines, and web views).
 */
export function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // Ignore security context restrictions
    }
  }
  return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 9);
}
