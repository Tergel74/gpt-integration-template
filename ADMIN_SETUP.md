# Admin Setup Guide

This guide explains how to set up admin users in your Supabase application.

## 1. Database Setup

First, run the updated schema in your Supabase SQL Editor to add admin functionality:

```sql
-- The schema.sql file includes all necessary tables and functions
-- Run the entire schema.sql file in your Supabase SQL Editor
```

## 2. Setting Up Your First Admin

### Option A: Direct SQL (Recommended for first admin)

1. Go to your Supabase Dashboard → SQL Editor
2. Run this query to promote a user to admin by email:

```sql
SELECT public.promote_user_to_admin_by_email('your-email@example.com');
```

Replace `'your-email@example.com'` with the actual email of the user you want to make admin.

### Option B: Manual Database Update

1. Go to Supabase Dashboard → Table Editor → profiles table
2. Find the user you want to make admin
3. Set the `is_admin` field to `true`

## 3. Admin Functions Available

### Check if current user is admin:

```sql
SELECT public.is_current_user_admin();
```

### Promote another user to admin (only admins can do this):

```sql
SELECT public.set_admin_status('user-uuid-here', true);
```

### Remove admin status:

```sql
SELECT public.set_admin_status('user-uuid-here', false);
```

## 4. Using Admin Functions in Your App

```typescript
import { isCurrentUserAdmin, promoteUserToAdmin } from "../lib/admin";

// Check if current user is admin
const isAdmin = await isCurrentUserAdmin();

// Promote a user to admin (only works if you're admin)
const success = await promoteUserToAdmin("user@example.com");
```

## 5. Debug Page Access

-   **Development**: Debug page is accessible at `/debug` (admin users only)
-   **Production**: Debug page returns 404 (completely hidden)

The debug page is protected by:

1. Environment check (hidden in production)
2. Authentication check (must be logged in)
3. Admin check (must have `is_admin = true`)

## 6. Security Notes

-   Only existing admins can promote other users to admin
-   If no admins exist, the first user can promote themselves
-   Admin status is checked server-side using RLS policies
-   Debug page is completely inaccessible in production builds

## 7. Testing Admin Setup

1. Sign up/login to your app
2. Promote your user to admin using SQL
3. Visit `/debug` page - you should have access
4. Try building for production - debug page should be inaccessible
