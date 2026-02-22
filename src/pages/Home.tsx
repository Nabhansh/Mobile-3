import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { products } from '../data/products';

export const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 pt-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 font-medium text-sm mb-6 border border-blue-500/30">
                The Future of Tech Commerce
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                Upgrade Your Tech. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Sell The Rest.
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
                The most professional marketplace to buy the latest gadgets and sell your used electronics for the best price. Guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/new-arrivals">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Now <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/sell">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500">
                    Sell Your Gear
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Verified Quality", desc: "Every item is inspected by experts." },
              { icon: Truck, title: "Fast Shipping", desc: "Free delivery on orders over $50." },
              { icon: RefreshCw, title: "Easy Returns", desc: "30-day money back guarantee." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Trending Now</h2>
              <p className="text-slate-600">Hottest picks selected just for you.</p>
            </div>
            <Link to="/best-sellers" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/best-sellers">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sell CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Got Old Tech Lying Around?</h2>
            <p className="text-lg text-slate-300 mb-10">
              Turn your unused electronics into cash or store credit. We offer the best market rates for your smartphones, laptops, and accessories.
            </p>
            <Link to="/sell">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Get an Instant Quote
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
