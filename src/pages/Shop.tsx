import React from 'react';
import { ProductCard } from '../components/ui/ProductCard';
import { products } from '../data/products';
import { motion } from 'framer-motion';

interface ShopProps {
  title: string;
  filterType?: 'new' | 'best-seller' | 'deal';
}

export const Shop: React.FC<ShopProps> = ({ title, filterType }) => {
  const filteredProducts = products.filter(p => {
    if (filterType === 'new') return p.isNew;
    if (filterType === 'best-seller') return p.isBestSeller;
    if (filterType === 'deal') return p.isOnDeal;
    return true;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore our curated collection of premium electronics. Quality guaranteed on every purchase.
          </p>
        </motion.div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500">No products found in this category right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};
