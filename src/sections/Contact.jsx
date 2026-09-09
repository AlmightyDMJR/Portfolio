import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';

import Particles from '../components/Particles';
import Alert from '../components/Alert';

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
      showAlert('error', 'Something went wrong. Please try emailing me directly at diganta@example.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      {/* Particle background */}
      <Particles
        quantity={60}
        color="#7a57db"
        staticity={40}
        size={1.5}
        className="z-0"
      />

      <div className="c-space relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="subtext uppercase tracking-widest mb-2">Don&apos;t be shy</p>
          <h2 className="text-heading">Let&apos;s Talk</h2>
          <p className="subtext mt-3 max-w-sm mx-auto">
            Have a project in mind or just want to connect? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          className="w-full max-w-md rounded-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, #161a31, #1f1e39)',
            border: '1px solid rgba(122, 87, 219, 0.25)',
            boxShadow: '0 30px 80px rgba(3, 4, 18, 0.6), 0 0 40px rgba(92, 51, 204, 0.1)',
          }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="field-label text-neutral-300">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="field-input field-input-focus"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="field-label text-neutral-300">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="field-input field-input-focus"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="field-label text-neutral-300">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="field-input field-input-focus resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              id="contact-submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #5c33cc, #7a57db)',
                boxShadow: '0 0 20px rgba(92, 51, 204, 0.4)',
              }}
              whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="40" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message →'
              )}
            </motion.button>
          </form>

          {/* Quick contact links */}
          <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-white/10">
            <a
              href="mailto:diganta@example.com"
              className="text-xs text-neutral-500 hover:text-white transition-colors"
            >
              📧 diganta@example.com
            </a>
          </div>
        </motion.div>

        {/* EmailJS setup note */}
        <p className="text-center text-xs text-neutral-600 mt-6 max-w-xs">
          To enable email delivery, add your EmailJS credentials to a <code className="text-neutral-500">.env</code> file.
          <br />See VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY.
        </p>
      </div>

      {/* Toast alert */}
      <Alert type={alert.type} message={alert.message} visible={alert.visible} />
    </section>
  );
};

export default Contact;
