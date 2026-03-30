import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
        setIsAdmin(false);
        return;
      }

      if (data) {
        setProfile(data);
        setIsAdmin(data.is_admin === true);
        console.log('Profile loaded:', { email: data.email, isAdmin: data.is_admin });
      } else {
        console.warn('No profile found for user:', userId);
        setProfile(null);
        setIsAdmin(false);
      }
    } catch (err) {
      console.error('Exception fetching profile:', err);
      setProfile(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      await fetchProfile(session?.user?.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.id);

      if (session?.user) {
        const isLinking = localStorage.getItem('linking_google') === 'true';
        const identities = session.user.identities || [];
        const hasEmailProvider = identities.some(identity => identity.provider === 'email');
        const hasGoogleProvider = identities.some(identity => identity.provider === 'google');

        if (isLinking) {
          console.log('Linking detected, updating database...');
          localStorage.removeItem('linking_google');

          const { error: updateError } = await supabase
            .from('profiles')
            .update({ google_linked: true })
            .eq('id', session.user.id);

          if (updateError) {
            console.error('Failed to update google_linked:', updateError);
          } else {
            console.log('Successfully set google_linked to true');
            localStorage.setItem('link_success', 'Google account linked successfully!');
          }
        } else if (event === 'SIGNED_IN' && hasEmailProvider && hasGoogleProvider && identities.length > 1) {
          console.log('Checking if Google account is linked...');
          const { data: profileData, error: fetchError } = await supabase
            .from('profiles')
            .select('google_linked')
            .eq('id', session.user.id)
            .maybeSingle();

          console.log('Profile data:', profileData, 'Error:', fetchError);

          if (!profileData?.google_linked) {
            console.log('Google not linked, blocking sign-in');
            await supabase.auth.signOut();
            setUser(null);
            setProfile(null);
            setLoading(false);

            localStorage.setItem('authError', 'An account with this email already exists with email/password. Please sign in using your email and password, then link your Google account from your profile settings.');
            window.location.href = '/login';
            return;
          }

          console.log('Google is linked, allowing sign-in');
        }
      }

      setUser(session?.user ?? null);
      await fetchProfile(session?.user?.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/confirm-account`
      }
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { data, error };
  };

  const updatePassword = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { data, error };
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    return { data, error };
  };

  const linkGoogleAccount = async () => {
    const { data, error } = await supabase.auth.linkIdentity({
      provider: 'google'
    });
    return { data, error };
  };

  const getAuthProviders = () => {
    if (!user?.identities) return [];
    return user.identities.map(identity => identity.provider);
  };

  const value = {
    user,
    profile,
    isAdmin,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    signInWithGoogle,
    linkGoogleAccount,
    getAuthProviders,
    refreshProfile: () => fetchProfile(user?.id)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
