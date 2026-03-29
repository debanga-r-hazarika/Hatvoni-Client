import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialItems = [
  { id: 1, name: 'Kola Khar', subtitle: 'Traditional Banana Peel Extract • 250ml', price: 450, qty: 1, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcMppnZ3H6qBqFqnZ4IbniA7hd7PtnPSCR8ux30-thnVaFnTroeKNkexQSYmGrgyCIrBpoq6xwjt9vU5BSNqTxQbsBnBwjthpupNu_9_5Zq3CtwxrzbUl4vFYCjWMIDHEYg63HHQQyZn1y_mJXOi_ytpsLRByM-wTSxHsk3UT2zLn3FPNKnjJ9kDZYujMp-Ousof4NhvR-vZOtppYyPPTeJf_R12vLb3j8e0Zbn5OZdGIhsi0VHgRU1v2pHFY5b_OKzOL70K6R2exn', desc: 'An alkaline liquid extract prepared from the ashes of sun-dried "Bhim Kol" banana peels. A cornerstone of Assamese digestive heritage.' },
  { id: 2, name: 'Matimah Khar', subtitle: 'Black Gram with Alkaline Base • 500g', price: 320, qty: 2, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdmJuh4xyHjL87j2wbrN3DYjR8LRN_zf4N5ZNcQ7JCRd-77p8NhiJIQLq7NMOluPRr5Z3k_j8MVapgMicVvK6aijCy19uTlrmIpqxoXMg29gIafA59UL32ts0i7l_r0-wShnLcDysQUpsUoCCGicJarkogd0goOoR-5O8ErKvbULMS1JluEnxJwAGGpwqB41Xaz127z0bBlMtiIzjJtOyAMg9742Fqdd9ludUDIuc5d3QKaG2ZnOlh3Vbz3sydbqepiQPwfIvr9E8t', desc: 'Premium black gram sourced from organic farms in Nagaon, intended for the classic Assamese soul food preparation.' },
];

export default function Cart() {
  const [items, setItems] = useState(initialItems);
  const [promo, setPromo] = useState('');

  const updateQty = (id, delta) => setItems(items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const removeItem = (id) => setItems(items.filter(i => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 120;
  const discount = 50;
  const total = subtotal + shipping - discount;

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-8">
      <header className="mb-10 md:mb-16 space-y-2">
        <h1 className="font-brand text-4xl md:text-5xl text-primary tracking-tighter leading-none">Your Basket</h1>
        <p className="text-on-surface-variant font-medium tracking-wide text-xs md:text-sm uppercase">Shipping from the Heart of Assam</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Cart Items */}
        <section className="lg:col-span-8 space-y-8 md:space-y-12">
          {items.length === 0 && (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4 block">shopping_basket</span>
              <p className="font-headline text-xl text-on-surface-variant mb-6">Your basket is empty</p>
              <Link to="/products"><button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold">Browse Products</button></Link>
            </div>
          )}
          {items.map((item, idx) => (
            <div key={item.id}>
              <div className="group flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-start transition-all">
                <Link to="/product/kola-khar" className="w-full sm:w-40 md:w-48 aspect-square overflow-hidden rounded-xl bg-surface-container-low flex-shrink-0">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.img} alt={item.name} />
                </Link>
                <div className="flex-1 space-y-3 md:space-y-4 w-full">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-headline text-xl md:text-2xl font-bold text-primary">{item.name}</h3>
                      <p className="text-on-surface-variant text-xs md:text-sm mt-1">{item.subtitle}</p>
                    </div>
                    <span className="font-headline font-bold text-lg md:text-xl whitespace-nowrap">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed max-w-lg italic text-xs md:text-sm hidden md:block">{item.desc}</p>
                  <div className="flex items-center justify-between pt-2 md:pt-4">
                    <div className="flex items-center bg-surface-container-high rounded-full px-4 py-1.5 md:py-2 space-x-4 md:space-x-6">
                      <button onClick={() => updateQty(item.id, -1)} className="text-primary hover:text-secondary transition-colors"><span className="material-symbols-outlined text-sm">remove</span></button>
                      <span className="font-headline font-bold text-sm md:text-base w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="text-primary hover:text-secondary transition-colors"><span className="material-symbols-outlined text-sm">add</span></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-error font-medium text-xs md:text-sm flex items-center space-x-1 hover:opacity-70 transition-opacity">
                      <span className="material-symbols-outlined text-base md:text-lg">delete</span>
                      <span>REMOVE</span>
                    </button>
                  </div>
                </div>
              </div>
              {idx < items.length - 1 && <div className="h-px bg-outline-variant/30 mt-8 md:mt-12" />}
            </div>
          ))}
        </section>

        {/* Order Summary */}
        <aside className="lg:col-span-4 lg:sticky top-28 space-y-4">
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl space-y-6 shadow-[0_10px_40px_-10px_rgba(27,28,23,0.15)]">
            <h2 className="font-headline text-lg md:text-xl font-bold text-primary border-b border-outline-variant/30 pb-4">Order Summary</h2>
            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between text-on-surface-variant text-sm">
                <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="font-medium text-on-surface">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant text-sm">
                <span>Standard Shipping</span>
                <span className="font-medium text-on-surface">₹{shipping}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant text-sm">
                <span>Heritage Discount</span>
                <span className="font-medium text-tertiary">−₹{discount}</span>
              </div>
            </div>
            <div className="pt-4 md:pt-6 border-t border-outline-variant/30 flex justify-between items-end">
              <div>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Total Amount</span>
                <div className="text-2xl md:text-3xl font-headline font-bold text-primary mt-1">₹{total.toLocaleString()}</div>
              </div>
              <span className="text-xs text-secondary-fixed-dim font-bold">GST INCLUDED</span>
            </div>
            <div className="space-y-3">
              <Link to="/checkout">
                <button className="w-full bg-primary-container text-on-primary-container py-4 md:py-5 rounded-xl font-headline font-bold text-base md:text-lg hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center space-x-3">
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
              <Link to="/products">
                <button className="w-full border-2 border-primary/10 text-primary py-3 md:py-4 rounded-xl font-medium hover:bg-white transition-all text-sm md:text-base">Continue Shopping</button>
              </Link>
            </div>
            <div className="bg-white/50 p-3 md:p-4 rounded-lg flex items-start space-x-3">
              <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              <p className="text-xs text-on-surface-variant leading-relaxed">Your purchase supports sustainable agriculture in North East India. All packaging is 100% biodegradable.</p>
            </div>
          </div>
          {/* Promo Code */}
          <div className="px-2">
            <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">Promo Code</label>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-primary font-medium px-0 py-2 placeholder:opacity-30 outline-none"
                placeholder="HERITAGE20"
                type="text"
                value={promo}
                onChange={e => setPromo(e.target.value)}
              />
              <button className="text-primary font-bold text-sm hover:text-secondary transition-colors">APPLY</button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
