import { Link } from 'react-router-dom';

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant/30 z-40 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around py-2">
        <Link to="/" className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-[10px] font-headline font-semibold uppercase tracking-wider">Home</span>
        </Link>
        <Link to="/products" className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">shopping_bag</span>
          <span className="text-[10px] font-headline font-semibold uppercase tracking-wider">Products</span>
        </Link>
        <Link to="/traditions" className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-xl">auto_stories</span>
          <span className="text-[10px] font-headline font-semibold uppercase tracking-wider">Traditions</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-0.5 px-3 py-1.5">
          <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center -mt-4 shadow-lg shadow-secondary/30">
            <span className="material-symbols-outlined text-white text-xl">person</span>
          </span>
          <span className="text-[10px] font-headline font-bold uppercase tracking-wider text-secondary">Profile</span>
        </Link>
      </div>
    </nav>
  );
}

function AvatarSection({ profile, avatarUploading, fileInputRef, onUpload, getFullName }) {
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="flex flex-col items-center pt-4 pb-6">
      <div className="relative">
        <div className="w-28 h-28 rounded-full border-4 border-primary/10 overflow-hidden bg-surface-container">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30">
              <span className="material-symbols-outlined text-6xl">account_circle</span>
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
          className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center shadow-md border-2 border-surface disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-on-secondary-container text-lg">
            {avatarUploading ? 'progress_activity' : 'edit'}
          </span>
        </button>
      </div>
      <h2 className="font-headline font-extrabold text-xl text-on-surface mt-4">{getFullName()}</h2>
      {memberSince && (
        <p className="text-on-surface-variant text-sm mt-0.5">Member since {memberSince}</p>
      )}
    </div>
  );
}

function RewardsCard() {
  return (
    <div className="mx-4 rounded-2xl overflow-hidden bg-primary p-6 relative">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-container/20 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-1">
          <p className="text-on-primary/70 text-xs font-headline font-bold uppercase tracking-widest">Heritage Rewards</p>
          <span className="bg-secondary-container text-on-secondary-container text-[10px] font-headline font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Gold Tier
          </span>
        </div>
        <p className="text-on-primary font-brand text-4xl mt-2">
          2,450 <span className="text-lg font-headline font-semibold text-on-primary/70">pts</span>
        </p>
        <div className="flex gap-3 mt-5">
          <div className="flex-1 bg-on-primary/10 rounded-xl px-4 py-3">
            <p className="text-on-primary/60 text-[10px] font-headline font-bold uppercase tracking-widest">Savings</p>
            <p className="text-on-primary font-headline font-bold text-lg mt-0.5">&#8377;1,240</p>
          </div>
          <div className="flex-1 bg-on-primary/10 rounded-xl px-4 py-3">
            <p className="text-on-primary/60 text-[10px] font-headline font-bold uppercase tracking-widest">Orders</p>
            <p className="text-on-primary font-headline font-bold text-lg mt-0.5">12</p>
          </div>
        </div>
        <button className="w-full mt-5 bg-secondary-container text-on-secondary-container py-3 rounded-xl font-headline font-bold text-sm uppercase tracking-wider">
          Redeem Rewards
        </button>
      </div>
    </div>
  );
}

function PersonalInfoSection({ formData, onInputChange, onSave }) {
  return (
    <div className="px-5 mt-8">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-primary text-xl">badge</span>
        <h3 className="font-headline font-extrabold text-lg text-on-surface">Personal Information</h3>
      </div>
      <div className="space-y-5">
        <div className="border-b border-outline-variant/50 pb-3">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1.5">Full Name</label>
          <div className="flex gap-3">
            <input
              className="flex-1 bg-transparent border-none p-0 text-base font-headline font-medium focus:ring-0 text-on-surface outline-none"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={onInputChange}
              placeholder="First name"
            />
            <input
              className="flex-1 bg-transparent border-none p-0 text-base font-headline font-medium focus:ring-0 text-on-surface outline-none"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={onInputChange}
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="border-b border-outline-variant/50 pb-3">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1.5">Email Address</label>
          <input
            className="w-full bg-transparent border-none p-0 text-base font-headline font-medium focus:ring-0 text-on-surface/60 outline-none"
            type="email"
            value={formData.email}
            disabled
          />
        </div>
        <div className="border-b border-outline-variant/50 pb-3">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-1.5">Phone Number</label>
          <input
            className="w-full bg-transparent border-none p-0 text-base font-headline font-medium focus:ring-0 text-on-surface outline-none"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            placeholder="+91 98765 43210"
          />
        </div>
      </div>
      <button
        onClick={onSave}
        className="mt-5 bg-primary text-on-primary px-6 py-3 rounded-xl font-headline font-bold text-sm tracking-wide hover:bg-primary-container transition-colors shadow-md w-full"
      >
        Save Changes
      </button>
    </div>
  );
}

function AddressBookSection({ addresses, onAdd, onEdit, onDelete }) {
  return (
    <div className="px-5 mt-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">location_on</span>
          <h3 className="font-headline font-extrabold text-lg text-on-surface">Address Book</h3>
        </div>
        <button onClick={onAdd} className="flex items-center gap-1 text-secondary font-headline font-bold text-xs uppercase tracking-wider">
          <span className="material-symbols-outlined text-lg">add</span>
          Add New
        </button>
      </div>
      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">location_off</span>
          <p className="text-on-surface-variant mt-3 font-headline text-sm">No addresses saved yet</p>
          <button
            onClick={onAdd}
            className="mt-3 px-5 py-2.5 bg-secondary text-white rounded-lg font-headline font-bold text-sm"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-surface-container-lowest rounded-xl p-5 border-l-4 border-primary/60 relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => {
                    const action = prompt('Type "edit" to edit or "delete" to delete this address');
                    if (action === 'edit') onEdit(addr);
                    if (action === 'delete') onDelete(addr.id);
                  }}
                  className="text-on-surface-variant/50"
                >
                  <span className="material-symbols-outlined text-xl">more_vert</span>
                </button>
              </div>
              <span className="inline-block bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded text-[10px] font-headline font-bold uppercase tracking-widest mb-2">
                {addr.title || 'Address'}
              </span>
              <p className="text-on-surface/80 leading-relaxed text-sm font-medium pr-8">
                {addr.address_line1}
                {addr.address_line2 && <>, {addr.address_line2}</>}
                <br />{addr.city}, {addr.state} - {addr.postal_code}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionLinks({ onPasswordModal, onLogout }) {
  return (
    <div className="px-5 mt-10 mb-6 space-y-1">
      <button className="w-full flex items-center gap-4 py-4 border-b border-outline-variant/30 text-left">
        <span className="material-symbols-outlined text-on-surface-variant text-xl">notifications</span>
        <span className="flex-1 font-headline font-semibold text-on-surface text-sm">Notification Preferences</span>
        <span className="material-symbols-outlined text-on-surface-variant/50 text-lg">chevron_right</span>
      </button>
      <button
        onClick={onPasswordModal}
        className="w-full flex items-center gap-4 py-4 border-b border-outline-variant/30 text-left"
      >
        <span className="material-symbols-outlined text-on-surface-variant text-xl">shield</span>
        <span className="flex-1 font-headline font-semibold text-on-surface text-sm">Privacy & Security</span>
        <span className="material-symbols-outlined text-on-surface-variant/50 text-lg">chevron_right</span>
      </button>
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-4 py-4 text-left"
      >
        <span className="material-symbols-outlined text-error/70 text-xl">logout</span>
        <span className="font-headline font-semibold text-error/70 text-sm">Sign Out</span>
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
    <div className="lg:hidden pb-24">
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
