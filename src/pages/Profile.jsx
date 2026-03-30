import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { addressService } from '../services/addressService';
import { avatarService } from '../services/avatarService';
import AddressModal from '../components/AddressModal';
import ChangePasswordModal from '../components/ChangePasswordModal';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Personal Details');
  const [newsletter, setNewsletter] = useState(true);
  const [sms, setSms] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const { user, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
    fetchAddresses();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      console.log('Fetching profile for user:', user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      console.log('Profile fetch result:', { data, error });

      if (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }

      if (data) {
        console.log('Setting profile data:', data);
        setProfile(data);
        const newFormData = {
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || user.email || '',
          phone: data.phone || ''
        };
        console.log('Setting form data:', newFormData);
        setFormData(newFormData);
      } else {
        console.warn('No profile data returned');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Error loading profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const data = await addressService.getAddresses(user.id);
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
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
      console.log('Updating profile with data:', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        user_id: user.id
      });

      const { data, error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select();

      console.log('Update result:', { data, error });

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      alert('Profile updated successfully!');
      await fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowAddressModal(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressModal(true);
  };

  const handleSaveAddress = async (addressData) => {
    try {
      if (editingAddress) {
        await addressService.updateAddress(editingAddress.id, addressData);
      } else {
        await addressService.createAddress(user.id, addressData);
      }
      await fetchAddresses();
      setShowAddressModal(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      await addressService.deleteAddress(addressId);
      await fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a JPG, PNG, or WebP image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB');
      return;
    }

    setAvatarUploading(true);
    try {
      const avatarUrl = await avatarService.uploadAvatar(user.id, file);
      setProfile(prev => ({ ...prev, avatar_url: avatarUrl }));
      await refreshProfile();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload photo');
    } finally {
      setAvatarUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    if (!confirm('Remove your profile photo?')) return;
    setAvatarUploading(true);
    try {
      await avatarService.removeAvatar(user.id);
      setProfile(prev => ({ ...prev, avatar_url: null }));
      await refreshProfile();
    } catch (error) {
      console.error('Error removing avatar:', error);
      alert('Failed to remove photo');
    } finally {
      setAvatarUploading(false);
    }
  };

  const isAdmin = profile?.is_admin === true;

  const sidebarLinks = [
    { label: 'Personal Details', href: '/profile', icon: 'person', active: true },
    { label: 'My Orders', href: '/orders', icon: 'package_2', active: false },
    { label: 'Wishlist', href: '/wishlist', icon: 'favorite', active: false },
    ...(isAdmin ? [{ label: 'Admin Panel', href: '/admin', icon: 'admin_panel_settings', active: false, admin: true }] : []),
    { label: 'Log Out', onClick: handleLogout, icon: 'logout', active: false, danger: true },
  ];

  const getFullName = () => {
    const parts = [formData.first_name, formData.last_name].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : 'User';
  };

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
        <div className="mb-10 md:mb-16">
          <h1 className="font-brand text-5xl md:text-8xl text-primary leading-none tracking-tighter uppercase">My Profile</h1>
          <div className="w-24 md:w-32 h-1.5 md:h-2 bg-secondary mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 md:gap-16">
          <aside className="space-y-8 md:space-y-12">
            <div className="flex gap-2 flex-wrap lg:hidden">
              {sidebarLinks.filter(l => !l.danger).map(l => (
                <button key={l.label} onClick={() => setActiveTab(l.label)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === l.label ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                  {l.label}
                </button>
              ))}
            </div>
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
                    <span className={`font-headline font-${link.label === 'Personal Details' ? 'extrabold' : 'bold'} text-xl ${link.label === 'Personal Details' ? 'text-primary' : link.admin ? 'text-secondary' : 'text-on-surface'} tracking-tight`}>{link.label}</span>
                  </Link>
                )
              ))}
            </nav>
            <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border-l-4 border-secondary">
              <p className="font-headline font-bold text-primary-container mb-1 text-sm">Heritage Rewards</p>
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">You have earned</p>
              <p className="text-3xl font-brand text-secondary mt-1">450 pts</p>
            </div>
          </aside>

          <section className="space-y-16 md:space-y-24">
            <div>
              <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mb-8 md:mb-10 tracking-tight">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-surface-container-low p-8 md:p-10 rounded-xl space-y-6 md:space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><span className="material-symbols-outlined text-7xl md:text-8xl">ecg_heart</span></div>
                  <div className="space-y-5 md:space-y-6">
                    <div className="border-b border-outline-variant pb-2">
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1">First Name</label>
                      <input
                        className="w-full bg-transparent border-none p-0 text-lg md:text-xl font-headline font-semibold focus:ring-0 text-on-surface outline-none"
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="First name"
                      />
                    </div>
                    <div className="border-b border-outline-variant pb-2">
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1">Last Name</label>
                      <input
                        className="w-full bg-transparent border-none p-0 text-lg md:text-xl font-headline font-semibold focus:ring-0 text-on-surface outline-none"
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Last name"
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
                <div className="relative rounded-xl overflow-hidden aspect-square md:aspect-auto min-h-[200px] bg-surface-container flex items-center justify-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  {profile?.avatar_url ? (
                    <img
                      className="w-full h-full object-cover"
                      alt="Profile"
                      src={profile.avatar_url}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-on-surface-variant/40">
                      <span className="material-symbols-outlined text-8xl">account_circle</span>
                      <p className="font-headline text-sm mt-2">No photo yet</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6 md:p-8">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={avatarUploading}
                        className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined">{avatarUploading ? 'progress_activity' : 'photo_camera'}</span>
                        <span className="font-headline font-bold uppercase text-xs tracking-widest">
                          {avatarUploading ? 'Uploading...' : profile?.avatar_url ? 'Change Photo' : 'Upload Photo'}
                        </span>
                      </button>
                      {profile?.avatar_url && !avatarUploading && (
                        <button
                          onClick={handleRemoveAvatar}
                          className="flex items-center space-x-1 text-white/60 hover:text-white/90 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          <span className="font-headline font-bold uppercase text-[10px] tracking-widest">Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-8 md:mb-10">
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">Address Book</h2>
                <button
                  onClick={handleAddAddress}
                  className="flex items-center space-x-2 text-secondary hover:text-on-secondary-fixed-variant transition-colors group"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="font-headline font-bold uppercase text-xs tracking-widest hidden md:inline">Add New Address</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {addresses.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-30">location_off</span>
                    <p className="text-on-surface-variant mt-4 font-headline">No addresses saved yet</p>
                    <button
                      onClick={handleAddAddress}
                      className="mt-4 px-6 py-3 bg-secondary text-white rounded-lg font-headline font-bold hover:bg-secondary/90 transition-colors"
                    >
                      Add Your First Address
                    </button>
                  </div>
                ) : (
                  addresses.map(addr => (
                    <div key={addr.id} className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/30 hover:border-secondary transition-colors relative group">
                      <div className="absolute top-4 md:top-6 right-4 md:right-6 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditAddress(addr)}
                          className="material-symbols-outlined text-on-surface-variant hover:text-primary text-lg"
                        >
                          edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="material-symbols-outlined text-on-surface-variant hover:text-error text-lg"
                        >
                          delete
                        </button>
                      </div>
                      {addr.is_default && (
                        <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4">
                          Default Shipping
                        </span>
                      )}
                      <p className="font-headline font-bold text-base md:text-lg mb-2 text-on-surface">{addr.title}</p>
                      <p className="text-on-surface-variant leading-relaxed font-medium text-sm">
                        {addr.address_line1}
                        {addr.address_line2 && <><br />{addr.address_line2}</>}
                        <br />{addr.city}, {addr.state}
                        <br />{addr.postal_code}, {addr.country}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-primary text-on-primary p-8 md:p-12 rounded-2xl overflow-hidden relative">
              <div className="absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[#00643c] rounded-full translate-x-1/2 translate-y-1/2 opacity-20 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <div className="space-y-6 md:space-y-8">
                  <h2 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight">Security &amp; Privacy</h2>
                  <div className="space-y-5 md:space-y-6">
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="w-full flex items-center justify-between group cursor-pointer border-b border-on-primary-container/20 pb-4 text-left"
                    >
                      <div>
                        <p className="font-headline font-bold text-base md:text-lg">Change Password</p>
                        <p className="text-on-primary-container text-xs md:text-sm">Update your account password</p>
                      </div>
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                    </button>
                    <div className="flex items-center justify-between group cursor-pointer border-b border-on-primary-container/20 pb-4">
                      <div>
                        <p className="font-headline font-bold text-base md:text-lg">Two-Factor Authentication</p>
                        <p className="text-on-primary-container text-xs md:text-sm">Enabled for extra protection</p>
                      </div>
                      <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <h2 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight">Preferences</h2>
                  <div className="space-y-5 md:space-y-6">
                    <div className="flex items-center justify-between cursor-pointer group" onClick={() => setNewsletter(!newsletter)}>
                      <div>
                        <p className="font-headline font-bold text-base md:text-lg">Newsletter Subscription</p>
                        <p className="text-on-primary-container text-xs md:text-sm">Receive heritage recipes and news</p>
                      </div>
                      <div className={`w-10 md:w-12 h-5 md:h-6 ${newsletter ? 'bg-primary-container' : 'bg-on-primary-container/30'} rounded-full relative p-1 transition-colors`}>
                        <div className={`w-3 md:w-4 h-3 md:h-4 bg-white rounded-full transition-all ${newsletter ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between cursor-pointer group" onClick={() => setSms(!sms)}>
                      <div>
                        <p className="font-headline font-bold text-base md:text-lg">SMS Notifications</p>
                        <p className="text-on-primary-container text-xs md:text-sm">Order updates and delivery tracking</p>
                      </div>
                      <div className={`w-10 md:w-12 h-5 md:h-6 ${sms ? 'bg-primary-container' : 'bg-on-primary-container/30'} rounded-full relative p-1 transition-colors`}>
                        <div className={`w-3 md:w-4 h-3 md:h-4 bg-white rounded-full transition-all ${sms ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        address={editingAddress}
      />

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </main>
  );
}
