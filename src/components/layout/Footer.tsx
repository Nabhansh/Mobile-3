import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-1 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="text-white text-xl font-bold">Electro<span className="text-blue-500">Swap</span></span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              The premier marketplace to buy latest tech and sell your pre-loved electronics. Professional, secure, and fast.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Visit our Twitter profile"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Visit our Instagram profile"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/new-arrivals" className="hover:text-blue-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/best-sellers" className="hover:text-blue-400 transition-colors">Best Sellers</Link></li>
              <li><Link to="/deals" className="hover:text-blue-400 transition-colors">Deals & Offers</Link></li>
              <li><Link to="/sell" className="hover:text-blue-400 transition-colors">Sell Your Gear</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/support" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-blue-400 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-blue-400 transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://maps.google.com/?q=123+Tech+Avenue,+Silicon+Valley,+CA+94025" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-blue-400 transition-colors"
                >
                  <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                  <span>123 Tech Avenue, Silicon Valley, CA 94025</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+15551234567" 
                  className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                >
                  <Phone className="text-blue-500 flex-shrink-0" size={18} />
                  <span>+1 (555) 123-4567</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@electroswap.com" 
                  className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                >
                  <Mail className="text-blue-500 flex-shrink-0" size={18} />
                  <span>support@electroswap.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2025 ElectroSwap Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
