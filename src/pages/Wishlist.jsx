export default function Wishlist() {
  const products = [
    {
      name: 'Kola Khar', price: '₹349', size: '500ml Bottle', tag: 'Heritage Recipe', tagColor: 'bg-secondary-container text-on-secondary-container',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxg7kigsVZWT6YiZHao8vWJJdDQftk_WIyni4TQD_C4UzqqoxgHkR2cqB_-0hJDLJK4epXSxSzI2-tuhcewBYg6Nv8Siy7YW7Gl_S3UIx827Eu3UGqKOTTer_Wk-v4DKhVu1TImMOQ-x18AGu9zkjXv2YR0SRC0WF8aAjzdFiAcRA1oqURTba21f3F0lRrk_qtpSD0sNWNO1NI4-2BADikdp6pI4iJIVlvCPmzBSAQLUpO1ULNTt_h58ZIP2id77Zhga6x_vNrjyzi',
    },
    {
      name: 'Khardwi Khar', price: '₹280', size: '250g Container', tag: null,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZRm-W28L-T_IHFh-nM30wEpNhLnDQ3xokd9KWIAIxgSMBmE8LI_1nzOJmPRSV5qTNuxpB5ZdMO9t5VEfFL3SLPjwKZ-Eo66xxdDc83jtUV_18d9Rqd8LRGD9xfSTBjWv_pYzK1NhTLMB1R0RdeZTy3GXH-T4YLSbqdZkNzPWLbJvXGopzTUX42VxbS5SKVKbrb6w7vGtd2TLgc414XmQtoT6HAKa6r3q2HxKqRwPdcXiluU9mTwmYEf1B03zQAeJE6iasNQocDGF',
    },
    {
      name: 'Dry Bamboo Shoots', price: '₹420', size: '100g Pouch', tag: 'Limited Edition', tagColor: 'bg-tertiary text-white', tagPosition: 'top',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt_Rw5NW37y82YRUEdK3ieqUX3efq-FU4GwFMzJ9RdWNGX9UyyZHicOSvPzglaIL8bXocr6486V2t1vlpg8Rs1AgCP8G7_0Bl0YD_1AeUy6-FrnhJm0XbZ-l2oekVbUqae3JtyYoPzX8NCXvh9AQOSTuPwofEpBrpIUHgchcwH5j7_VdrCXe3sZsT87gLPLae3x0vDI4ylFBRNwxqwIDcdL6TYHgcI9osliA1j25Ieq6LWux7Rzy2SEIT6-Q1C9rRJ_cWa2QwSHwPh',
    },
  ];

  const recentlyViewed = [
    { name: 'Bhoot Jolokia', price: '₹150', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo9WKJMVsjsjHiPrQzGHorcCPlb8ZOlK9670b6axbI0iSH887LuON-2q0U_3jH3RCOu6Q33NDU3D0boTkrXrjf3cJsZ_e04wa_CpszjVNF1WocA6OTrjQZGhz2HcnUSpUOvfW-EOIV8D1P0l9wjtH2dSTZoDwO4wb6EiZqt-_I2PYRkilbYF_pDvC6aw2gnj43lMtYRaLHQMr9dJauDdtWKaSAQN33cux4p8ry18hJfVRVkDAIjkwbchN5r0OPeHvRTxsXbbHEAKL_' },
    { name: 'CTC Leaf Tea', price: '₹520', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCanmpnA5lOY_919h9dfxPJIJWxRBhtdpJ4HPbPRUvghkte0Az5zG4dWNLlkZ0t-A-0RzsJXyGkzQrYt_s-dvQTdMf2Zd0fZlPaNPHoiNX9WFbLziSoYBL70CaqfxoF-nxFlX-l93qiyobxCPjLkgazoog58Bysl5TdHzgdwAvaNv94meqit5WBrDRSnRLEUORpLxFlnnPc-ay2_RQ_vRofSoQsSxdaSro_54W5YsKWzcmIUHhefuUmm4x-Uc4_ypWgY7-6hTOOA7Tp' },
    { name: 'Forest Honey', price: '₹780', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4toqA_XQHoC_WkwEwDkKCD6bBt1BER424sh3c4tE7gWZL3gJFwao3Kw4hb7yHhxTzyhBkN4rJz35_S9hrd7lsXTVZ_mRRQOoCLzwLIqPJafmb6l8enFEhKU97TkZ_z9SiaxXF9Zz3_MXJ-WW5ugkyocmrCtHnswguDzaI5rJxrGtQJ3pQGbYhJtdIWSTAhRS1c-7Pmt6T2JkilCz6PNDfkgy3QCVWJ8MJ89DPdYhLPWuOeG5_vMtqcR3t8kcIczzErAFmA75ehpn4' },
    { name: 'Lakadong Turmeric', price: '₹450', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChc3DfuCBcJpsNZGcZhfooZepEHWQ651i4sF915og5YgV2JW95UT_9spn-9Y3NIj79KqmzoZX1BsS0-rW9ucNO-67p2PKcWouaVY_ZbhUgb1DQMKzMDupf8qkwNm1DpXrfTzvrFnHYmd-Q7jISHhhDqmb1nHJYlW1nawL5L7hZK8D7qctQe8nFVTxcC-00XCYm01KFWlyTow36ZVszkM3Ptzv_rm1rdVPU1zbGZ_7fqeQNQDv_9ODw11LIRdAKFLl9lHv9PYFa6grk' },
    { name: 'Johasail Rice', price: '₹185', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuJ1W_ph7z30o38EerDuOBA1Pm3KzFcoVpUWV5qqN-cEIvQWzXls7LtZMV-suGF3jadf3kyugB_rba2DUbaMyGobmXLMFtATWTdTPcNRa-Aclld5H8c6g27YCmFiyC_nCiFHABaETbKLELfNyt_2JvjXxXEl2PBqpQR6XwLC_qpa1g4F1SeNanQK3z3P0JgqOWxJimBeVmOerSYyZHmX8ohL1UwAT2Uh80cRFd6P6Z4qmS6PUINXOWzmzdGqXiGZd1KHvSt5Z3zDmG' },
  ];

  return (
    <main className="pt-24 pb-24 md:pt-28 md:pb-16">
      {/* Hero */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-8 mb-10 md:mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <span className="text-secondary font-label font-bold tracking-widest uppercase text-xs mb-3 block">
              Your Collection
            </span>
            <h1 className="font-brand text-4xl md:text-6xl text-primary leading-none tracking-tight">
              Wishlist
            </h1>
            <p className="mt-4 text-on-surface-variant text-sm md:text-lg leading-relaxed max-w-[80%] md:max-w-xl">
              Traditional heirlooms of North East India, curated for your kitchen.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 md:px-6 py-3 border-b-2 border-outline-variant hover:border-primary transition-all font-medium text-sm">
              <span className="material-symbols-outlined text-sm">share</span> Share
            </button>
            <button className="flex-1 md:flex-none bg-primary-container text-on-primary-container px-6 md:px-8 py-3 rounded-xl font-semibold text-sm hover:bg-primary transition-colors">
              Add All to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid — single col on mobile, 3-col on desktop */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {products.map((product) => (
            <article key={product.name} className="group relative bg-surface-container-low rounded-xl p-4 transition-all duration-300 hover:-translate-y-2">
              <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-6">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  src={product.img}
                />
                {product.tag && (
                  <div className={`absolute ${product.tagPosition === 'top' ? 'top-4 left-4' : 'bottom-4 left-4'}`}>
                    <span className={`${product.tagColor} px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest`}>
                      {product.tag}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="font-headline font-extrabold text-lg md:text-xl text-primary">{product.name}</h3>
                  <p className="text-on-surface-variant text-sm font-medium italic">{product.size}</p>
                </div>
                <p className="font-headline font-bold text-lg text-primary">{product.price}</p>
              </div>
              <button className="w-full bg-primary-container text-on-primary-container h-12 md:h-14 rounded-xl font-headline font-bold text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary transition-colors active:scale-95 duration-150">
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Add to Cart
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Recently Viewed — horizontal scroll on mobile, 5-col grid on desktop */}
      <section className="mt-16 md:mt-32 pt-12 md:pt-20 border-t border-outline-variant/15">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-end mb-6 md:mb-12">
            <h2 className="font-brand text-2xl text-primary">History</h2>
            <a className="text-xs font-bold uppercase tracking-widest text-secondary border-b-2 border-secondary-container pb-1" href="#">
              See All
            </a>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex overflow-x-auto gap-5 -mx-6 px-6 pb-4 hide-scrollbar">
            {recentlyViewed.map((item) => (
              <div key={item.name} className="flex-shrink-0 w-36 space-y-3">
                <div className="aspect-square bg-surface-container-highest rounded-full overflow-hidden p-1 border-2 border-outline-variant/30">
                  <img alt={item.name} className="w-full h-full object-cover rounded-full" src={item.img} />
                </div>
                <div className="text-center">
                  <p className="font-headline font-bold text-xs text-primary truncate">{item.name}</p>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: 5-col grid */}
          <div className="hidden md:grid grid-cols-5 gap-8">
            {recentlyViewed.map((item) => (
              <a key={item.name} className="group block" href="#">
                <div className="aspect-square rounded-xl overflow-hidden bg-surface-container mb-4">
                  <img alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" src={item.img} />
                </div>
                <h4 className="font-headline text-sm font-bold text-on-surface">{item.name}</h4>
                <p className="text-secondary font-bold text-xs mt-1">{item.price}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </main>
  );
}
