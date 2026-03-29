export default function Products() {
  const products = [
    {
      id: 'kola', name: 'Kola Khar', price: '₹450', badge: 'MOST TRADITIONAL',
      desc: "Derived from the ashes of sun-dried 'Bhim Kol' banana peels. Cornerstone of Assamese digestive wellness.",
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCppttAYi65wcwJ48dmuDXQoJ7Ns1XFDJpyn2pm51wBMvtZJZyA81TLcPRYDVNUvkX137aFh6bCsmL242k4po8GiovqSx4UDSQMNLbqjyLJd9JtY5WeB4S5zxU-6kSdxO8EeyNBMxPqG3T2EwNqikZ_5YnBHmo-NhjYCVYK7cdS2B7XORkqlT3czbzvqV9Ne5GxzD8R62EmrKIMmnSa_VSmw8kg2iNBvTak58uMCsQFev55cfKbZOtTCdMPcMtrDF4VsbPmePH6ek_U',
    },
    {
      id: 'matimah', name: 'Matimah Khar', price: '₹380',
      desc: 'A specialized alkaline extract crafted from indigenous black gram stalks. Cooling properties and unique earthy aroma.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYCsraiJT5J2F9GETqOEeIbiqFI43mVc_vVEvmza_jJVAOgeFVDeAKX32ieTISYVnlydvoxTbctwu4ZszgCP-iq3xXgaZkejsygNPO7QatRmqrs7gP1ayRr3KeTH66j86KPerCnnCRU5PJfoQtQxgcBzkuczz_DznmPxwr7MRBC8VVarGBHHLvzESjYCijsO5JH-2xU66oxdkbxqFxN2R23qQuNrICawKXMFIk4tNTFspyY1iNyLf3pI38ngl7C3km94B0r7YG3fqQ',
    },
    {
      id: 'khardwi', name: 'Khardwi Khar', price: '₹320',
      desc: "The 'water of Khar'. A refined, gentle preparation ideal for beginners. Crystal clear and potent.",
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFiCzYccrIynr6YX7WiUCsoKJI0iCByi8IELZQdj0-lptJadq8DGQS08QxE0wgxdkqWMYZj4rn5enCA_pwiRLkYTWC2_h0yIYa9CK3V8q8TX6xJSw47yY_KqrryyjY7XZibai3NBdhtIqYsB1G_VXksUoW91MQ8Cujn53tcrYLa0j9JJj5oXDj3zvNAeVXMRNtYh6NI9rHESTiK9YQBNEmGiKMbBK1xLDqzPNZ3iVuUQKj0stma6olNzYgS0w13cQhCABTY_rQ1_PV',
    },
  ];

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <header className="mb-20 space-y-4">
        <h1 className="font-brand text-5xl md:text-7xl text-primary leading-tight tracking-tighter">
          The Essence of <br /><span className="text-secondary">North East India</span>
        </h1>
        <p className="max-w-2xl text-lg text-on-surface-variant leading-relaxed">
          Discover the ancestral wisdom of alkaline liquid preparations, harvested from the rich agricultural heritage of the Seven Sisters.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Featured - Kola Khar */}
        <div className="md:col-span-8 group">
          <div className="relative bg-surface-container-low rounded-xl overflow-hidden min-h-[500px] flex flex-col md:flex-row hover:shadow-xl transition-all duration-500">
            <div className="w-full md:w-1/2 relative overflow-hidden min-h-[300px]">
              <img src={products[0].img} alt={products[0].name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
              <div>
                <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container font-medium text-xs rounded-full mb-6">{products[0].badge}</span>
                <h2 className="font-brand text-4xl text-primary mb-4">{products[0].name}</h2>
                <p className="text-on-surface-variant leading-relaxed mb-8">{products[0].desc}</p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="material-symbols-outlined text-lg">eco</span>100% Organic</div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="material-symbols-outlined text-lg">science</span>High pH Balance</div>
                </div>
              </div>
              <button className="w-full py-4 bg-primary-container text-on-primary-container rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">add_shopping_cart</span>Add to Cart — {products[0].price}
              </button>
            </div>
          </div>
        </div>

        {/* Matimah + Khardwi */}
        {products.slice(1).map((p) => (
          <div key={p.id} className="md:col-span-4 group">
            <div className="bg-surface-container-low rounded-xl overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-500">
              <div className="h-64 relative overflow-hidden">
                <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="font-brand text-2xl text-primary mb-3">{p.name}</h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{p.desc}</p>
                </div>
                <button className="w-full py-3 border-2 border-primary-container text-primary-container rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98]">
                  <span className="material-symbols-outlined">shopping_bag</span>Add to Cart — {p.price}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Promo */}
        <div className="md:col-span-8">
          <div className="bg-primary-container text-on-primary-container rounded-xl p-10 flex items-center relative overflow-hidden min-h-[300px]">
            <div className="relative z-10 max-w-lg">
              <h3 className="font-brand text-3xl mb-4">The Science of Khar</h3>
              <p className="text-on-primary-container/80 mb-6 leading-relaxed">Traditional Khar is more than an ingredient; it's a medicinal heritage. Naturally high in pH, it aids protein digestion and maintains metabolic equilibrium.</p>
              <a href="#" className="inline-flex items-center gap-2 font-bold hover:underline">Learn about our process <span className="material-symbols-outlined">arrow_forward</span></a>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
              <svg className="h-full w-full fill-current" viewBox="0 0 100 100"><path d="M0,0 L100,0 L100,100 Z M50,50 L0,100 L100,100 Z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
