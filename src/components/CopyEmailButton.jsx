import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const CopyEmailButton = ({ email = 'digantamukherjee6@gmail.com' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      id="copy-email-btn"
      aria-label="Copy email address to clipboard"
      className="relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: copied
          ? 'linear-gradient(135deg, #57db96, #33c2cc)'
          : 'linear-gradient(135deg, rgba(92, 51, 204, 0.6), rgba(122, 87, 219, 0.4))',
        border: '1px solid rgba(122, 87, 219, 0.4)',
        boxShadow: copied
          ? '0 0 20px rgba(87, 219, 150, 0.4)'
          : '0 0 15px rgba(92, 51, 204, 0.3)',
      }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="copied"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            {/* Checkmark */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Email Copied!</span>
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            {/* Copy icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="white" strokeWidth="1.5" />
              <path d="M11 5V3.5A1.5 1.5 0 009.5 2H3.5A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="white" strokeWidth="1.5" />
            </svg>
            <span>Copy Email Address</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CopyEmailButton;
