import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function MobileBottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/products', icon: 'shopping_bag', label: 'Products' },
    { to: '/traditions', icon: 'auto_stories', label: 'Traditions' },
    { to: '/profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-around px-2 pt-1 pb-2">
        {links.map(({ to, icon, label }) => {
          const active = path === to || (to !== '/' && path.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all duration-200 press-effect ${
                active ? 'text-primary' : 'text-on-surface-variant/60'
              }`}
            >
              <span className={`relative flex items-center justify-center w-10 h-7 rounded-full transition-all duration-200 ${
                active ? 'bg-primary/10' : ''
              }`}>
                <span className={`material-symbols-outlined transition-all duration-200 ${
                  active ? 'text-[22px]' : 'text-[20px]'
                }`}
                  style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400" }}>
                  {icon}
                </span>
              </span>
              <span className={`text-[10px] font-headline font-bold uppercase tracking-wide transition-all duration-200 ${
                active ? 'text-primary' : 'text-on-surface-variant/60'
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function AvatarSection({ profile, avatarUploading, fileInputRef, onUpload, getFullName }) {
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="flex flex-col items-center pt-6 pb-8 animate-fade-up">
      <div className="relative animate-scale-in">
        <div className="w-[104px] h-[104px] rounded-full overflow-hidden bg-surface-container ring-4 ring-primary/10 shadow-lg shadow-primary/10">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
              <span className="material-symbols-outlined text-on-surface-variant/40"
                style={{ fontSize: '52px', fontVariationSettings: "'FILL' 1" }}>
                account_circle
              </span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={onUpload}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={avatarUploading}
          className="absolute -bottom-0.5 -right-0.5 w-8 h-8 rounded-full bg-secondary-container border-2 border-surface flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50"
        >
          <span
            className={`material-symbols-outlined text-on-secondary-container transition-all ${avatarUploading ? 'animate-spin' : ''}`}
            style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1, 'wght' 700" }}
          >
            {avatarUploading ? 'progress_activity' : 'edit'}
          </span>
        </button>
      </div>

      <h2 className="font-headline font-extrabold text-[22px] text-on-surface mt-5 tracking-tight leading-tight">
        {getFullName()}
      </h2>
      {memberSince && (
        <p className="text-on-surface-variant text-[13px] font-body mt-1 tracking-wide">
          Member since {memberSince}
        </p>
      )}
    </div>
  );
}

function RewardsCard() {
  return (
    <div className="mx-4 rounded-2xl overflow-hidden relative animate-fade-up delay-100"
      style={{ background: 'linear-gradient(145deg, #003d24 0%, #005230 45%, #006b3e 100%)' }}>
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none" />
      <div className="animate-shimmer absolute inset-0 pointer-events-none" />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/50 text-[11px] font-headline font-bold uppercase tracking-[0.18em]">
              Heritage Rewards
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-white font-brand text-[38px] leading-none">2,450</span>
              <span className="text-white/60 font-headline font-semibold text-[15px]">pts</span>
            </div>
          </div>
          <span className="mt-1 bg-secondary-container/90 text-on-secondary-container text-[10px] font-headline font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-md">
            Gold Tier
          </span>
        </div>

        <div className="flex gap-3 mt-5">
          {[
            { label: 'Savings', value: '₹1,240' },
            { label: 'Orders', value: '12' },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3.5 border border-white/10">
              <p className="text-white/50 text-[10px] font-headline font-bold uppercase tracking-[0.18em]">{label}</p>
              <p className="text-white font-headline font-extrabold text-[18px] mt-1 leading-none">{value}</p>
            </div>
          ))}
        </div>

        <button className="w-full mt-5 bg-secondary-container text-on-secondary-container py-3.5 rounded-xl font-headline font-black text-[13px] uppercase tracking-[0.15em] transition-all duration-200 hover:brightness-105 active:scale-[0.98] press-effect shadow-lg shadow-black/20">
          Redeem Rewards
        </button>
      </div>
    </div>
  );
}

function InputField({ label, type = 'text', name, value, onChange, placeholder, disabled }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative pb-4">
      <label className={`block text-[10px] uppercase tracking-[0.2em] font-bold mb-2 transition-colors duration-200 ${
        focused ? 'text-primary' : 'text-on-surface-variant/70'
      }`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-none p-0 pb-1 text-[15px] font-headline font-medium text-on-surface outline-none disabled:text-on-surface/40 placeholder:text-on-surface-variant/30 transition-colors duration-200"
      />
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-300 ${
        focused ? 'bg-primary scale-x-100' : 'bg-outline-variant/40 scale-x-100'
      }`} style={{ transformOrigin: 'left' }} />
    </div>
  );
}

function PersonalInfoSection({ formData, onInputChange, onSave }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="px-5 mt-9 animate-fade-up delay-200">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary"
            style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
            badge
          </span>
        </div>
        <h3 className="font-headline font-extrabold text-[17px] text-on-surface tracking-tight">Personal Information</h3>
      </div>

      <div className="space-y-1">
        <div className="flex gap-4">
          <div className="flex-1">
            <InputField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={onInputChange}
              placeholder="First name"
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={onInputChange}
              placeholder="Last name"
            />
          </div>
        </div>
        <InputField
          label="Email Address"
          type="email"
          value={formData.email}
          disabled
        />
        <InputField
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          placeholder="+91 98765 43210"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className={`mt-6 w-full py-3.5 rounded-xl font-headline font-bold text-[13px] uppercase tracking-[0.15em] transition-all duration-300 press-effect shadow-md ${
          saved
            ? 'bg-green-600 text-white shadow-green-600/20'
            : 'bg-primary text-on-primary shadow-primary/20 hover:brightness-110 active:scale-[0.98]'
        } disabled:opacity-60`}
      >
        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}

function AddressMenu({ address, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 hover:bg-surface-container active:bg-surface-container-high press-effect"
      >
        <span className="material-symbols-outlined text-on-surface-variant/60" style={{ fontSize: '18px' }}>
          more_vert
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-9 w-36 bg-surface-container-lowest rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-outline-variant/20 overflow-hidden z-30 animate-scale-in origin-top-right">
          <button
            onClick={() => { onEdit(address); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-[13px] font-headline font-semibold text-on-surface hover:bg-surface-container transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '16px' }}>edit</span>
            Edit
          </button>
          <div className="h-px bg-outline-variant/20 mx-3" />
          <button
            onClick={() => { onDelete(address.id); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-[13px] font-headline font-semibold text-error hover:bg-error-container/20 transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-error" style={{ fontSize: '16px' }}>delete</span>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function AddressBookSection({ addresses, onAdd, onEdit, onDelete }) {
  return (
    <div className="px-5 mt-9 animate-fade-up delay-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary"
              style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
          </div>
          <h3 className="font-headline font-extrabold text-[17px] text-on-surface tracking-tight">Address Book</h3>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 text-secondary font-headline font-bold text-[12px] uppercase tracking-wider press-effect hover:text-secondary/80 transition-colors duration-150"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
          Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-10">
          <span className="material-symbols-outlined text-on-surface-variant/20"
            style={{ fontSize: '52px', fontVariationSettings: "'FILL' 1" }}>
            location_off
          </span>
          <p className="text-on-surface-variant font-headline font-medium text-[14px] mt-3">No addresses saved yet</p>
          <button
            onClick={onAdd}
            className="mt-4 px-6 py-2.5 bg-primary text-on-primary rounded-xl font-headline font-bold text-[13px] tracking-wide press-effect shadow-md shadow-primary/20"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr, i) => (
            <div
              key={addr.id}
              className="bg-surface-container-lowest rounded-2xl p-5 border-l-[3px] border-primary/70 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-up"
              style={{ animationDelay: `${0.35 + i * 0.07}s` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="inline-block bg-surface-container text-on-surface-variant/80 px-2.5 py-0.5 rounded-md text-[10px] font-headline font-black uppercase tracking-[0.18em] mb-2.5">
                    {addr.title || 'Address'}
                  </span>
                  <p className="text-on-surface/80 text-[13px] font-body leading-[1.65] pr-2">
                    {addr.address_line1}
                    {addr.address_line2 && `, ${addr.address_line2}`}
                    <br />
                    {addr.city}, {addr.state} &ndash; {addr.postal_code}
                  </p>
                </div>
                <AddressMenu address={addr} onEdit={onEdit} onDelete={onDelete} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionLinks({ onPasswordModal, onLogout }) {
  const items = [
    {
      icon: 'notifications',
      label: 'Notification Preferences',
      onClick: null,
      danger: false,
    },
    {
      icon: 'shield',
      label: 'Privacy & Security',
      onClick: onPasswordModal,
      danger: false,
    },
  ];

  return (
    <div className="px-5 mt-9 mb-2 animate-fade-up delay-400">
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10">
        {items.map(({ icon, label, onClick }, i) => (
          <div key={label}>
            <button
              onClick={onClick}
              className="w-full flex items-center gap-4 px-5 py-4 text-left press-effect hover:bg-surface-container/60 active:bg-surface-container transition-colors duration-150"
            >
              <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant"
                  style={{ fontSize: '18px' }}>
                  {icon}
                </span>
              </div>
              <span className="flex-1 font-headline font-semibold text-[14px] text-on-surface">{label}</span>
              <span className="material-symbols-outlined text-on-surface-variant/40 transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ fontSize: '18px' }}>
                chevron_right
              </span>
            </button>
            {i < items.length - 1 && <div className="h-px bg-outline-variant/15 mx-5" />}
          </div>
        ))}
      </div>

      <button
        onClick={onLogout}
        className="w-full flex items-center gap-4 px-5 py-4 mt-3 text-left press-effect rounded-2xl hover:bg-error/5 transition-colors duration-150"
      >
        <div className="w-9 h-9 rounded-full bg-error/8 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-error/70"
            style={{ fontSize: '18px' }}>
            logout
          </span>
        </div>
        <span className="font-headline font-semibold text-[14px] text-error/70">Sign Out</span>
      </button>
    </div>
  );
}

export default function ProfileMobileView({
  profile,
  formData,
  addresses,
  avatarUploading,
  fileInputRef,
  onAvatarUpload,
  onInputChange,
  onSave,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onPasswordModal,
  onLogout,
  getFullName,
}) {
  return (
    <div className="lg:hidden pb-32 bg-surface min-h-screen">
      <AvatarSection
        profile={profile}
        avatarUploading={avatarUploading}
        fileInputRef={fileInputRef}
        onUpload={onAvatarUpload}
        getFullName={getFullName}
      />
      <RewardsCard />
      <PersonalInfoSection
        formData={formData}
        onInputChange={onInputChange}
        onSave={onSave}
      />
      <AddressBookSection
        addresses={addresses}
        onAdd={onAddAddress}
        onEdit={onEditAddress}
        onDelete={onDeleteAddress}
      />
      <ActionLinks
        onPasswordModal={onPasswordModal}
        onLogout={onLogout}
      />
      <MobileBottomNav />
    </div>
  );
}
