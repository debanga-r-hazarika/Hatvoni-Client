import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [payment, setPayment] = useState('upi');
  const [form, setForm] = useState({ firstName: '', lastName: '', address: '', city: '', postal: '', phone: '', cardName: '', cardNum: '', expiry: '', cvv: '' });

  const orderItems = [
    { name: 'Smoked Naga Chili Powder', sub: '100g • Traditional Hearth-Smoked', qty: 1, price: 450, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDWitMPWtaRrI4yOuYAEmlgVz0H3QC3yTpQTjOGQ_F_9UFPzVNw7OnmKcvTGOLboLZFFkKcnc0x0_IqE_huuxDi_DToEVaNCw6Mzmv3an1_EuP-bJiQx-PaXMTBroYck0yxV0dlyfCOCsM_3kcqCPmVUfmGqL8ESSVGrBBQp1Tt7wvPMlTSKYeIWNf4Qk6EAEhDmTjN6W8STK3HKE7KVkInVhV0lRCdgx6f-_bZ_TT_VC2-X-r4DoRaycPHDQDQ-q6T-zdSlsU8yAn' },
    { name: 'Forbidden Black Rice', sub: '1kg • GI Tagged Manipur Origin', qty: 2, price: 840, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwAm6NBAvgKYxWJ-W-RUMsoZw_JxkVPIFSwQkS0b4Hi9rhB18ky7xXY1589piwGFbYdXX0EXm-6_in6rSkXAOLkrNzkeVwDa1TPq6CFjGTgtJDfMDP5_l_M6ThdNck10v7QehtiaQoNjey5ABF5LxGAaWUA0MdXd_8Rtd5Ad8vCNuoCjPwfRf-clr9wP_s1PNUI2loSCBOMlCbCLg_cLq_hx-LLPTRJ70AJU6feYnBbDV93hoeG5CNJrqlZEF-HZPgl4d7wwjbBs9B' },
  ];

  const f = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div className="min-h-screen bg-background">
      {/* Transactional Header */}
      <header className="bg-background sticky top-0 z-50 py-4 md:py-6 px-6 md:px-8 flex justify-between items-center max-w-7xl mx-auto w-full border-b border-outline-variant/20">
        <Link to="/" className="font-brand text-xl md:text-2xl text-primary tracking-tighter">Hatvoni</Link>
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-lg">lock</span>
          <span className="font-headline font-semibold text-xs md:text-sm tracking-tight">SECURE CHECKOUT</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 pb-20 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          {/* Left: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-12 md:space-y-16">
            {/* Step 1: Shipping */}
            <section>
              <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
                <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline font-bold text-sm">1</span>
                <h2 className="font-headline text-xl md:text-2xl font-bold tracking-tight text-primary uppercase">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10">
                {[['First Name', 'firstName', 'text', 'e.g. Arom'], ['Last Name', 'lastName', 'text', 'e.g. Singh']].map(([label, key, type, ph]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-outline">{label}</label>
                    <input value={form[key]} onChange={e => f(key, e.target.value)} type={type} placeholder={ph}
                      className="border-0 border-b-2 border-outline-variant bg-transparent rounded-none px-0 py-2 text-on-surface placeholder:text-outline-variant/50 focus:ring-0 focus:border-primary transition-colors outline-none"
                    />
                  </div>
                ))}
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-outline">Delivery Address</label>
                  <input value={form.address} onChange={e => f('address', e.target.value)} type="text" placeholder="Street, Colony, House No."
                    className="border-0 border-b-2 border-outline-variant bg-transparent rounded-none px-0 py-2 text-on-surface placeholder:text-outline-variant/50 focus:ring-0 focus:border-primary transition-colors outline-none"
                  />
                </div>
                {[['City / Town', 'city', 'text', 'e.g. Imphal'], ['Postal Code', 'postal', 'text', '795001']].map(([label, key, type, ph]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-outline">{label}</label>
                    <input value={form[key]} onChange={e => f(key, e.target.value)} type={type} placeholder={ph}
                      className="border-0 border-b-2 border-outline-variant bg-transparent rounded-none px-0 py-2 text-on-surface placeholder:text-outline-variant/50 focus:ring-0 focus:border-primary transition-colors outline-none"
                    />
                  </div>
                ))}
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-outline">Contact Number</label>
                  <input value={form.phone} onChange={e => f('phone', e.target.value)} type="tel" placeholder="+91 00000 00000"
                    className="border-0 border-b-2 border-outline-variant bg-transparent rounded-none px-0 py-2 text-on-surface placeholder:text-outline-variant/50 focus:ring-0 focus:border-primary transition-colors outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Payment */}
            <section>
              <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
                <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline font-bold text-sm">2</span>
                <h2 className="font-headline text-xl md:text-2xl font-bold tracking-tight text-primary uppercase">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[{ id: 'upi', icon: 'account_balance_wallet', title: 'UPI / Digital Transfer', sub: 'Fast & Secure via PhonePe, GPay' },
                  { id: 'card', icon: 'credit_card', title: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' }].map(p => (
                  <label key={p.id} className={`relative flex flex-col p-5 md:p-6 rounded-xl cursor-pointer border-2 transition-all ${payment === p.id ? 'border-primary bg-surface-container-highest' : 'border-transparent bg-surface-container-low hover:bg-surface-container-high'}`}
                    onClick={() => setPayment(p.id)}>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`material-symbols-outlined scale-125 ${payment === p.id ? 'text-primary' : 'text-outline'}`}>{p.icon}</span>
                      {payment === p.id && <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                    </div>
                    <span className="font-headline font-bold text-on-surface text-sm md:text-base">{p.title}</span>
                    <span className="text-xs text-outline mt-1 uppercase tracking-tighter">{p.sub}</span>
                  </label>
                ))}
              </div>
              {payment === 'card' && (
                <div className="mt-6 md:mt-10 p-6 md:p-8 rounded-xl bg-surface-container-low">
                  <div className="flex flex-col gap-6">
                    {[['Cardholder Name', 'cardName', 'text', 'Full Name as on card'], ['Card Number', 'cardNum', 'text', '0000 0000 0000 0000']].map(([l, k, t, ph]) => (
                      <div key={k} className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline">{l}</label>
                        <input value={form[k]} onChange={e => f(k, e.target.value)} type={t} placeholder={ph}
                          className="border-0 border-b-2 border-outline-variant bg-transparent rounded-none px-0 py-2 text-on-surface placeholder:text-outline-variant/50 focus:ring-0 focus:border-primary transition-colors outline-none"
                        />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-6 md:gap-8">
                      {[['Expiry Date', 'expiry', 'text', 'MM/YY'], ['CVV', 'cvv', 'password', '***']].map(([l, k, t, ph]) => (
                        <div key={k} className="flex flex-col gap-1">
                          <label className="text-xs font-bold uppercase tracking-widest text-outline">{l}</label>
                          <input value={form[k]} onChange={e => f(k, e.target.value)} type={t} placeholder={ph}
                            className="border-0 border-b-2 border-outline-variant bg-transparent rounded-none px-0 py-2 text-on-surface placeholder:text-outline-variant/50 focus:ring-0 focus:border-primary transition-colors outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6 md:space-y-8">
              <div className="bg-surface-container-low rounded-xl p-6 md:p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-28 h-28 md:w-32 md:h-32 opacity-5 pointer-events-none">
                  <svg className="text-tertiary" fill="currentColor" viewBox="0 0 100 100">
                    <rect height="20" width="20" x="10" y="10" /><rect height="20" width="20" x="40" y="10" /><rect height="20" width="20" x="70" y="10" /><rect height="20" width="20" x="10" y="40" /><rect height="20" width="20" x="10" y="70" />
                  </svg>
                </div>
                <h3 className="font-headline text-lg md:text-xl font-bold text-primary mb-6 md:mb-8 flex items-center gap-2">
                  <span className="material-symbols-outlined">shopping_basket</span>Order Summary
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {orderItems.map(item => (
                    <div key={item.name} className="flex gap-3 md:gap-4">
                      <div className="w-16 h-20 md:w-20 md:h-24 rounded-lg bg-surface-container-highest flex-shrink-0 overflow-hidden">
                        <img className="w-full h-full object-cover" src={item.img} alt={item.name} />
                      </div>
                      <div className="flex flex-col justify-between py-1 flex-1">
                        <div>
                          <h4 className="font-headline text-xs md:text-sm font-bold text-on-surface">{item.name}</h4>
                          <p className="text-xs text-outline mt-1">{item.sub}</p>
                        </div>
                        <div className="flex justify-between items-end w-full">
                          <span className="text-xs font-bold text-primary bg-primary-fixed-dim/20 px-2 py-1 rounded">Qty: {item.qty}</span>
                          <span className="font-headline font-bold text-on-surface text-sm md:text-base">₹{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-outline-variant/30 space-y-3">
                  {[['Subtotal', '₹1,290'], ['Shipping (Standard)', '₹65'], ['Farmer Direct Discount', '− ₹100']].map(([l, v]) => (
                    <div key={l} className="flex justify-between text-sm">
                      <span className={`${l.includes('Discount') ? 'text-tertiary font-semibold italic' : 'text-outline'}`}>{l}</span>
                      <span className={`font-medium ${l.includes('Discount') ? 'text-tertiary font-bold' : 'text-on-surface'}`}>{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 md:pt-6">
                    <span className="font-headline font-bold text-base md:text-lg text-primary uppercase tracking-tight">Total Amount</span>
                    <span className="font-headline font-extrabold text-xl md:text-2xl text-primary">₹1,255</span>
                  </div>
                </div>
                <button className="w-full mt-8 md:mt-10 bg-primary text-on-primary font-headline font-bold py-4 md:py-5 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-primary/20 text-sm md:text-base">
                  CONFIRM &amp; PAY NOW <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-[10px] text-outline uppercase font-bold tracking-widest">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                  100% Encrypted &amp; Secure Transactions
                </div>
              </div>
              {/* Heritage note */}
              <div className="p-5 md:p-6 border-l-4 border-secondary-container bg-surface-container-low rounded-r-xl">
                <p className="text-xs text-on-surface leading-relaxed italic">"Your purchase directly supports 14 indigenous farming families in the Senapati district of Manipur."</p>
                <p className="text-[10px] font-headline font-bold text-secondary mt-2 tracking-widest uppercase">— The Hatvoni Collective</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
