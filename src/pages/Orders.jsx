import { Link } from 'react-router-dom';

const orders = [
  {
    id: '#HTV-829104', date: 'Oct 14, 2023', total: '₹2,450.00',
    status: 'Delivered', statusClass: 'bg-primary/10 text-primary', dotClass: 'bg-primary',
    cardClass: 'hover:bg-surface-container',
    items: [
      { name: 'Kola Khar Heritage Jar', qty: '02', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4Wqfh_HN-Sf0U7XW9WMXrRlqWD_rsO7VccRZgw3SZ3FPld_rfBSGf6l3YVgHXhsjaIj0MQ8fFuv3UibnReUnovaGVdyH7nZLIvBpykYRZgfkzegbJ_BySzudNbIGATzw-Vu7PNabOBIg9cDOJI7Kms5VtfJfvaSToHf6bed01iWOVwVYvhV3fXGoAkraCLwvoNMTD_R2SoV4fcHd9_rbOxBZXUtJyNemitt4MWfh2Wv7CXGgW9MaVxRRJsSnn488qZ9_z4RSAHxHh' },
      { name: 'Matimah Khar (Classic)', qty: '01', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3_crQcTxXbQN1eid3kuXwvOBc4XcLspVW0h4Abdxddf_SfAgS21c0PBxWL4dxCmEffdXEkawPSrtKl5QzMDgA2bCC6n0JEUh6Yabkpe8wUud3YFNfIQ-uvBr7omXdotd_E_lP0fNIttgcCX_ZuNh4RUwgjGNXsSPvfPOftJjSvOyY2xAqPpXmbcmk2-isXjn_rDP476jMZKkcOQnXx_L2otQIgobYRxIC1xQ_QqEWgh1D1-U6RgYucHh-egUuhkdIMQNPeg2__3fC' },
    ],
    actions: [{ label: 'Invoice', icon: 'download', secondary: true }, { label: 'View Details', icon: null }],
  },
  {
    id: '#HTV-830021', date: 'Today, 09:45 AM', total: '₹1,120.00',
    status: 'Shipped', statusClass: 'bg-secondary-container/20 text-on-secondary-container', dotClass: 'bg-secondary-container',
    cardClass: 'border border-outline-variant/10',
    items: [
      { name: 'Aromatic Forest Tea', qty: '01', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-y7kxktm4ULTMZE2XOK9eFGrlaYlaTEcbWgWW_z_0hMNBQii6kFIIwrg7ebWQW-01nZ79iVlHVMCrPPiznff3-vtyZ0jjUm8XNPdmXEjTUkAtDpC84mLVB3UQwREJr-3FiGep7H92Axj9bZeRkm_CDKc5EGanzPtFQ_UOpXDtKNqsDXLzxtZThPCsEsj13AU7jvPwFkwptwmGHexunEM5BROASa_TE6KCDK2Nn5Ndk2gdU-3HUX3y9u0syxIpmYyR9uRvGI7rpR8v' },
    ],
    actions: [{ label: 'Track Package', icon: null }],
  },
  {
    id: '#HTV-828551', date: 'Sep 28, 2023', total: '₹890.00',
    status: 'Processing', statusClass: 'bg-outline-variant/20 text-on-surface-variant', dotClass: 'bg-outline-variant',
    cardClass: 'border border-outline-variant/10 opacity-75 grayscale hover:grayscale-0 hover:opacity-100',
    items: [
      { name: 'Bamboo Utility Set', qty: '01', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXLmKtF509MO7A4yFwrlEo3BWHupLm7kBjZLX9wYDLQ589OiQoZ31LxXlUPiYFpkm7nWuzCA0e417ij69dOF6Oi4j1OUYr6tnH_SmCosp0BxuYglH4HvGdDCVRLMCN9lrTAcNkrhXXiTyTXrfDD6MD013fe2hr9q5Jge424MWNzyH5bMnHgx5gsB5fi0ETPoWDiUycQI4jUOIfVDF5YKysijk_J4tbTSuo1hHmltKuSIKiSjcs8n_9DFNlUXt26x0DZiW4rA94M4fn' },
    ],
    actions: [{ label: 'Details Pending', disabled: true }],
  },
];

export default function Orders() {
  return (
    <main className="pt-24 pb-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 md:gap-12">
          {/* Sidebar */}
          <aside className="space-y-6 md:space-y-8">
            <div>
              <h2 className="font-brand text-xl md:text-2xl text-primary mb-4 md:mb-6">Account</h2>
              <nav className="flex flex-row lg:flex-col gap-2 flex-wrap">
                {[
                  { label: 'My Profile', href: '/profile', icon: 'person', active: false },
                  { label: 'My Orders', href: '/orders', icon: 'package_2', active: true },
                  { label: 'Wishlist', href: '#', icon: 'favorite', active: false },
                  { label: 'Addresses', href: '#', icon: 'location_on', active: false },
                ].map(link => (
                  <Link key={link.label} to={link.href}
                    className={`group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-all text-sm md:text-base ${link.active ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-container-high text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-lg md:text-xl" style={link.active ? { fontVariationSettings: "'FILL' 1" } : {}}>{link.icon}</span>
                    <span className="font-headline font-semibold hidden sm:inline">{link.label}</span>
                  </Link>
                ))}
                <div className="pt-2 mt-1 md:mt-2 border-t border-outline-variant/20 w-full">
                  <button className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-all hover:bg-error-container/20 text-error w-full text-sm md:text-base">
                    <span className="material-symbols-outlined text-lg md:text-xl">logout</span>
                    <span className="font-headline font-semibold hidden sm:inline">Logout</span>
                  </button>
                </div>
              </nav>
            </div>
            <div className="bg-secondary-container p-5 md:p-6 rounded-2xl relative overflow-hidden hidden lg:block">
              <div className="relative z-10">
                <h4 className="font-headline font-bold text-on-secondary-container mb-2 text-sm">Need assistance?</h4>
                <p className="text-xs text-on-secondary-container/80 mb-4 leading-relaxed">Our heritage experts are available to help with your traditional orders.</p>
                <button className="bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-transform active:scale-95">Contact Support</button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-on-secondary-container/10 text-8xl rotate-12">help_center</span>
            </div>
          </aside>

          {/* Orders List */}
          <section className="min-w-0">
            <header className="mb-8 md:mb-12">
              <h1 className="font-brand text-4xl md:text-6xl text-primary tracking-tighter leading-none mb-3 md:mb-4">My Orders</h1>
              <p className="text-on-surface-variant max-w-xl font-body leading-relaxed text-sm md:text-base">A curated history of your journey through the authentic flavors and traditions of North East India.</p>
            </header>

            <div className="space-y-6 md:space-y-8">
              {orders.map(order => (
                <div key={order.id} className={`bg-surface-container-low rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-500 ${order.cardClass}`}>
                  <div className="p-6 md:p-8 lg:p-10">
                    {/* Order Meta */}
                    <div className="flex flex-wrap items-start justify-between gap-4 md:gap-6 mb-6 md:mb-10 pb-6 md:pb-8 border-b border-outline-variant/30">
                      {[['Order Reference', order.id, 'font-brand text-lg md:text-xl text-primary'],
                        ['Date Placed', order.date, 'font-headline font-bold text-sm md:text-base'],
                        ['Total Amount', order.total, 'font-headline font-bold text-secondary text-lg md:text-xl']].map(([label, val, cls]) => (
                        <div key={label} className="space-y-1 min-w-[100px]">
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-outline">{label}</p>
                          <p className={cls}>{val}</p>
                        </div>
                      ))}
                      <span className={`${order.statusClass} px-3 md:px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 self-start`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${order.dotClass}`} />{order.status}
                      </span>
                    </div>

                    {/* Items + Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2">
                        {order.items.map(item => (
                          <div key={item.name} className="flex-shrink-0 group">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl md:rounded-2xl bg-surface-container-highest overflow-hidden mb-2 md:mb-3">
                              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.img} alt={item.name} />
                            </div>
                            <p className="text-xs font-bold leading-tight max-w-[96px] md:max-w-[128px]">{item.name}</p>
                            <p className="text-[10px] text-outline">Qty: {item.qty}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex md:justify-end gap-3 md:gap-4 flex-wrap">
                        {order.actions.map(action => (
                          <button key={action.label}
                            disabled={action.disabled}
                            className={`px-5 md:px-8 py-3 md:py-4 rounded-xl font-headline font-bold text-xs md:text-sm flex items-center gap-2 transition-all ${
                              action.disabled ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-50'
                              : action.secondary ? 'bg-surface-container-highest text-on-surface-variant hover:bg-outline-variant/20'
                              : 'bg-primary text-on-primary hover:bg-primary-container shadow-lg shadow-primary/10'}`}>
                            {action.label}
                            {action.icon && <span className="material-symbols-outlined text-sm">{action.icon}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Banner */}
            <div className="mt-12 md:mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary to-primary-container text-on-primary flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden">
              <div className="relative z-10 max-w-md">
                <h3 className="font-brand text-2xl md:text-3xl mb-3 md:mb-4 leading-tight">Missing something traditional?</h3>
                <p className="text-on-primary-container/90 font-body text-xs md:text-sm leading-relaxed mb-5 md:mb-6">Explore our new collection of heritage spices and artisanal pantry staples from the heart of the hills.</p>
                <Link to="/products">
                  <button className="bg-secondary-container text-on-secondary-container px-8 md:px-10 py-3 md:py-4 rounded-full font-headline font-bold text-sm transition-all hover:shadow-xl active:scale-95">Explore Collections</button>
                </Link>
              </div>
              <div className="relative z-10 hidden md:block">
                <span className="material-symbols-outlined text-[100px] md:text-[120px] opacity-20" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
