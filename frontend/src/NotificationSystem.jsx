import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

const NotificationContainer = ({ children, isVisible, onClose }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.3 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
        exit={{
          opacity: 0,
          y: -20,
          scale: 0.5,
          transition: {
            duration: 0.2,
          },
        }}
        className="fixed top-4 right-4 z-50 min-w-[300px] max-w-md shadow-lg"
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

export const ErrorNotification = ({
  message = "An error occurred",
  duration = 5000,
  onClose = () => {},
  isVisible = true,
}) => {
  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isVisible]);

  return (
    <NotificationContainer isVisible={isVisible} onClose={onClose}>
      <div className="bg-red-500 text-white p-4 rounded-lg flex items-center gap-3">
        <div className="flex-shrink-0">
          <motion.div
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <XCircle className="w-6 h-6" />
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex-1 text-sm font-medium"
        >
          {message}
        </motion.p>
      </div>
    </NotificationContainer>
  );
};

export const SuccessNotification = ({
  message = "Operation successful",
  duration = 5000,
  onClose = () => {},
  isVisible = true,
}) => {
  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isVisible]);

  return (
    <NotificationContainer isVisible={isVisible} onClose={onClose}>
      <div className="bg-green-500 text-white p-4 rounded-lg flex items-center gap-3">
        <div className="flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 20, -20, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CheckCircle2 className="w-6 h-6" />
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex-1 text-sm font-medium"
        >
          {message}
        </motion.p>
      </div>
    </NotificationContainer>
  );
};

// Example usage
const Example = () => {
  const [showError, setShowError] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  return (
    <div className="space-x-4">
      <button
        onClick={() => setShowError(true)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Show Error
      </button>
      <button
        onClick={() => setShowSuccess(true)}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Show Success
      </button>

      <ErrorNotification
        message="Something went wrong!"
        isVisible={showError}
        onClose={() => setShowError(false)}
        duration={5000}
      />

      <SuccessNotification
        message="Operation completed successfully!"
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
        duration={5000}
      />
    </div>
  );
};

