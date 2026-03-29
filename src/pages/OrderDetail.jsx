export default function OrderDetail() {
  return (
    <main className="pb-16 md:pb-24 px-5 md:px-12 max-w-screen-xl mx-auto pt-28 md:pt-32">
      {/* Order Header */}
      <header className="mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase mb-1 md:mb-2 block">
              Receipt Information
            </p>
            <h1 className="font-brand text-3xl md:text-5xl text-primary tracking-tight leading-none mb-3 md:mb-4">
              HH-94210385
            </h1>
            <p className="text-on-surface-variant max-w-lg leading-relaxed text-sm md:text-base">
              A curation of traditional alkaline extracts and heritage legumes,
              harvested with reverence in the Brahmaputra Valley.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2 bg-secondary-container/20 px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span className="text-secondary font-bold text-sm">Delivered Dec 12, 2023</span>
            </div>
            <span className="text-xs text-on-surface-variant font-medium tracking-wide">
              TRACKING: BLUEDART-9921004
            </span>
          </div>
        </div>
      </header>

      {/* Main Content — stacked on mobile, 12-col grid on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

        {/* Items Column */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          <h2 className="font-brand text-lg md:text-xl text-primary border-b border-outline-variant/30 pb-4">
            Manifest of Goods
          </h2>

          {/* Product Cards — horizontal layout on both sizes, bigger image on desktop */}
          {[
            {
              name: 'Kola Khar', price: '₹450.00', qty: '01',
              tag: 'Ancient Process',
              desc: 'Traditional liquid alkaline extract prepared from the charred skin of Bhim Kol bananas.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRwP676lck-bL5LHqQENKCzRuAfgA5A76MaVgAoUrMsq-3Azl-OTgxcU7b-cou5laGRMKpH6eKiCLw2d1Mp6fUSZ0WBRqNTg-MGnoD6wCoJcPqTKGsU1PJcvzQaN2x4RVhq3tb8vvwS4Sjx42Lzn0MlV84gcIBOpuH3-SsarNDZyy0D_zHMs0KD-P0v7Ki2ucazPVuym_qd_hGSfi4R8ocniIFOo3tuxqYcG94fWhd7dTUCaF17dLBZvFlarlGoukiW18Q2sOGCzkR'
            },
            {
              name: 'Matimah Khar', price: '₹380.00', qty: '02',
              tag: 'Heritage Sourced',
              desc: 'Sun-dried black gram specifically curated for preparing ritualistic Khar dishes. Sourced from Majuli.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9jlSxvOK8RW--nM_iAcVFqzZu-jVdP8nQ56C26kCxWCjsb8gW9S4XeA28yJvqscQobaNpGDH0vLSVWsstRnrE10AqRQ-0euijWDTbO2N-ssKvUa7obgc9bsA2i4gMycwnf7PP_JGPcvXZdbGQnnS3yTbAou5M3DMlEstP7KKGXqaoaNsHSBQoo3vd-pLchBuzem4N0x7j5ll7lerFc_WhBa8WGoYBW-z3KQKZ1orp06CRIgM6wNihFBEMZrbOJJFNqRL9_3ZLJxKY'
            },
          ].map((item) => (
            <div key={item.name} className="group flex gap-4 md:gap-6 p-4 bg-surface-container-low rounded-xl transition-all hover:bg-surface-container">
              <div className="w-24 h-32 md:w-48 md:h-48 overflow-hidden rounded-lg bg-surface-dim flex-shrink-0">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.name} src={item.img} />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline font-bold text-lg md:text-xl text-primary">{item.name}</h3>
                    <span className="font-headline font-bold text-base md:text-lg">{item.price}</span>
                  </div>
                  <p className="text-xs md:text-sm text-on-surface-variant mt-2 line-clamp-2 md:line-clamp-none">{item.desc}</p>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-full">{item.tag}</span>
                    <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-full">Qty: {item.qty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Delivery Timeline — mobile only */}
          <div className="lg:hidden bg-surface-container-low p-5 rounded-2xl border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-secondary">Timeline</span>
            </div>
            <div className="relative pl-6 border-l-2 border-primary/20 space-y-5">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container-low"></div>
                <p className="text-sm font-bold text-primary">Delivered</p>
                <p className="text-xs text-on-surface-variant">Dec 12 • 14:32 PM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-outline-variant ring-4 ring-surface-container-low"></div>
                <p className="text-sm font-bold text-on-surface-variant/60">Out for Delivery</p>
                <p className="text-xs text-on-surface-variant/40">Dec 12 • 09:15 AM</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="flex items-center justify-center gap-2 bg-primary-container text-on-primary-container px-6 md:px-8 py-4 rounded-xl font-headline font-bold hover:bg-primary transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm">refresh</span>
              Reorder Selection
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 md:px-8 py-4 rounded-xl font-headline font-bold hover:bg-primary/5 transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm">download</span>
              Download Invoice
            </button>
          </div>
        </div>

        {/* Summary Column */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
          {/* Address Bento */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-surface-container-highest/30 p-5 md:p-6 rounded-2xl">
              <h5 className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/60 mb-3">Shipping Destination</h5>
              <p className="font-bold text-on-surface">Priyanka Barua</p>
              <p className="text-sm text-on-surface-variant">House No. 12, Jayanagar</p>
              <p className="text-sm text-on-surface-variant">Sixmile, Guwahati 781022</p>
              <p className="text-sm text-on-surface-variant">Assam, India</p>
              <p className="text-sm text-on-surface-variant mt-2">+91 98XXX XXXXX</p>
            </div>
            <div className="bg-surface-container-highest/30 p-5 md:p-6 rounded-2xl">
              <h5 className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/60 mb-3">Billing Method</h5>
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary-container">account_balance_wallet</span>
                <p className="text-sm font-bold text-primary">UPI Transfer</p>
              </div>
              <p className="text-[10px] text-on-surface-variant font-medium">Transaction ID: TXN_98210385_HAT</p>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-primary text-on-primary p-6 md:p-8 rounded-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
            <h4 className="font-brand text-lg mb-5 relative z-10">Financial Ledger</h4>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between text-sm opacity-80">
                <span>Subtotal</span><span>₹1,210.00</span>
              </div>
              <div className="flex justify-between text-sm opacity-80">
                <span>Shipping &amp; Handling</span><span>₹80.00</span>
              </div>
              <div className="flex justify-between text-sm opacity-80">
                <span>Taxes (GST 5%)</span><span>₹60.50</span>
              </div>
              <div className="pt-4 mt-4 border-t border-on-primary/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-secondary-fixed-dim">Final Settlement</p>
                  <span className="font-brand text-2xl md:text-3xl text-secondary-fixed-dim">₹1,350.50</span>
                </div>
                <button className="bg-primary-container text-on-primary-container px-4 py-3 rounded-xl flex items-center gap-2 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span className="text-xs font-bold tracking-widest uppercase">Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
