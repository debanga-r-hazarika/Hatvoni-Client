/*
  # Add User Ban Status, Wishlists Table, and Demo Products

  1. Schema Changes
    - Add `is_banned` column to profiles table for customer management
    - Add `first_name` and `last_name` columns to profiles if not exists
    
  2. New Tables
    - `wishlists`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `product_id` (uuid, foreign key to products)
      - `created_at` (timestamp)
      - Unique constraint on user_id + product_id

  3. Security
    - Enable RLS on wishlists table
    - Users can view/manage their own wishlist
    - Admins can view all wishlists

  4. Demo Data
    - Insert 3 demo products from the existing frontend data:
      - Kola Khar (Most Traditional)
      - Matimah Khar
      - Khardwi Khar
*/

-- Add is_banned column to profiles
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'is_banned'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_banned boolean DEFAULT false;
  END IF;
END $$;

-- Add first_name column if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN first_name text;
  END IF;
END $$;

-- Add last_name column if not exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_name text;
  END IF;
END $$;

-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on wishlists
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Wishlist policies
CREATE POLICY "Users can view own wishlist"
  ON wishlists FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
  );

CREATE POLICY "Users can add to own wishlist"
  ON wishlists FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can remove from own wishlist"
  ON wishlists FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_product_id ON wishlists(product_id);

-- Add policy for admins to view all profiles
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Admins can view all profiles'
  ) THEN
    CREATE POLICY "Admins can view all profiles"
      ON profiles FOR SELECT
      TO authenticated
      USING (
        (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
      );
  END IF;
END $$;

-- Add policy for admins to update all profiles (for ban/unban)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Admins can update all profiles'
  ) THEN
    CREATE POLICY "Admins can update all profiles"
      ON profiles FOR UPDATE
      TO authenticated
      USING ((SELECT is_admin FROM profiles WHERE id = auth.uid()) = true)
      WITH CHECK ((SELECT is_admin FROM profiles WHERE id = auth.uid()) = true);
  END IF;
END $$;

-- Insert 3 demo products (only if they don't exist)
INSERT INTO products (name, description, price, image_url, category, stock_quantity, is_active)
SELECT 
  'Kola Khar',
  'Derived from the ashes of sun-dried ''Bhim Kol'' banana peels. Cornerstone of Assamese digestive wellness. Our most traditional product, crafted using ancient methods passed down through generations.',
  450.00,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCppttAYi65wcwJ48dmuDXQoJ7Ns1XFDJpyn2pm51wBMvtZJZyA81TLcPRYDVNUvkX137aFh6bCsmL242k4po8GiovqSx4UDSQMNLbqjyLJd9JtY5WeB4S5zxU-6kSdxO8EeyNBMxPqG3T2EwNqikZ_5YnBHmo-NhjYCVYK7cdS2B7XORkqlT3czbzvqV9Ne5GxzD8R62EmrKIMmnSa_VSmw8kg2iNBvTak58uMCsQFev55cfKbZOtTCdMPcMtrDF4VsbPmePH6ek_U',
  'Traditional Khar',
  100,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Kola Khar');

INSERT INTO products (name, description, price, image_url, category, stock_quantity, is_active)
SELECT 
  'Matimah Khar',
  'A specialized alkaline extract crafted from indigenous black gram stalks. Known for its cooling properties and unique earthy aroma that enhances traditional dishes.',
  380.00,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCYCsraiJT5J2F9GETqOEeIbiqFI43mVc_vVEvmza_jJVAOgeFVDeAKX32ieTISYVnlydvoxTbctwu4ZszgCP-iq3xXgaZkejsygNPO7QatRmqrs7gP1ayRr3KeTH66j86KPerCnnCRU5PJfoQtQxgcBzkuczz_DznmPxwr7MRBC8VVarGBHHLvzESjYCijsO5JH-2xU66oxdkbxqFxN2R23qQuNrICawKXMFIk4tNTFspyY1iNyLf3pI38ngl7C3km94B0r7YG3fqQ',
  'Traditional Khar',
  75,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Matimah Khar');

INSERT INTO products (name, description, price, image_url, category, stock_quantity, is_active)
SELECT 
  'Khardwi Khar',
  'The ''water of Khar''. A refined, gentle preparation ideal for beginners. Crystal clear and potent, perfect for those new to traditional Assamese cuisine.',
  320.00,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBFiCzYccrIynr6YX7WiUCsoKJI0iCByi8IELZQdj0-lptJadq8DGQS08QxE0wgxdkqWMYZj4rn5enCA_pwiRLkYTWC2_h0yIYa9CK3V8q8TX6xJSw47yY_KqrryyjY7XZibai3NBdhtIqYsB1G_VXksUoW91MQ8Cujn53tcrYLa0j9JJj5oXDj3zvNAeVXMRNtYh6NI9rHESTiK9YQBNEmGiKMbBK1xLDqzPNZ3iVuUQKj0stma6olNzYgS0w13cQhCABTY_rQ1_PV',
  'Traditional Khar',
  120,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Khardwi Khar');
