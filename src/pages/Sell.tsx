import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Headphones, Camera, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';

export const Sell = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');

  const categories = [
    { id: 'phone', name: 'Phone', icon: Smartphone },
    { id: 'laptop', name: 'Laptop', icon: Laptop },
    { id: 'audio', name: 'Audio', icon: Headphones },
    { id: 'other', name: 'Other', icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Sell Your Device</h1>
            <p className="text-lg text-slate-600">Get an instant quote in less than 2 minutes.</p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6">Select Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                        category === cat.id
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-slate-100 hover:border-blue-200 text-slate-600'
                      }`}
                    >
                      <cat.icon size={32} />
                      <span className="font-medium">{cat.name}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button 
                    disabled={!category} 
                    onClick={() => setStep(2)}
                    className={!category ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    Next Step
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-2xl font-bold mb-6">Device Details</h2>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Model Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. iPhone 13 Pro Max"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Condition</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all">
                      <option>Like New (Flawless)</option>
                      <option>Good (Minor scratches)</option>
                      <option>Fair (Visible wear)</option>
                      <option>Broken (Not working)</option>
                    </select>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                    <Button type="submit">Get Quote</Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{formatCurrency(12500)}</h2>
                <p className="text-slate-600 mb-8">Estimated Value for your device</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => window.location.reload()}>Decline</Button>
                  <Button>Accept & Ship</Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
