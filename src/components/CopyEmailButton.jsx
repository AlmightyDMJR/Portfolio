import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const CopyEmailButton = ({ email = 'goddmjr@gmail.com' }) => {
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
      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-medium cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
        copied
          ? 'bg-[#57DB96] text-[#064e3b] border border-[#57DB96] shadow-[0_2px_10px_rgba(87,219,150,0.25)]'
          : 'bg-[#111827] hover:bg-[#1F2937] text-white border border-[#111827] shadow-[0_2px_8px_rgba(15,15,20,0.12)] hover:shadow-[0_4px_14px_rgba(15,15,20,0.18)]'
      }`}
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
              <path d="M3 8l3.5 3.5L13 4.5" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-semibold text-[#064e3b]">Email Copied!</span>
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
