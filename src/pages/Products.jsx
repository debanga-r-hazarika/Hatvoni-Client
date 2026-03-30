import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
    if (user) {
      fetchWishlist();
    }
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
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }

    const isInWishlist = wishlistIds.has(productId);

    try {
      if (isInWishlist) {
        const { error } = await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);
        if (error) throw error;
        setWishlistIds(prev => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        const { error } = await supabase
          .from('wishlists')
          .insert({ user_id: user.id, product_id: productId });
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

  const featuredProduct = products[0];
  const otherProducts = products.slice(1);

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

      {products.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">inventory_2</span>
          <p className="mt-4 text-on-surface-variant font-headline text-lg">No products available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {featuredProduct && (
            <div className="md:col-span-8 group">
              <div className="relative bg-surface-container-low rounded-xl overflow-hidden min-h-[500px] flex flex-col md:flex-row hover:shadow-xl transition-all duration-500">
                <div className="w-full md:w-1/2 relative overflow-hidden min-h-[300px]">
                  <img
                    src={featuredProduct.image_url}
                    alt={featuredProduct.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button
                    onClick={() => toggleWishlist(featuredProduct.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  >
                    <span
                      className={`material-symbols-outlined ${wishlistIds.has(featuredProduct.id) ? 'text-red-500' : 'text-on-surface-variant'}`}
                      style={wishlistIds.has(featuredProduct.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                  </button>
                </div>
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container font-medium text-xs rounded-full mb-6">MOST TRADITIONAL</span>
                    <h2 className="font-brand text-4xl text-primary mb-4">{featuredProduct.name}</h2>
                    <p className="text-on-surface-variant leading-relaxed mb-8">{featuredProduct.description}</p>
                    <div className="flex flex-wrap gap-4 mb-10">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <span className="material-symbols-outlined text-lg">eco</span>100% Organic
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <span className="material-symbols-outlined text-lg">science</span>High pH Balance
                      </div>
                    </div>
                  </div>
                  <Link to={`/products/${featuredProduct.id}`}>
                    <button className="w-full py-4 bg-primary-container text-on-primary-container rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-[0.98]">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                      Add to Cart - ₹{featuredProduct.price}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {otherProducts.map((product) => (
            <div key={product.id} className="md:col-span-4 group">
              <div className="bg-surface-container-low rounded-xl overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-500">
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  >
                    <span
                      className={`material-symbols-outlined ${wishlistIds.has(product.id) ? 'text-red-500' : 'text-on-surface-variant'}`}
                      style={wishlistIds.has(product.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="font-brand text-2xl text-primary mb-3">{product.name}</h2>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{product.description}</p>
                  </div>
                  <Link to={`/products/${product.id}`}>
                    <button className="w-full py-3 border-2 border-primary-container text-primary-container rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98]">
                      <span className="material-symbols-outlined">shopping_bag</span>
                      Add to Cart - ₹{product.price}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="md:col-span-8">
            <div className="bg-primary-container text-on-primary-container rounded-xl p-10 flex items-center relative overflow-hidden min-h-[300px]">
              <div className="relative z-10 max-w-lg">
                <h3 className="font-brand text-3xl mb-4">The Science of Khar</h3>
                <p className="text-on-primary-container/80 mb-6 leading-relaxed">
                  Traditional Khar is more than an ingredient; it's a medicinal heritage. Naturally high in pH, it aids protein digestion and maintains metabolic equilibrium.
                </p>
                <Link to="/traditions" className="inline-flex items-center gap-2 font-bold hover:underline">
                  Learn about our process <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
                <svg className="h-full w-full fill-current" viewBox="0 0 100 100">
                  <path d="M0,0 L100,0 L100,100 Z M50,50 L0,100 L100,100 Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
