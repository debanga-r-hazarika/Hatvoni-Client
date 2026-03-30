import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

function WishlistBtn({ productId, wishlistIds, toggleWishlist }) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); toggleWishlist(productId); }}
      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm"
    >
      <span
        className={`material-symbols-outlined text-xl ${wishlistIds.has(productId) ? 'text-red-500' : 'text-on-surface-variant'}`}
        style={wishlistIds.has(productId) ? { fontVariationSettings: "'FILL' 1" } : {}}
      >
        favorite
      </span>
    </button>
  );
}

function HeroCard({ product, wishlistIds, toggleWishlist }) {
  return (
    <Link to={`/products/${product.id}`} className="md:col-span-8 group block">
      <div className="relative bg-surface-container-low rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all duration-500 min-h-[480px]">
        <div className="w-full md:w-[52%] relative overflow-hidden min-h-[300px] md:min-h-0 shrink-0">
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 md:block hidden" />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-semibold text-xs rounded-full tracking-wide uppercase">
              Most Traditional
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <WishlistBtn productId={product.id} wishlistIds={wishlistIds} toggleWishlist={toggleWishlist} />
          </div>
        </div>
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="font-brand text-4xl md:text-[2.6rem] text-primary leading-tight mb-4 mt-1">{product.name}</h2>
            <p className="text-on-surface-variant leading-relaxed mb-8 text-[0.95rem]">{product.description}</p>
            <div className="flex flex-wrap gap-5 mb-10">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
                <span className="material-symbols-outlined text-base">eco</span>100% Organic
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
                <span className="material-symbols-outlined text-base">science</span>High pH Balance
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-brand text-primary">₹{product.price}</span>
            </div>
            <div className="w-full py-4 bg-primary-container text-on-primary-container rounded-xl font-bold flex items-center justify-center gap-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
              View Product
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TallCard({ product, wishlistIds, toggleWishlist }) {
  return (
    <Link to={`/products/${product.id}`} className="md:col-span-4 group block">
      <div className="bg-surface-container-low rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 h-full min-h-[480px]">
        <div className="relative overflow-hidden" style={{ height: '58%', minHeight: '200px' }}>
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4">
            <WishlistBtn productId={product.id} wishlistIds={wishlistIds} toggleWishlist={toggleWishlist} />
          </div>
        </div>
        <div className="p-7 flex flex-col flex-1 justify-between">
          <div>
            <h2 className="font-brand text-2xl text-primary mb-3">{product.name}</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">{product.description}</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-brand text-2xl text-primary">₹{product.price}</span>
            </div>
            <div className="w-full py-3 border-2 border-primary-container text-primary-container rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-300">
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              View Product
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SquareCard({ product, wishlistIds, toggleWishlist }) {
  return (
    <Link to={`/products/${product.id}`} className="md:col-span-4 group block">
      <div className="bg-surface-container-low rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 h-full min-h-[380px]">
        <div className="relative overflow-hidden h-52 shrink-0">
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4">
            <WishlistBtn productId={product.id} wishlistIds={wishlistIds} toggleWishlist={toggleWishlist} />
          </div>
        </div>
        <div className="p-7 flex flex-col flex-1 justify-between">
          <div>
            <h2 className="font-brand text-2xl text-primary mb-3">{product.name}</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">{product.description}</p>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-brand text-xl text-primary">₹{product.price}</span>
            </div>
            <div className="w-full py-3 border-2 border-primary-container text-primary-container rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-300">
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              View Product
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function EditorialCard({ product, wishlistIds, toggleWishlist, flip = false }) {
  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className={`relative bg-surface-container-low rounded-2xl overflow-hidden flex flex-col ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} hover:shadow-2xl transition-all duration-500 min-h-[340px]`}>
        <div className="w-full md:w-[48%] relative overflow-hidden min-h-[220px] shrink-0">
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4">
            <WishlistBtn productId={product.id} wishlistIds={wishlistIds} toggleWishlist={toggleWishlist} />
          </div>
        </div>
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="font-brand text-3xl md:text-4xl text-primary leading-tight mb-4">{product.name}</h2>
            <p className="text-on-surface-variant leading-relaxed text-sm">{product.description}</p>
          </div>
          <div className="mt-8">
            <span className="font-brand text-2xl text-primary block mb-4">₹{product.price}</span>
            <div className="w-full py-4 bg-primary-container text-on-primary-container rounded-xl font-bold flex items-center justify-center gap-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
              View Product
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TrioRow({ products, wishlistIds, toggleWishlist }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`} className="group block">
          <div className="bg-surface-container-low rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 h-full min-h-[360px]">
            <div className="relative overflow-hidden h-52 shrink-0">
              <img
                src={product.image_url}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4">
                <WishlistBtn productId={product.id} wishlistIds={wishlistIds} toggleWishlist={toggleWishlist} />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="font-brand text-xl text-primary mb-2">{product.name}</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">{product.description}</p>
              </div>
              <div className="mt-5">
                <span className="font-brand text-xl text-primary block mb-3">₹{product.price}</span>
                <div className="w-full py-3 border-2 border-primary-container text-primary-container rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-300 text-sm">
                  <span className="material-symbols-outlined text-base">shopping_bag</span>
                  View Product
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function DualRow({ products, wishlistIds, toggleWishlist }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`} className="group block">
          <div className="bg-surface-container-low rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 h-full min-h-[400px]">
            <div className="relative overflow-hidden h-60 shrink-0">
              <img
                src={product.image_url}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4">
                <WishlistBtn productId={product.id} wishlistIds={wishlistIds} toggleWishlist={toggleWishlist} />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="font-brand text-2xl text-primary mb-3">{product.name}</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">{product.description}</p>
              </div>
              <div className="mt-6">
                <span className="font-brand text-2xl text-primary block mb-4">₹{product.price}</span>
                <div className="w-full py-3 bg-primary-container text-on-primary-container rounded-xl font-bold flex items-center justify-center gap-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  View Product
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function buildExtraRows(products) {
  const rows = [];
  let i = 0;
  const cycle = ['editorial', 'trio', 'editorial', 'dual'];
  let cycleIdx = 0;

  while (i < products.length) {
    const remaining = products.length - i;
    const type = cycle[cycleIdx % cycle.length];

    if (type === 'editorial' && remaining >= 1) {
      rows.push({ type: 'editorial', products: [products[i]], flip: cycleIdx % 2 !== 0 });
      i += 1;
    } else if (type === 'trio' && remaining >= 3) {
      rows.push({ type: 'trio', products: products.slice(i, i + 3) });
      i += 3;
    } else if (type === 'dual' && remaining >= 2) {
      rows.push({ type: 'dual', products: products.slice(i, i + 2) });
      i += 2;
    } else {
      if (remaining >= 3) {
        rows.push({ type: 'trio', products: products.slice(i, i + 3) });
        i += 3;
      } else if (remaining >= 2) {
        rows.push({ type: 'dual', products: products.slice(i, i + 2) });
        i += 2;
      } else {
        rows.push({ type: 'editorial', products: [products[i]], flip: false });
        i += 1;
      }
    }
    cycleIdx += 1;
  }
  return rows;
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
    if (user) fetchWishlist();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', user.id);
      if (error) throw error;
      setWishlistIds(new Set(data?.map(w => w.product_id) || []));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!user) { alert('Please login to add items to wishlist'); return; }
    const isInWishlist = wishlistIds.has(productId);
    try {
      if (isInWishlist) {
        const { error } = await supabase.from('wishlists').delete().eq('user_id', user.id).eq('product_id', productId);
        if (error) throw error;
        setWishlistIds(prev => { const n = new Set(prev); n.delete(productId); return n; });
      } else {
        const { error } = await supabase.from('wishlists').insert({ user_id: user.id, product_id: productId });
        if (error) throw error;
        setWishlistIds(prev => new Set([...prev, productId]));
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  if (loading) {
    return (
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto min-h-screen">
        <div className="flex items-center justify-center py-32">
          <span className="material-symbols-outlined animate-spin text-secondary text-4xl">progress_activity</span>
        </div>
      </main>
    );
  }

  const p0 = products[0];
  const p1 = products[1];
  const p2 = products[2];
  const extraProducts = products.slice(3);
  const extraRows = buildExtraRows(extraProducts);

  const sharedProps = { wishlistIds, toggleWishlist };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <header className="mb-16 space-y-5">
        <p className="text-secondary font-semibold text-sm uppercase tracking-widest">Our Collection</p>
        <h1 className="font-brand text-5xl md:text-7xl text-primary leading-tight tracking-tighter">
          The Essence of <br /><span className="text-secondary">North East India</span>
        </h1>
        <p className="max-w-2xl text-lg text-on-surface-variant leading-relaxed">
          Discover the ancestral wisdom of alkaline liquid preparations, harvested from the rich agricultural heritage of the Seven Sisters. Our Khars are pure, traditional, and crafted for modern wellness.
        </p>
      </header>

      {products.length === 0 ? (
        <div className="text-center py-32">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">inventory_2</span>
          <p className="mt-4 text-on-surface-variant font-headline text-lg">No products available yet</p>
        </div>
      ) : (
        <div className="space-y-6">

          {(p0 || p1) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {p0 && <HeroCard product={p0} {...sharedProps} />}
              {p1 && <TallCard product={p1} {...sharedProps} />}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {p2 && <SquareCard product={p2} {...sharedProps} />}
            <div className={`${p2 ? 'md:col-span-8' : 'md:col-span-12'}`}>
              <div className="bg-primary-container text-on-primary-container rounded-2xl p-10 md:p-12 flex flex-col justify-between relative overflow-hidden h-full min-h-[380px]">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/20 text-white/90 font-semibold text-xs rounded-full tracking-widest uppercase mb-6">Heritage & Science</span>
                  <h3 className="font-brand text-3xl md:text-4xl mb-5 leading-tight">The Science of Khar</h3>
                  <p className="text-on-primary-container/80 leading-relaxed max-w-lg text-[0.95rem]">
                    Traditional Khar is more than an ingredient — it's a medicinal heritage. Naturally high in pH, it aids protein digestion and maintains metabolic equilibrium. Crafted through generations of knowledge from the Seven Sisters.
                  </p>
                </div>
                <div className="relative z-10 mt-8">
                  <Link
                    to="/traditions"
                    className="inline-flex items-center gap-2 font-bold text-white border-b-2 border-white/40 pb-1 hover:border-white transition-all"
                  >
                    Learn about our process
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </Link>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                  <div className="w-64 h-64 rounded-full border-[40px] border-white" />
                </div>
                <div className="absolute -right-20 top-10 opacity-5 pointer-events-none">
                  <div className="w-80 h-80 rounded-full border-[60px] border-white" />
                </div>
              </div>
            </div>
          </div>

          {extraRows.length > 0 && (
            <div className="space-y-6 pt-2">
              {extraRows.map((row, idx) => {
                if (row.type === 'editorial') {
                  return (
                    <EditorialCard
                      key={idx}
                      product={row.products[0]}
                      flip={row.flip}
                      {...sharedProps}
                    />
                  );
                }
                if (row.type === 'trio') {
                  return <TrioRow key={idx} products={row.products} {...sharedProps} />;
                }
                return <DualRow key={idx} products={row.products} {...sharedProps} />;
              })}
            </div>
          )}

        </div>
      )}
    </main>
  );
}
