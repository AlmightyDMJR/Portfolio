import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Clock, Send } from 'lucide-react';

import Particles from '../components/Particles';
import Alert from '../components/Alert';
import { ContactCard } from '@/components/ui/contact-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: 'success', message: '' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => setAlert({ visible: false, type: 'success', message: '' }), 5000);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // EmailJS credentials — set these in your .env file:
      // VITE_EMAILJS_SERVICE_ID
      // VITE_EMAILJS_TEMPLATE_ID
      // VITE_EMAILJS_PUBLIC_KEY
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );

      setForm({ name: '', email: '', message: '' });
      showAlert('success', "Message sent! I'll get back to you within 24 hours. 🚀");
    } catch (err) {
      console.error('EmailJS error:', err);
      showAlert('error', 'Something went wrong. Please try emailing me directly at goddmjr@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: 'goddmjr@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kolkata, West Bengal (IST)',
      className: 'translate-x-[5px]',
    },
    {
      icon: Clock,
      label: 'Response Window',
      value: 'Within 24 hours • Remote worldwide',
      className: 'col-span-2 md:col-span-2 lg:col-span-3',
    },
  ];

  return (
    <section id="contact" className="section-spacing relative overflow-hidden py-12 md:py-20">
      {/* Particle background */}
      <Particles
        quantity={60}
        color="#7a57db"
        staticity={40}
        size={1.5}
        className="z-0"
      />

      <div className="c-space relative z-10 flex flex-col items-center justify-center">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="subtext uppercase tracking-widest mb-2 text-lavender font-semibold">
            Don&apos;t be shy
          </p>
          <h2 className="text-heading text-white">Let&apos;s Talk</h2>
          <p className="subtext mt-3 max-w-md mx-auto text-neutral-400">
            Have a project in mind, an opportunity, or just want to connect? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* ContactCard Component Container */}
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ContactCard
            title="Get In Touch"

            description="Whether you're looking for a full-stack engineer, need high-performance architecture, or want to explore an innovative idea, let's talk."
            contactInfo={contactDetails}
            className="rounded-2xl backdrop-blur-xl border border-lavender/30 text-white overflow-visible shadow-2xl transition-all duration-300 hover:border-lavender/50 [&>svg]:text-lavender [&>svg]:drop-shadow-[0_0_8px_rgba(122,87,219,0.6)]"
            formSectionClassName="bg-midnight/70 backdrop-blur-md rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none border-t md:border-t-0 md:border-l border-lavender/25 p-6 md:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(22, 26, 49, 0.92), rgba(31, 30, 57, 0.95))',
              boxShadow: '0 30px 80px rgba(3, 4, 18, 0.7), 0 0 50px rgba(92, 51, 204, 0.15)',
            }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-4">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-name" className="text-neutral-300 text-sm font-medium">
                  Your Name
                </Label>
                <Input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder=""
                  className="bg-navy/60 border-lavender/25 text-white placeholder:text-neutral-500 focus-visible:ring-lavender focus-visible:border-lavender/60 h-11 rounded-xl transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-email" className="text-neutral-300 text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="abc@example.com"
                  className="bg-navy/60 border-lavender/25 text-white placeholder:text-neutral-500 focus-visible:ring-lavender focus-visible:border-lavender/60 h-11 rounded-xl transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-message" className="text-neutral-300 text-sm font-medium">
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project, timeline, or thoughts..."
                  className="bg-navy/60 border-lavender/25 text-white placeholder:text-neutral-500 focus-visible:ring-lavender focus-visible:border-lavender/60 rounded-xl resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                id="contact-submit"
                disabled={loading}
                className="w-full h-11 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:opacity-95 active:scale-[0.99] border-0 mt-2"
                style={{
                  background: 'linear-gradient(135deg, #05c6fbff, #de0de9ff)',
                  boxShadow: '0 0 25px rgba(92, 51, 204, 0.45)',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="40" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>

              {/* Quick direct contact */}
              <div className="flex items-center justify-center gap-4 pt-3 border-t border-white/10">
                <a
                  href="mailto:goddmjr@gmail.com"
                  className="text-xs text-neutral-400 hover:text-lavender transition-colors"
                >
                  📧 goddmjr@gmail.com
                </a>
              </div>
            </form>
          </ContactCard>
        </motion.div>

        {/* EmailJS credential status note */}
        <p className="text-center text-xs text-neutral-500 mt-8 max-w-sm">
          Protected by EmailJS. Direct inbox delivery configured with zero backend modifications.
        </p>
      </div>

      {/* Toast Alert Notification */}
      <Alert type={alert.type} message={alert.message} visible={alert.visible} />
    </section>
  );
};

export default Contact;
