/*
  # Add Google linked tracking to profiles

  1. Changes
    - Add `google_linked` column to profiles table to track explicit Google account linking
    - Defaults to false for existing users
  
  2. Purpose
    - Distinguish between explicitly linked accounts (via profile settings)
    - Prevent automatic account merging while allowing intentional linking
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'google_linked'
  ) THEN
    ALTER TABLE profiles ADD COLUMN google_linked BOOLEAN DEFAULT false;
  END IF;
END $$;