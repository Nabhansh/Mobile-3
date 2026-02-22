import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Sell } from './pages/Sell';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { About, Support, Contact, Shipping, Returns } from './pages/InfoPages';

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-arrivals" element={<Shop title="New Arrivals" filterType="new" />} />
            <Route path="/best-sellers" element={<Shop title="Best Sellers" filterType="best-seller" />} />
            <Route path="/deals" element={<Shop title="Hot Deals" filterType="deal" />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<Success />} />
            
            {/* Info Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;
