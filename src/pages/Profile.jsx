import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Personal Details');
  const [newsletter, setNewsletter] = useState(true);
  const [sms, setSms] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: ''
  });
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          email: data.email || user.email || '',
          phone: data.phone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      alert('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const sidebarLinks = [
    { label: 'Personal Details', href: '/profile', icon: 'person', active: true },
    { label: 'My Orders', href: '/orders', icon: 'package_2', active: false },
    { label: 'Wishlist', href: '/wishlist', icon: 'favorite', active: false },
    { label: 'Log Out', onClick: handleLogout, icon: 'logout', active: false, danger: true },
  ];

  if (loading) {
    return (
      <main className="pt-24 pb-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8 md:py-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-lg text-slate-600">Loading profile...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8 md:py-16">
        {/* Hero Heading */}
        <div className="mb-10 md:mb-16">
          <h1 className="font-brand text-5xl md:text-8xl text-primary leading-none tracking-tighter uppercase">My Profile</h1>
          <div className="w-24 md:w-32 h-1.5 md:h-2 bg-secondary mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 md:gap-16">
          {/* Sidebar */}
          <aside className="space-y-8 md:space-y-12">
            {/* Mobile: tab pills */}
            <div className="flex gap-2 flex-wrap lg:hidden">
              {sidebarLinks.filter(l => !l.danger).map(l => (
                <button key={l.label} onClick={() => setActiveTab(l.label)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === l.label ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                  {l.label}
                </button>
              ))}
            </div>
            {/* Desktop: sidebar nav */}
            <nav className="hidden lg:flex flex-col space-y-4">
              {sidebarLinks.map(link => (
                link.onClick ? (
                  <button key={link.label} onClick={link.onClick}
                    className="flex items-center space-x-4 group opacity-40 hover:opacity-70 transition-opacity text-left">
                    <span className="w-8 h-[2px] bg-outline group-hover:bg-secondary transition-colors" />
                    <span className={`font-headline font-bold text-xl ${link.danger ? 'text-error' : 'text-on-surface'} tracking-tight`}>{link.label}</span>
                  </button>
                ) : (
                  <Link key={link.label} to={link.href}
                    className={`flex items-center space-x-4 group ${link.danger ? 'opacity-40 hover:opacity-70' : link.label === 'Personal Details' ? '' : 'opacity-40 hover:opacity-100'} transition-opacity`}>
                    <span className={`w-8 h-[2px] ${link.label === 'Personal Details' ? 'bg-secondary' : 'bg-outline group-hover:bg-secondary'} transition-colors`} />
                    <span className={`font-headline font-${link.label === 'Personal Details' ? 'extrabold' : 'bold'} text-xl ${link.label === 'Personal Details' ? 'text-primary' : 'text-on-surface'} tracking-tight`}>{link.label}</span>
                  </Link>
                )
              ))}
            </nav>
            {/* Rewards Card */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border-l-4 border-secondary">
              <p className="font-headline font-bold text-primary-container mb-1 text-sm">Heritage Rewards</p>
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">You have earned</p>
              <p className="text-3xl font-brand text-secondary mt-1">450 pts</p>
            </div>
          </aside>

          {/* Main Content */}
          <section className="space-y-16 md:space-y-24">
            {/* Personal Information */}
            <div>
              <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mb-8 md:mb-10 tracking-tight">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-surface-container-low p-8 md:p-10 rounded-xl space-y-6 md:space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><span className="material-symbols-outlined text-7xl md:text-8xl">ecg_heart</span></div>
                  <div className="space-y-5 md:space-y-6">
                    <div className="border-b border-outline-variant pb-2">
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1">Full Name</label>
                      <input
                        className="w-full bg-transparent border-none p-0 text-lg md:text-xl font-headline font-semibold focus:ring-0 text-on-surface outline-none"
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="border-b border-outline-variant pb-2">
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1">Email Address</label>
                      <input
                        className="w-full bg-transparent border-none p-0 text-lg md:text-xl font-headline font-semibold focus:ring-0 text-on-surface outline-none"
                        type="email"
                        value={formData.email}
                        disabled
                      />
                    </div>
                    <div className="border-b border-outline-variant pb-2">
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1">Contact Number</label>
                      <input
                        className="w-full bg-transparent border-none p-0 text-lg md:text-xl font-headline font-semibold focus:ring-0 text-on-surface outline-none"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-primary text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-xl font-headline font-bold text-sm tracking-wide hover:bg-primary-container transition-colors shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
                {/* Profile portrait */}
                <div className="relative rounded-xl overflow-hidden aspect-square md:aspect-auto min-h-[200px]">
                  <img className="w-full h-full object-cover grayscale-[30%] brightness-90" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOFE6PMZ2XT8noFc0xQkFdg45aKtiFGJ0FWy3Db-AyVzj5rYcYfhkqx-qmOAN6jIt1SuDmWIZMxTuDDaYxaZtzK_oA3OBh4alCStH6r4d9a7PpzMFGSG6RP7Cvv6mujTD5bF6PZH34FMlFc9Nj8ov-jlP0A2HVyRdHUV_OjFV0rEe92lRwo28rzroDEg1zr378ooZetc3QxI6gj12tU2LhpYDCuAgYqxW86YpZngfEOS43zc62uEFEaaF70-a8iuAMHtzf795jVEcN" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6 md:p-8">
                    <button className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
                      <span className="material-symbols-outlined">photo_camera</span>
                      <span className="font-headline font-bold uppercase text-xs tracking-widest">Update Portrait</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Book */}
            <div>
              <div className="flex justify-between items-end mb-8 md:mb-10">
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Address Book</h2>
                <button className="flex items-center space-x-2 text-secondary hover:text-on-secondary-fixed-variant transition-colors group">
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="font-headline font-bold uppercase text-xs tracking-widest hidden md:inline">Add New Address</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  { tag: 'Default Shipping', tagClass: 'bg-secondary-container text-on-secondary-container', title: 'Home', address: '42, Orchid Meadows,\nMG Road Extension, North Guwahati,\nAssam - 781001, India' },
                  { tag: 'Office', tagClass: 'bg-surface-container-high text-on-surface-variant', title: 'Innovation Hub', address: 'Level 4, Brahmaputra Towers,\nGS Road, Dispur,\nAssam - 781005, India' },
                ].map(addr => (
                  <div key={addr.title} className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/30 hover:border-secondary transition-colors relative group">
                    <div className="absolute top-4 md:top-6 right-4 md:right-6 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-primary text-lg">edit</button>
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-error text-lg">delete</button>
                    </div>
                    <span className={`inline-block ${addr.tagClass} px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4`}>{addr.tag}</span>
                    <p className="font-headline font-bold text-base md:text-lg mb-2 text-on-surface">{addr.title}</p>
                    <p className="text-on-surface-variant leading-relaxed font-medium text-sm whitespace-pre-line">{addr.address}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security & Preferences */}
            <div className="bg-primary text-on-primary p-8 md:p-12 rounded-2xl overflow-hidden relative">
              <div className="absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[#00643c] rounded-full translate-x-1/2 translate-y-1/2 opacity-20 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <div className="space-y-6 md:space-y-8">
                  <h2 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight">Security &amp; Privacy</h2>
                  <div className="space-y-5 md:space-y-6">
                    {[['Change Password', 'Last changed 4 months ago', null], ['Two-Factor Authentication', 'Enabled for extra protection', 'verified_user']].map(([title, desc, icon]) => (
                      <div key={title} className="flex items-center justify-between group cursor-pointer border-b border-on-primary-container/20 pb-4">
                        <div>
                          <p className="font-headline font-bold text-base md:text-lg">{title}</p>
                          <p className="text-on-primary-container text-xs md:text-sm">{desc}</p>
                        </div>
                        {icon ? <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                          : <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <h2 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight">Preferences</h2>
                  <div className="space-y-5 md:space-y-6">
                    {[['Newsletter Subscription', 'Receive heritage recipes and news', newsletter, setNewsletter],
                      ['SMS Notifications', 'Order updates and delivery tracking', sms, setSms]].map(([title, desc, val, set]) => (
                      <div key={title} className="flex items-center justify-between cursor-pointer group" onClick={() => set(!val)}>
                        <div>
                          <p className="font-headline font-bold text-base md:text-lg">{title}</p>
                          <p className="text-on-primary-container text-xs md:text-sm">{desc}</p>
                        </div>
                        <div className={`w-10 md:w-12 h-5 md:h-6 ${val ? 'bg-primary-container' : 'bg-on-primary-container/30'} rounded-full relative p-1 transition-colors`}>
                          <div className={`w-3 md:w-4 h-3 md:h-4 bg-white rounded-full transition-all ${val ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
