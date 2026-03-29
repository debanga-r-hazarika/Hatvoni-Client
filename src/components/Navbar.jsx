import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Our Products' },
  { to: '/traditions', label: 'Traditions' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (user) {
      console.log('Navbar - User state:', {
        email: user.email,
        isAdmin,
        profileLoaded: !!profile,
        profileIsAdmin: profile?.is_admin
      });
    }
  }, [user, profile, isAdmin]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/90 backdrop-blur-xl shadow-sm' : 'bg-surface/80 backdrop-blur-md'
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 md:py-5 w-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link to="/" className="font-brand text-2xl md:text-3xl text-primary tracking-tighter hover:text-primary-container transition-colors">
          Hatvoni
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-headline tracking-tight text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-secondary border-b-2 border-secondary pb-1 font-semibold'
                    : 'text-primary/70 hover:text-primary'
                }`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1">
          <Link to="/wishlist" className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined text-xl">favorite</span>
          </Link>
          <Link to="/cart" className="relative p-2 text-primary hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
          </Link>

          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-3 ml-2">
                {isAdmin && (
                  <Link to="/admin" className="px-3 py-2 text-sm font-headline font-semibold bg-amber-500 text-white hover:bg-amber-600 rounded-lg transition-colors">
                    Admin
                  </Link>
                )}
                <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 hover:bg-surface-container-low rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-xl text-primary">person</span>
                  <span className="text-sm font-headline font-semibold text-primary">{getUserDisplayName()}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-headline font-semibold text-primary hover:bg-surface-container-low rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
              <Link to="/profile" className="md:hidden p-2 text-primary hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
                <span className="material-symbols-outlined text-xl">person</span>
              </Link>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-2 ml-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-headline font-semibold text-primary hover:bg-surface-container-low rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-headline font-semibold bg-secondary text-white hover:bg-secondary/90 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-outline-variant px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block py-2 font-headline tracking-tight text-base ${
                  isActive ? 'text-secondary font-bold' : 'text-primary/70'
                }`
              }
              onClick={() => setMenuOpen(false)}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant/30">
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-primary font-headline font-bold text-sm">
              <span className="material-symbols-outlined text-lg">favorite</span> Wishlist
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-primary font-headline font-bold text-sm">
              <span className="material-symbols-outlined text-lg">shopping_cart</span> Cart
            </Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-headline font-bold text-sm">
                    <span className="material-symbols-outlined text-lg">admin_panel_settings</span> Admin Dashboard
                  </Link>
                )}
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-primary font-headline font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">person</span> Profile
                </Link>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-primary font-headline font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">package_2</span> Orders
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-2 text-primary font-headline font-bold text-sm text-left">
                  <span className="material-symbols-outlined text-lg">logout</span> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-primary font-headline font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">login</span> Login
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="px-4 py-2 bg-secondary text-white font-headline font-bold text-sm rounded-lg text-center">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
