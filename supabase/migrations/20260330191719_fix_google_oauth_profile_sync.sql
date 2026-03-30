/*
  # Fix Google OAuth profile data inheritance

  1. Problem
    - The handle_new_user trigger only reads first_name/last_name keys
    - Google OAuth provides given_name, family_name, name, and avatar_url/picture
    - The ON CONFLICT DO NOTHING prevents updates for returning Google users

  2. Changes
    - Update handle_new_user to read Google's given_name, family_name, avatar_url, picture fields
    - Use COALESCE priority: explicit first_name > given_name from Google > parse from full name
    - ON CONFLICT now UPSERTs empty name/avatar fields so returning Google users get their data
*/

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_first_name text;
  v_last_name  text;
  v_avatar_url text;
  v_full_name  text;
BEGIN
  v_first_name := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'first_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'given_name', ''),
    NULL
  );

  v_last_name := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'last_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'family_name', ''),
    NULL
  );

  IF v_first_name IS NULL THEN
    v_full_name := COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
      NULLIF(NEW.raw_user_meta_data->>'name', '')
    );
    IF v_full_name IS NOT NULL THEN
      v_first_name := split_part(v_full_name, ' ', 1);
      v_last_name  := COALESCE(v_last_name, NULLIF(trim(substring(v_full_name FROM position(' ' IN v_full_name) + 1)), ''));
    END IF;
  END IF;

  v_avatar_url := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'avatar_url', ''),
    NULLIF(NEW.raw_user_meta_data->>'picture', '')
  );

  INSERT INTO public.profiles (id, first_name, last_name, email, avatar_url, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(v_first_name, ''),
    COALESCE(v_last_name, ''),
    NEW.email,
    v_avatar_url,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    first_name = CASE
      WHEN EXCLUDED.first_name <> '' AND (public.profiles.first_name IS NULL OR public.profiles.first_name = '')
      THEN EXCLUDED.first_name
      ELSE public.profiles.first_name
    END,
    last_name = CASE
      WHEN EXCLUDED.last_name <> '' AND (public.profiles.last_name IS NULL OR public.profiles.last_name = '')
      THEN EXCLUDED.last_name
      ELSE public.profiles.last_name
    END,
    avatar_url = CASE
      WHEN EXCLUDED.avatar_url IS NOT NULL AND (public.profiles.avatar_url IS NULL OR public.profiles.avatar_url = '')
      THEN EXCLUDED.avatar_url
      ELSE public.profiles.avatar_url
    END,
    updated_at = NOW();

  RETURN NEW;
END;
$$;
