import emailjs from '@emailjs/browser';

interface EmailParams {
  to_email: string;
  to_name: string;
  order_id: string;
  amount: string;
  items: string;
  address: string;
  gps_link: string;
  payment_id: string;
}

export const sendOrderEmails = async (params: EmailParams) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey || serviceId === "YOUR_EMAILJS_SERVICE_ID") {
    console.warn("EmailJS credentials not found. Emails will not be sent.");
    return;
  }

  try {
    // Send email (You can configure EmailJS template to send to both user and owner, 
    // or call send() twice with different templates if needed)
    
    // We are sending one payload. In EmailJS dashboard, you can configure the template 
    // to Auto-Reply to the customer AND email the owner.
    await emailjs.send(serviceId, templateId, params as unknown as Record<string, unknown>, publicKey);
    console.log("Order emails sent successfully");
  } catch (error) {
    console.error("Failed to send order emails:", error);
  }
};
