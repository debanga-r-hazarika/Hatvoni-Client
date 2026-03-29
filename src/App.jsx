import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Traditions from './pages/Traditions';
import Recipes from './pages/Recipes';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnsShipping from './pages/ReturnsShipping';
import FAQ from './pages/FAQ';
import TermsConditions from './pages/TermsConditions';
import OrderDetail from './pages/OrderDetail';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Pages that use a minimal transactional header (no shared Navbar/Footer)
const TRANSACTIONAL = ['/checkout', '/login', '/signup', '/forgot-password', '/reset-password'];

function Layout({ children, path }) {
  const isTransactional = TRANSACTIONAL.includes(path);
  if (isTransactional) return <>{children}</>;
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout path="/"><Home /></Layout>} />
          <Route path="/about" element={<Layout path="/about"><About /></Layout>} />
          <Route path="/products" element={<Layout path="/products"><Products /></Layout>} />
          <Route path="/products/:id" element={<Layout path="/products/:id"><ProductDetail /></Layout>} />
          <Route path="/product/kola-khar" element={<Layout path="/product/kola-khar"><ProductDetail /></Layout>} />
          <Route path="/traditions" element={<Layout path="/traditions"><Traditions /></Layout>} />
          <Route path="/recipes" element={<Layout path="/recipes"><Recipes /></Layout>} />
          <Route path="/gallery" element={<Layout path="/gallery"><Gallery /></Layout>} />
          <Route path="/contact" element={<Layout path="/contact"><Contact /></Layout>} />
          <Route path="/cart" element={<Layout path="/cart"><Cart /></Layout>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Layout path="/profile"><Profile /></Layout>} />
          <Route path="/orders" element={<Layout path="/orders"><Orders /></Layout>} />
          <Route path="/order/:id" element={<Layout path="/order/:id"><OrderDetail /></Layout>} />
          <Route path="/wishlist" element={<Layout path="/wishlist"><Wishlist /></Layout>} />
          <Route path="/privacy-policy" element={<Layout path="/privacy-policy"><PrivacyPolicy /></Layout>} />
          <Route path="/returns-shipping" element={<Layout path="/returns-shipping"><ReturnsShipping /></Layout>} />
          <Route path="/faq" element={<Layout path="/faq"><FAQ /></Layout>} />
          <Route path="/terms-conditions" element={<Layout path="/terms-conditions"><TermsConditions /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
