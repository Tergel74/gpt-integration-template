// lib/admin.ts
import { supabaseBrowser } from "./supabaseClient";

/**
 * Check if the current user is an admin
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
    try {
        const { data, error } = await supabaseBrowser.rpc(
            "is_current_user_admin"
        );
        if (error) {
            console.error("Error checking admin status:", error);
            return false;
        }
        return data || false;
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
}

/**
 * Promote a user to admin by email (only works if current user is admin or no admins exist)
 */
export async function promoteUserToAdmin(email: string): Promise<boolean> {
    try {
        const { data, error } = await supabaseBrowser.rpc(
            "promote_user_to_admin_by_email",
            {
                user_email: email,
            }
        );

        if (error) {
            console.error("Error promoting user to admin:", error);
            return false;
        }

        return data || false;
    } catch (error) {
        console.error("Error promoting user to admin:", error);
        return false;
    }
}

/**
 * Set admin status for a user (only works if current user is admin)
 */
export async function setUserAdminStatus(
    userId: string,
    isAdmin: boolean
): Promise<boolean> {
    try {
        const { data, error } = await supabaseBrowser.rpc("set_admin_status", {
            target_user_id: userId,
            admin_status: isAdmin,
        });

        if (error) {
            console.error("Error setting admin status:", error);
            return false;
        }

        return data || false;
    } catch (error) {
        console.error("Error setting admin status:", error);
        return false;
    }
}

/**
 * Get current user's profile including admin status
 */
export async function getCurrentUserProfile() {
    try {
        const {
            data: { user },
        } = await supabaseBrowser.auth.getUser();

        if (!user) {
            return null;
        }

        const { data, error } = await supabaseBrowser
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (error) {
            console.error("Error fetching user profile:", error);
            return null;
        }

        return { ...data, user };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}
