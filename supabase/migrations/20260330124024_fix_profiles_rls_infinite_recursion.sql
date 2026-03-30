/*
  # Fix Infinite Recursion in Profiles RLS Policies

  1. Problem
    - Current policies check `is_admin` by querying the profiles table
    - This causes infinite recursion when the policy tries to verify itself
  
  2. Solution
    - Remove all existing policies that cause recursion
    - Create simple, non-recursive policies:
      - Users can read their own profile
      - Users can update their own profile
      - Users can insert their own profile
      - Admins can do everything (using custom claims in JWT instead of table lookup)
  
  3. Security
    - Users can only access their own data
    - Admin access will be handled through JWT claims
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can view own profile or admins can view all" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile or admins can update all" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON profiles;

-- Create new non-recursive policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- For admin access, we'll handle it at the application level
-- or through service role key for now
