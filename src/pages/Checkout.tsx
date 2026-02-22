import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { useRazorpay } from '../hooks/useRazorpay';
import { useNavigate } from 'react-router-dom';
import { MapPin, Loader2 } from 'lucide-react';
import { sendOrderEmails } from '../lib/email';

// Define the Razorpay window interface
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { loadRazorpay } = useRazorpay();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<{lat: number, lng: number} | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setGettingLocation(false);
        // Optional: Auto-fill address if you had a reverse geocoding API
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please ensure location services are enabled.");
        setGettingLocation(false);
      }
    );
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey || razorpayKey === "YOUR_API_KEY") {
        alert("Please add your Razorpay Key ID to the .env file to proceed.");
        setIsProcessing(false);
        return;
    }

    const options = {
      key: razorpayKey, 
      amount: cartTotal * 100, // Amount in paise
      currency: "INR",
      name: "ElectroSwap",
      description: "Tech Purchase",
      image: "https://i.ibb.co/HLfD5wgf/dualite-favicon.png",
      handler: async function (response: any) {
        // Payment Success
        console.log("Payment Successful", response);

        // Prepare Email Data
        const itemsList = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
        const googleMapsLink = gpsLocation 
          ? `https://www.google.com/maps?q=${gpsLocation.lat},${gpsLocation.lng}`
          : "Location not provided";

        const emailParams = {
          to_email: formData.email,
          to_name: `${formData.firstName} ${formData.lastName}`,
          order_id: response.razorpay_payment_id,
          amount: formatCurrency(cartTotal),
          items: itemsList,
          address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
          gps_link: googleMapsLink,
          payment_id: response.razorpay_payment_id
        };

        // Send Emails (Non-blocking)
        sendOrderEmails(emailParams);

        clearCart();
        navigate('/checkout/success');
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
      },
      theme: {
        color: "#2563eb", // Blue-600
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
    paymentObject.on('payment.failed', function (response: any){
        alert("Payment Failed: " + response.error.description);
        setIsProcessing(false);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form id="checkout-form" onSubmit={handlePayment} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Shipping Information</h3>
                
                {/* GPS Location Button */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">Exact Delivery Location</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      {gpsLocation 
                        ? "Location captured successfully! We'll deliver to your exact GPS coordinates." 
                        : "Share your GPS location for faster delivery."}
                    </p>
                  </div>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant={gpsLocation ? "primary" : "outline"}
                    onClick={handleGetLocation}
                    disabled={gettingLocation || !!gpsLocation}
                    className="flex items-center gap-2"
                  >
                    {gettingLocation ? <Loader2 className="animate-spin" size={16} /> : <MapPin size={16} />}
                    {gpsLocation ? "Location Set" : "Detect Location"}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input 
                      required 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input 
                      required 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input 
                      required 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email" 
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input 
                      required 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="tel" 
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <input 
                      required 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                    <input 
                      required 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Zip Code</label>
                    <input 
                      required 
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Method</h3>
                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg flex items-center gap-4">
                  <div className="w-12 h-8 bg-white rounded border border-slate-200 flex items-center justify-center">
                    <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Razorpay Secure</p>
                    <p className="text-sm text-slate-600">UPI, Cards, Wallets, NetBanking</p>
                  </div>
                </div>
              </div>
            </form>
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
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-lg text-slate-900">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => document.getElementById('checkout-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay ${formatCurrency(cartTotal)}`}
              </Button>
              <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Secure Payment by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
