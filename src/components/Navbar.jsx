import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const navRef = useRef(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY.current;

    setScrolled(currentScrollY > 10);

    if (currentScrollY > 80) {
      if (scrollDelta > 5 && !menuOpen) {
        setHidden(true);
      } else if (scrollDelta < -5) {
        setHidden(false);
      }
    } else {
      setHidden(false);
    }

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(handleScroll);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const closeMenu = () => {
    if (menuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
      }, 280);
    }
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      setMenuOpen(true);
    }
  };

  const handleSignOut = async () => {
    closeMenu();
    await signOut();
    navigate('/');
  };

  const getUserDisplayName = () => {
    if (profile?.first_name) {
      return profile.first_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-2xl shadow-lg shadow-black/5'
            : 'bg-surface/80 backdrop-blur-md'
        }`}
        style={{
          willChange: 'transform, background-color',
        }}
      >
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 md:py-5 w-full max-w-screen-2xl mx-auto">
          <Link
            to="/"
            className="font-brand text-2xl md:text-3xl text-primary tracking-tighter hover:text-primary-container transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Hatvoni
          </Link>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative font-headline tracking-tight text-sm px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-secondary font-semibold'
                      : 'text-primary/70 hover:text-primary hover:bg-surface-container-low'
                  }`
                }
                end={link.to === '/'}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-secondary rounded-full transition-all duration-300 ${
                        isActive ? 'w-4/5 opacity-100' : 'w-0 opacity-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-1">
            <Link
              to="/wishlist"
              className="relative p-2.5 text-primary hover:bg-surface-container-low rounded-full transition-all duration-300 hover:scale-110 active:scale-95 group"
            >
              <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:scale-110">favorite</span>
            </Link>
            <Link
              to="/cart"
              className="relative p-2.5 text-primary hover:bg-surface-container-low rounded-full transition-all duration-300 hover:scale-110 active:scale-95 group"
            >
              <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:scale-110">shopping_cart</span>
              <span className="absolute top-0.5 right-0.5 bg-secondary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110">2</span>
            </Link>

            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2 ml-3">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 text-sm font-headline font-semibold bg-amber-500 text-white hover:bg-amber-600 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-amber-500/25 active:scale-95"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-surface-container-low rounded-lg transition-all duration-300 group"
                  >
                    <span className="material-symbols-outlined text-xl text-primary transition-transform duration-300 group-hover:scale-110">person</span>
                    <span className="text-sm font-headline font-semibold text-primary">{getUserDisplayName()}</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-headline font-semibold text-primary hover:bg-surface-container-low rounded-lg transition-all duration-300 active:scale-95"
                  >
                    Logout
                  </button>
                </div>
                <Link
                  to="/profile"
                  className="md:hidden p-2.5 text-primary hover:bg-surface-container-low rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <span className="material-symbols-outlined text-xl">person</span>
                </Link>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-2 ml-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-headline font-semibold text-primary hover:bg-surface-container-low rounded-lg transition-all duration-300 active:scale-95"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-headline font-semibold bg-secondary text-white hover:bg-secondary/90 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-secondary/25 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2.5 text-primary hover:bg-surface-container-low rounded-full transition-all duration-300 active:scale-95"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`material-symbols-outlined transition-transform duration-300 ${menuOpen && !isClosing ? 'rotate-90' : 'rotate-0'}`}
              >
                {menuOpen && !isClosing ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {(menuOpen || isClosing) && (
        <>
          <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div
            className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-surface z-50 md:hidden shadow-2xl transition-transform duration-300 ease-out ${
              isClosing ? 'translate-x-full' : 'translate-x-0'
            }`}
            style={{ willChange: 'transform' }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/30">
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="font-brand text-2xl text-primary tracking-tighter"
                >
                  Hatvoni
                </Link>
                <button
                  onClick={closeMenu}
                  className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-all duration-300"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6">
                <nav className="space-y-1">
                  {navLinks.map((link, index) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3.5 rounded-xl font-headline tracking-tight text-base transition-all duration-300 ${
                          isActive
                            ? 'text-secondary bg-secondary/10 font-bold'
                            : 'text-primary/80 hover:bg-surface-container-low hover:text-primary'
                        }`
                      }
                      onClick={handleLinkClick}
                      end={link.to === '/'}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isClosing ? 'none' : 'slideInRight 0.3s ease-out forwards',
                        opacity: isClosing ? 1 : 0,
                      }}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-outline-variant/30 space-y-1">
                  <Link
                    to="/wishlist"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-primary font-headline font-semibold text-sm hover:bg-surface-container-low transition-all duration-300"
                    style={{
                      animationDelay: `${navLinks.length * 50}ms`,
                      animation: isClosing ? 'none' : 'slideInRight 0.3s ease-out forwards',
                      opacity: isClosing ? 1 : 0,
                    }}
                  >
                    <span className="material-symbols-outlined text-lg">favorite</span>
                    Wishlist
                  </Link>
                  <Link
                    to="/cart"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-primary font-headline font-semibold text-sm hover:bg-surface-container-low transition-all duration-300"
                    style={{
                      animationDelay: `${(navLinks.length + 1) * 50}ms`,
                      animation: isClosing ? 'none' : 'slideInRight 0.3s ease-out forwards',
                      opacity: isClosing ? 1 : 0,
                    }}
                  >
                    <span className="material-symbols-outlined text-lg">shopping_cart</span>
                    Cart
                    <span className="ml-auto bg-secondary text-white text-xs px-2 py-0.5 rounded-full font-bold">2</span>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-outline-variant/30 space-y-1">
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-amber-500 text-white font-headline font-semibold text-sm hover:bg-amber-600 transition-all duration-300"
                          style={{
                            animationDelay: `${(navLinks.length + 2) * 50}ms`,
                            animation: isClosing ? 'none' : 'slideInRight 0.3s ease-out forwards',
                            opacity: isClosing ? 1 : 0,
                          }}
                        >
                          <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-primary font-headline font-semibold text-sm hover:bg-surface-container-low transition-all duration-300"
                        style={{
                          animationDelay: `${(navLinks.length + 3) * 50}ms`,
                          animation: isClosing ? 'none' : 'slideInRight 0.3s ease-out forwards',
                          opacity: isClosing ? 1 : 0,
                        }}
                      >
                        <span className="material-symbols-outlined text-lg">person</span>
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-primary font-headline font-semibold text-sm hover:bg-surface-container-low transition-all duration-300"
                        style={{
                          animationDelay: `${(navLinks.length + 4) * 50}ms`,
                          animation: isClosing ? 'none' : 'slideInRight 0.3s ease-out forwards',
                          opacity: isClosing ? 1 : 0,
                        }}
                      >
                        <span className="material-symbols-outlined text-lg">package_2</span>
                        Orders
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-primary font-headline font-semibold text-sm hover:bg-surface-container-low transition-all duration-300 text-left"
                        style={{
                          animationDelay: `${(navLinks.length + 5) * 50}ms`,
                          animation: isClosing ? 'none' : 'slideInRight 0.3s ease-out forwards',
                          opacity: isClosing ? 1 : 0,
                        }}
                      >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-primary font-headline font-semibold text-sm hover:bg-surface-container-low transition-all duration-300"
                        style={{
                          animationDelay: `${(navLinks.length + 2) * 50}ms`,
                          animation: isClosing ? 'none' : 'slideInRight 0.3s ease-out forwards',
                          opacity: isClosing ? 1 : 0,
                        }}
                      >
                        <span className="material-symbols-outlined text-lg">login</span>
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={handleLinkClick}
                        className="flex items-center justify-center gap-2 px-4 py-3.5 mt-2 rounded-xl bg-secondary text-white font-headline font-semibold text-sm hover:bg-secondary/90 transition-all duration-300"
                        style={{
                          animationDelay: `${(navLinks.length + 3) * 50}ms`,
                          animation: isClosing ? 'none' : 'slideInRight 0.3s ease-out forwards',
                          opacity: isClosing ? 1 : 0,
                        }}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-outline-variant/30">
                <p className="text-xs text-primary/50 text-center font-headline">
                  Premium Kosher Products
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
