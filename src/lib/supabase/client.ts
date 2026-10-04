import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

let supabaseBrowserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!supabaseBrowserClient) {
    supabaseBrowserClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  return supabaseBrowserClient;
}

export const isSupabaseConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};
