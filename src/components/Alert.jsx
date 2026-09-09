import { AnimatePresence, motion } from 'motion/react';

const Alert = ({ type = 'success', message = '', visible = false }) => {
  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 flex items-start gap-3 max-w-sm rounded-2xl p-4 shadow-2xl"
          role="alert"
          aria-live="polite"
          style={{
            background: 'linear-gradient(135deg, #1f1e39, #161a31)',
            border: `1px solid ${isSuccess ? 'rgba(87, 219, 150, 0.4)' : 'rgba(234, 72, 132, 0.4)'}`,
            boxShadow: `0 20px 40px rgba(3, 4, 18, 0.6), 0 0 20px ${isSuccess ? 'rgba(87, 219, 150, 0.15)' : 'rgba(234, 72, 132, 0.15)'}`,
          }}
        >
          {/* Icon */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm"
            style={{
              background: isSuccess
                ? 'linear-gradient(135deg, #57db96, #33c2cc)'
                : 'linear-gradient(135deg, #ea4884, #ca2f8c)',
            }}
          >
            {isSuccess ? '✓' : '✕'}
          </div>

          {/* Content */}
          <div>
            <div
              className="text-xs font-bold mb-0.5 uppercase tracking-wider"
              style={{ color: isSuccess ? '#57db96' : '#ea4884' }}
            >
              {isSuccess ? 'Success' : 'Failed'}
            </div>
            <p className="text-sm text-neutral-300">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
