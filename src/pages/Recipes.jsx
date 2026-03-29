const recipes = [
  {
    id: 1, tag: 'Matimah Khar', time: '45 mins', title: 'Black Lentils with Indigenous Ash',
    desc: 'A rich, smoky dal prepared with Matimah Khar, traditionally served with a drizzle of raw mustard oil.',
    tags: ['Vegan', 'Digestive Aid'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuakGL4x9J_EQSzOiQaQ9VsoZEcUXnrUXgujFXOvvSuVjfuAuUSeWH7dszDKxPVAds1yUEy0Qx5Sl_jFUCxHuzSUjFTCSHIIKQLyqO8nWN-1P2mvUL-EJPQq8lbgeeW0UiyGYUuJ2NyqV_rnVwYuhBoDUXVtTiQ4DC8vEVA0RDWq1xDgn-mu5XczpWxiTmYJ1Qgu1zc1DiWhR7se-Ajdh6TV8lh_SIJEpt2BCRBAUp7Gwg85nxLvNKW6NQlPkmxgnW0ezmYrq3DsB9',
  },
  {
    id: 2, tag: 'Khardwi Khar', time: '30 mins', title: 'Bitter Gourd & Silkwood Melange',
    desc: 'An exquisite balance of bitterness and earthiness, enhanced by the clarifying properties of Khardwi Khar.',
    tags: ['Seasonal', 'Organic'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcwJ25xEu-FwMwMnk6yOHlp15b2AmdUFdS2NTL_rWYAFrCHHoLD5MzykMY7DyaaE6XUmYCVnIxWPFT08oE0-UrPmIY4BWKgoboN5qa1C7vhlji7sEWLg1gQY5WkYbbFBKWmhz8YHaATnk0AkOkQrzZ24t3vlAbKOMKtGRd5eVsf0kD-auzu9dGc_QPhmOS3mqLqJr4OemvKUrP90K0EbWm8NMZRtTbsE-bbpJ-zqHNU4fmTmXIoTmZsOsGPyWwFTUDqIYwUuYC12mJ',
  },
  {
    id: 3, tag: 'Heritage Special', time: '60 mins', title: 'Smoked Fish with Bamboo Shoot',
    desc: 'A complex aromatic journey utilizing fermented bamboo shoots and our premium Kola Khar extract.',
    tags: ['Traditional', 'Protein-Rich'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA85bFfzbh9fdhqz5tiOAj4N5GrJ1X5Cndp-o_gH50SgNyM3St-wAVMLI6wjVPPFW_Q8f1WZxOsQ-N87ZlPqihYROM2JLYzzRIUX42dnhFihF4_yGntzssTg4PqpHD707T7m9uY1M4eyGvl10X2pPJZ4gXevOT1y3XQ1WVDZO-M13Uuh1NsG6WPlxmwKCEM5QzD5C9IT-wbkXOCQ6YEKUpXpTTEMyw_MqBzhE4mwgbo091nKQdN4VBPiIMMN6ArgDRVBAp44xqpAKtb',
  },
];

export default function Recipes() {
  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Hero */}
      <header className="mb-24 text-center">
        <h1 className="font-brand text-4xl md:text-7xl text-primary leading-tight mb-6 tracking-tighter">
          Culinary Tapestry: <br />Heirlooms from our Kitchen to Yours
        </h1>
        <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto font-light">
          Traditional North Eastern recipes passed down through generations, celebrating the soulful alchemy of indigenous ingredients.
        </p>
      </header>

      {/* Featured Recipe */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
        <div className="lg:col-span-8 bg-surface-container-low rounded-xl overflow-hidden relative group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5p3KungDnWrCsDfKUvdPLo_6F4gmPRaGjVe9wjr-npiYRTwZFt9S3UZ2JQJcyJciHMtaiLezh1tKLs6jF918KQeITNB6alGuyqSrd679Xr0jOLg39-qd5BUnur5knMLMAJyjnSl8Oqip7S3ooQX2jxcSnrhZKjOUFZOhpV0shNmkV-G_nGoipzOcm1_8EnSAeWRzrG4axEJny0B1uOnMmGDug46naFExFOb0sSDET632TwZFfcC6bRO26UkMM2EQSktkXbz0MP3mj"
            alt="Assamese Thali"
            className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-12">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 w-fit">Featured Heirloom</span>
            <h2 className="font-brand text-4xl text-surface mb-4">Omita Khar with Kola Khar</h2>
            <p className="text-surface/90 text-lg max-w-xl mb-6">A foundational Assamese delicacy featuring raw papaya prepared with our signature alkaline Kola Khar, symbolizing the start of a traditional meal.</p>
            <button className="bg-surface-container-lowest text-primary px-8 py-4 rounded-xl font-bold flex items-center gap-3 w-fit hover:bg-secondary-container hover:text-on-secondary-container transition-all">
              View Full Recipe <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-surface-container-highest p-8 rounded-xl flex-1 flex flex-col justify-center">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">temp_preferences_eco</span>
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">The Alchemy of Khar</h3>
            <p className="text-on-surface-variant">Khar is an indigenous liquid strained from the ashes of sun-dried banana peels. It's the soul of North Eastern digestive health.</p>
          </div>
          <div className="bg-primary text-on-primary p-8 rounded-xl flex-1 flex flex-col justify-center">
            <span className="material-symbols-outlined text-secondary-container text-4xl mb-4">inventory_2</span>
            <h3 className="font-headline text-2xl font-bold mb-2">Pantry Essentials</h3>
            <ul className="space-y-2 text-on-primary/80">
              {['Kola Khar', 'Matimah Khar', 'Khardwi Khar'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="mb-24">
        <div className="flex justify-between items-end mb-12">
          <h3 className="font-brand text-3xl text-primary tracking-tight">Seasonal Collections</h3>
          <div className="flex gap-4">
            <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="flex flex-col gap-6 group">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-low">
                <img
                  src={recipe.img}
                  alt={recipe.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-secondary font-bold text-sm tracking-widest uppercase">{recipe.tag}</span>
                  <div className="flex items-center gap-1 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-xs">schedule</span> {recipe.time}
                  </div>
                </div>
                <h4 className="font-headline text-2xl font-bold text-primary mb-3">{recipe.title}</h4>
                <p className="text-on-surface-variant line-clamp-2 mb-4">{recipe.desc}</p>
                <div className="flex gap-2 mb-6">
                  {recipe.tags.map((t) => (
                    <span key={t} className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-xs rounded-full">{t}</span>
                  ))}
                </div>
                <a href="#" className="font-bold text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all inline-flex items-center gap-2">
                  Read Methodology <span className="material-symbols-outlined text-sm">north_east</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-secondary-container rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-secondary-fixed-dim/20 rounded-full blur-3xl" />
        <div className="md:w-1/2 z-10">
          <h2 className="font-brand text-4xl text-on-secondary-container mb-6">Join our Kitchen Circle</h2>
          <p className="text-on-secondary-container/80 text-lg mb-8 leading-relaxed">Subscribe to receive monthly heirloom recipes, stories from North Eastern farmers, and exclusive access to limited-batch harvests.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="email" placeholder="Your email address" className="flex-1 bg-surface/50 border-none rounded-xl focus:ring-2 focus:ring-primary placeholder:text-on-secondary-container/50 py-4 px-6 outline-none" />
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-container transition-colors whitespace-nowrap">Subscribe Now</button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="aspect-square bg-surface/40 backdrop-blur-md rounded-2xl p-4 rotate-3 border border-surface/20 shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyEiLbUBKh-Zhptjokl5_picNvEyZ2vg-SNYQuyiHX4C57lPXP3YpZWAj3Z5Ziz_ij3TmZy_s-GahcBEnFdvfb9bNDqv39N7rZMlA3UcuEuH6-omVwQZXPlUGzxGAkxC-LkS4yq0fipNYObJ_818M6k2lar619WlRh9TRWSgiHGhBXk14l_mjeJ554SRsqR-CQkHfUFetHTxZvd2bVuNglJiKW7IkmlV37M0KHr88Ye7Z4x0iiv4u0hxMktnMB_J9MflKW-c_JPLUw"
              alt="Family cookbook"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
