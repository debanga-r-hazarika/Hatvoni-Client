/*
  # Fix Infinite Recursion in Profiles RLS Policies

  1. Problem
    - Current policies query profiles table to check is_admin
    - This triggers the same RLS check, causing infinite recursion

  2. Solution
    - Create a security definer function to check admin status
    - Update policies to use this function instead of subqueries

  3. Changes
    - Drop problematic policies
    - Create is_admin() function with SECURITY DEFINER
    - Recreate policies using the function
*/

-- Create a security definer function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM profiles WHERE id = auth.uid()),
    false
  )
$$;

-- Drop existing problematic policies on profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Recreate policies using the function
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (is_admin() = true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (is_admin() = true)
  WITH CHECK (is_admin() = true);

-- Fix wishlists policies that might have same issue
DROP POLICY IF EXISTS "Users can view own wishlist" ON wishlists;

CREATE POLICY "Users can view own wishlist"
  ON wishlists FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR is_admin() = true);
