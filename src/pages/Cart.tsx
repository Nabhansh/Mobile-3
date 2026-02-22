import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';
import { motion } from 'framer-motion';

export const Cart = () => {
  const { cart, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-600 mb-8">Looks like you haven't added any tech yet.</p>
        <Link to="/new-arrivals">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 items-center"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-slate-100" />
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500 mb-1">{item.category}</p>
                  <p className="font-medium text-blue-600">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">Qty: {item.quantity}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-lg text-slate-900">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>
              <Link to="/checkout">
                <Button className="w-full">
                  Proceed to Checkout <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
