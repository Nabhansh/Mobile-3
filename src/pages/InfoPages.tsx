import React from 'react';

const InfoLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50 py-12">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">{title}</h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export const About = () => (
  <InfoLayout title="About Us">
    <p className="mb-4">ElectroSwap was founded in 2025 with a simple mission: to make buying and selling electronics transparent, safe, and easy.</p>
    <p className="mb-4">We believe that technology should be accessible to everyone, and that high-quality devices deserve a second life. Our team of experts rigorously tests every product we sell to ensure it meets our high standards.</p>
    <p>Whether you're looking for the latest flagship phone or a budget-friendly laptop, we've got you covered.</p>
  </InfoLayout>
);

export const Support = () => (
  <InfoLayout title="Support Center">
    <h3 className="text-xl font-bold text-slate-900 mb-2">How can we help?</h3>
    <p className="mb-6">Our dedicated support team is available 24/7 to assist you with any questions or concerns.</p>
    <div className="space-y-4">
      <details className="group p-4 bg-slate-50 rounded-lg cursor-pointer">
        <summary className="font-medium text-slate-900 list-none flex justify-between items-center">
          How do I track my order?
          <span className="transition group-open:rotate-180">▼</span>
        </summary>
        <p className="mt-2 text-sm">You will receive a tracking number via email once your order ships.</p>
      </details>
      <details className="group p-4 bg-slate-50 rounded-lg cursor-pointer">
        <summary className="font-medium text-slate-900 list-none flex justify-between items-center">
          What is the warranty period?
          <span className="transition group-open:rotate-180">▼</span>
        </summary>
        <p className="mt-2 text-sm">All our products come with a standard 12-month warranty.</p>
      </details>
    </div>
  </InfoLayout>
);

export const Contact = () => (
  <InfoLayout title="Contact Us">
    <p className="mb-6">
      We'd love to hear from you. Fill out the form below or email us directly at{' '}
      <a href="mailto:support@electroswap.com" className="text-blue-600 hover:underline font-medium">
        support@electroswap.com
      </a>.
    </p>
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none"></textarea>
      </div>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Send Message</button>
    </form>
  </InfoLayout>
);

export const Shipping = () => (
  <InfoLayout title="Shipping Information">
    <p className="mb-4">We offer free standard shipping on all orders over $50 within the continental US.</p>
    <ul className="list-disc pl-5 space-y-2 mb-4">
      <li>Standard Shipping (3-5 business days): Free over $50</li>
      <li>Express Shipping (2 business days): $14.99</li>
      <li>Overnight Shipping: $29.99</li>
    </ul>
    <p>Orders placed before 2 PM EST are processed the same day.</p>
  </InfoLayout>
);

export const Returns = () => (
  <InfoLayout title="Returns Policy">
    <p className="mb-4">We want you to be completely satisfied with your purchase. If you're not happy, you can return your item within 30 days of delivery.</p>
    <p className="mb-4">Items must be in the same condition as received and in original packaging.</p>
    <p>To initiate a return, please visit your account dashboard or contact our support team.</p>
  </InfoLayout>
);
