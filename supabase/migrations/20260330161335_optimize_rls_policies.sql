/*
  # Optimize RLS Policies for Performance

  1. Problem
    - RLS policies using auth.<function>() directly re-evaluate for each row
    - Multiple permissive policies for same actions on profiles table
    - Functions with mutable search_path

  2. Solution
    - Wrap auth.<function>() calls in (select ...) for single evaluation
    - Remove duplicate policies
    - Fix function search paths

  3. Tables affected
    - profiles
    - products
    - orders
    - order_items
    - addresses
    - wishlists
*/

-- =====================
-- Fix is_admin() function search path
-- =====================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  )
$$;

-- =====================
-- Fix handle_new_user function search path
-- =====================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- =====================
-- Fix ensure_single_default_address function search path
-- =====================
CREATE OR REPLACE FUNCTION ensure_single_default_address()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.is_default = true THEN
    UPDATE public.addresses
    SET is_default = false
    WHERE user_id = NEW.user_id
      AND id != NEW.id
      AND is_default = true;
  END IF;
  RETURN NEW;
END;
$$;

-- =====================
-- PROFILES TABLE
-- =====================
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()) OR is_admin() = true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()) OR is_admin() = true)
  WITH CHECK (id = (select auth.uid()) OR is_admin() = true);

-- =====================
-- PRODUCTS TABLE
-- =====================
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = true OR is_admin() = true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (is_admin() = true);

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (is_admin() = true)
  WITH CHECK (is_admin() = true);

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (is_admin() = true);

-- =====================
-- ORDERS TABLE
-- =====================
DROP POLICY IF EXISTS "Users can view own orders or admins can view all" ON orders;
DROP POLICY IF EXISTS "Authenticated users can create orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
DROP POLICY IF EXISTS "Admins can delete orders" ON orders;

CREATE POLICY "Users can view own orders or admins can view all"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()) OR is_admin() = true);

CREATE POLICY "Authenticated users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (is_admin() = true)
  WITH CHECK (is_admin() = true);

CREATE POLICY "Admins can delete orders"
  ON orders FOR DELETE
  TO authenticated
  USING (is_admin() = true);

-- =====================
-- ORDER_ITEMS TABLE
-- =====================
DROP POLICY IF EXISTS "Users can view own order items or admins can view all" ON order_items;
DROP POLICY IF EXISTS "Authenticated users can create order items" ON order_items;
DROP POLICY IF EXISTS "Admins can update order items" ON order_items;
DROP POLICY IF EXISTS "Admins can delete order items" ON order_items;

CREATE POLICY "Users can view own order items or admins can view all"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = (select auth.uid()) OR is_admin() = true)
    )
  );

CREATE POLICY "Authenticated users can create order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Admins can update order items"
  ON order_items FOR UPDATE
  TO authenticated
  USING (is_admin() = true)
  WITH CHECK (is_admin() = true);

CREATE POLICY "Admins can delete order items"
  ON order_items FOR DELETE
  TO authenticated
  USING (is_admin() = true);

-- =====================
-- ADDRESSES TABLE
-- =====================
DROP POLICY IF EXISTS "Users can view own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can insert own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can update own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can delete own addresses" ON addresses;

CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own addresses"
  ON addresses FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own addresses"
  ON addresses FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own addresses"
  ON addresses FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- =====================
-- WISHLISTS TABLE
-- =====================
DROP POLICY IF EXISTS "Users can view own wishlist" ON wishlists;
DROP POLICY IF EXISTS "Users can add to own wishlist" ON wishlists;
DROP POLICY IF EXISTS "Users can remove from own wishlist" ON wishlists;

CREATE POLICY "Users can view own wishlist"
  ON wishlists FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()) OR is_admin() = true);

CREATE POLICY "Users can add to own wishlist"
  ON wishlists FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can remove from own wishlist"
  ON wishlists FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- =====================
-- Drop unused indexes (optional cleanup)
-- =====================
DROP INDEX IF EXISTS idx_profiles_is_admin;
DROP INDEX IF EXISTS idx_products_category;
DROP INDEX IF EXISTS idx_products_is_active;
DROP INDEX IF EXISTS idx_orders_user_id;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_order_items_order_id;
DROP INDEX IF EXISTS idx_order_items_product_id;
DROP INDEX IF EXISTS idx_addresses_user_id;
DROP INDEX IF EXISTS idx_addresses_is_default;
DROP INDEX IF EXISTS idx_wishlists_product_id;
