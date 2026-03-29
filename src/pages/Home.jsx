import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-surface pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDqSk53O-wBewQ859NowGEHiG2aR3XjRVZ26pmsVXHK4dzGkUhWKDEAh9l_Gtkni3OE54VwrNr-aIszoO5w8S4Knyp8F53w9tvv1qIxdvPikIWozC_ID6sFBVZSCyhU4tqBofnQ7du29EZbrN3tYr7YBSpXuGmUjrZdSi8ajAiA-eDl41Af4483vPbdDlJKAactJn10v3RR2grkm5RKaLMacDFM4GL_HZZVtdOjYz8oesUQy8bm9KOvzA8SF3ZU2gtGUINPGThzUzs"
            alt="Misty hills of Meghalaya"
            className="w-full h-full object-cover opacity-90 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent" />
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-secondary" />
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-sm">Est. 1924</span>
            </div>
            <h1 className="font-brand text-6xl md:text-8xl text-primary leading-none mb-8">
              Heritage <br />Woven with <br /><span className="text-secondary">Modernity</span>
            </h1>
            <p className="text-on-surface-variant text-xl md:text-2xl max-w-xl mb-12 leading-relaxed font-light">
              Embark on a culinary pilgrimage through the Seven Sisters, where ancestral wisdom meets the contemporary table.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/products">
                <button className="gold-gradient text-white px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  Shop the Collection
                </button>
              </Link>
              <Link to="/about">
                <button className="px-10 py-5 rounded-xl font-bold text-lg text-primary border-2 border-primary/20 hover:border-primary transition-all">
                  Discover the Story
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Masterpieces */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-secondary-fixed-dim rounded-full" />
                <h2 className="text-secondary font-bold tracking-widest text-sm uppercase">Regional Masterpieces</h2>
              </div>
              <h3 className="font-brand text-4xl md:text-5xl text-primary">Curated Heritage</h3>
            </div>
            <p className="max-w-md text-on-surface-variant italic border-l-4 border-secondary pl-6">
              "Every weave, every leaf, and every tool tells a story of survival, celebration, and the spirit of the hills."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* Handlooms */}
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-primary shadow-lg cursor-pointer">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmqYXrSZKNQgSwogcQpBOZahWQRvjAGuw1yUpFvrPT01BQlayOmU-0TONGl-UdSusIwe4cB5gyA2o1kPRHEG62qkEg5e8ySCKgVPaZdb6wapBUc1C3LlV9nfReh9_KoZIw-66gcJdUXH2fP5X3-1H4gxQH00BW_HfPKgEcTefbZ9WZZ6eNesGWKfI5doFVQB0JwZyujTgCNG-kkz4mpUAyyz1UPZOa9Rcm_g12EtUNrOpmqAx7LVvPz2gA-sq_up71Urzk1PdWpmbU"
                alt="Traditional Loom"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-primary to-transparent">
                <h4 className="font-brand text-4xl text-white mb-2">Handlooms</h4>
                <p className="text-primary-fixed max-w-sm mb-6">Master-crafted Eri and Muga silks, echoing the rhythmic heartbeat of the Assamese villages.</p>
                <span className="text-secondary-fixed font-bold tracking-widest uppercase text-xs flex items-center gap-2">
                  Explore Collection <span className="material-symbols-outlined">arrow_right_alt</span>
                </span>
              </div>
            </div>
            {/* Crafts */}
            <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container-highest shadow-lg cursor-pointer">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1I7z1K6z3Qta9qkoFe9_uN6TxQNERtrSM1m0lxP9dFrlTzFQvlSeMlY25FbOE7nBlVec_rzogbyPzxXMgci4rAUkNOu4STGUmWEpD2Zbu3qixbRS7pwcJYKqNOvbvNhbf2QU19sPdhebSEQV7swnALjD-TlDcc7Q9K7oCFBD5BuAwFpFYbVvpNAHk9Z_GaMtqH2Q6ZL2k2cSGeVlx3cMOqpsQE2TkbR1H-k79CtEDd12ooF0tGEIPuQnnLQLpmAUeoM2TcPQl9c3y"
                alt="Bamboo Craft"
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                <h4 className="font-brand text-3xl text-white mb-2">Crafts</h4>
                <span className="text-secondary-fixed font-bold tracking-widest uppercase text-xs flex items-center gap-2">
                  View Artifacts <span className="material-symbols-outlined">arrow_right_alt</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Favorites */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <h2 className="font-brand text-4xl md:text-5xl text-primary text-center mb-4">Artisan Favorites</h2>
            <div className="w-24 h-1 bg-secondary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: 'Kola Khar', price: '₹450', badge: 'Trending', badgeClass: 'bg-secondary-container text-on-secondary-container',
                desc: "The traditional alkaline extract derived from the ashes of sundried peels of the 'Bhim Kol' banana.",
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmaAj6QoL8vtLYMkN9BQeNOUs9qGDnCMErIsp5hJ3_hd4KyIkjmgj6SMpnb6LYzemwQpno4myb8_SBmeyLoNWtNoOv7t247F8BmbHq074VyvCXLf5g-7QhsfYprLe_Ubohk38SlGN79XNSOVv-JWUEGJ-82b9gC7hg3wH1L-saxrHN0fEU_dzBBVyrlcssIbZvJ5TE4r46_QXbqCo6AwKWOlbZm32W3uu-h4-SO4rJ6K9WXPvMqTa7jMAqfYJjzRVcmvwcTtA3Dd_Y',
                btnClass: 'heritage-gradient text-white',
              },
              {
                name: 'Matimah Khar', price: '₹380', badge: 'Heritage', badgeClass: 'bg-primary text-white',
                desc: 'A soulful delicacy made with black lentils and raw papaya, uniquely infused with our signature Khar extract.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zz8K0ob0qSSi9E0nwfdl0gde-vby6sTFukszypY5dhcfO5IqtbyugTrHmFebjozS0Xxk1cLP6C_sDudBKfW3NnKuUb1xcq8fi7rshRTgUx7IA1duxbasmrXhs5K70PFzqbUqOveUgmsIijUwZgrt9DrzhqWlfxgUNkaAlmM0tJKCW1out4Ed2yMbjHdzpB__buyb1p0-d0GefVVm5ypZTU_h3OXudLFKIhogCrUZkQ4BsAToMAoRAgdz9xN1nqk2EAmBPmEoG7d0',
                btnClass: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
              },
              {
                name: 'Khardwi Khar', price: '₹520', badge: null,
                desc: "A celebration of the Bodo kitchen—authentic, earthy, and packed with health-giving minerals.",
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjxintDYGsK7SP5Uf_XI-26Q8AowdWq7vPrGR0rInnf7YsR33E6zed7jyo84_Bhy63UunlK5T0nb0U5GLUgtLQcNfXAHC-_VKY9bXavHaGtawEybcY56scZjUqwHsqIywnh4Ti1Kz-pMaNDwC1p_dbfGW2sKv7mJV6JXXaLLessGHuWTyaM5ulArLNVdJqCK3qcbJ551pevrd3WXlxvBuPuBXnd6HNkLRcLK3zicxY81o9Nrop4_FGdzUD25gYkswpRIoQjeGKfbhO',
                btnClass: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
              },
            ].map((product) => (
              <div key={product.name} className="group">
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-6 bg-surface-container">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.badge && (
                    <div className={`absolute top-4 right-4 ${product.badgeClass} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest`}>{product.badge}</div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-brand text-2xl text-primary">{product.name}</h4>
                  <span className="text-secondary font-bold text-xl">{product.price}</span>
                </div>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{product.desc}</p>
                <button className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:shadow-lg transition-all ${product.btnClass}`}>
                  <span className="material-symbols-outlined">shopping_bag</span> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Roots */}
      <section className="py-32 px-8 bg-primary relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="relative">
            <h2 className="font-brand text-5xl md:text-7xl text-primary-fixed mb-8 leading-tight">Our <br />Roots</h2>
            <div className="space-y-6 text-emerald-50/80 text-lg leading-relaxed font-light">
              <p>Born from the emerald valleys of the Seven Sisters, Hatvoni is more than a brand—it is a promise kept across generations. We work directly with village artisan collectives who have preserved these culinary rituals for centuries.</p>
              <p>By bringing these flavors to your modern kitchen, we ensure that the rhythmic clacking of the loom and the sacred ritual of the hearth continue to thrive. Every purchase supports indigenous communities and preserves the delicate biodiversity of the North East.</p>
            </div>
            <div className="mt-12 flex items-center gap-8">
              {[['450+', 'Artisans'], ['7', 'Sisters'], ['100%', 'Organic']].map(([val, label], i, arr) => (
                <div key={label} className="flex items-center gap-8">
                  <div>
                    <div className="text-secondary-fixed-dim font-brand text-4xl">{val}</div>
                    <div className="text-white/60 text-xs uppercase tracking-widest font-bold">{label}</div>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-12 bg-white/20" />}
                </div>
              ))}
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            <div className="pt-12">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCxB-tWS6f7HAr5rtQRPN_KE9rlz-dI3TEQu6tXVPfqBOeAu8LfopC6NhtJpXhMdYQlKeZ7MVuQd0Oo42dtZQANfW9jMKYK3f5-ybZSP2M1UofZEy_6CF_VQW8k6fTq4Rf3yI_B7W5Hbx2r4ZtsdiXo-9Igx2QiSEGcZJ9hfXVRhHc7vm7QABcL_PFYiB-sprvqgdc0QFNPpnbwEgwHmYNgVouw4Vkjt7YkU5kN7ZQI8s3iArp26c_-MO2PwztLPZU4vsqrTWSFVo6" alt="Artisan at work" className="rounded-xl shadow-2xl" />
            </div>
            <div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd7MLvGesqdNDGwhFye5Xz8sMfYE7EnM7iny0bjvFccqQDZinHB2ngXBG8n-1z8BTCP0-MJPcYKjX5-Mmlp70amC1PjSTeVUxhoWfXWd7bpZgbyOtlKrOSV-qkD5w_kgiWOKtCI2hLnto1akr3DSnimRl9Efd182rwNe2sQJ1LQeN4K6TIdX2E5K_gYUOnb7Nkf2xjcwxYJymtg29e3D9f-hT4qTdpEZx4X6sOXVP2ULguxumpssWRFHBkbemOj9XywDyTJOKzXOd_" alt="The region" className="rounded-xl shadow-2xl mb-4" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcRktoVdO_Hc5QNGfYq7-1r2mW0GGLIb9PaKUFeK__SA3AowQvQ6XZcDfk8BR0Yh8XXywFyX6JAl4BUXaQYgXoJvnlfc3IucYx_vNY2tp2T2SRoLcBmm3D3EkDQS_ramvT-namekNbKyCYMfyxGFN3kqfANSxU3R7lccnG7XO_TNkDlOob8U01i6JNyHGYGXuta410X7pIsnmccXbGhQeTjrObPw0w23vwGKkBuPojPUtpdkAVcerW_7P5NOB2GHTgZ3afWcr_Gvqv" alt="Traditional kitchen" className="rounded-xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-8 bg-surface-container-highest">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-brand text-4xl text-primary mb-4">Stay Woven In</h2>
          <p className="text-on-surface-variant mb-10 max-w-xl mx-auto">Join our inner circle for exclusive stories from the hills, traditional recipes, and first access to seasonal harvests.</p>
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 bg-surface border-none focus:ring-2 focus:ring-secondary rounded-xl px-6 py-4 uppercase tracking-widest text-xs font-bold outline-none placeholder:text-outline"
            />
            <button type="submit" className="heritage-gradient text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-xl transition-all">
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-[10px] text-outline uppercase tracking-[0.2em]">By subscribing, you agree to our privacy policy.</p>
        </div>
      </section>
    </>
  );
}
