import { createClient } from "@supabase/supabase-js";

// Client (browser) - use anon key

let browserClient = null;

export const supabaseBrowser = (() => {
    if (!browserClient) {
        browserClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true,
                },
            }
        );
    }
    return browserClient;
})();
