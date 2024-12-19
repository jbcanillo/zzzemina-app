import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ToastMsg = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically close the toast after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Close the toast
    }, 4000);

    return () => clearTimeout(timer); // Clean up the timer
  }, [message, onClose]);

  if (!isVisible) return null;

  // Ensure the type is a valid class name for DaisyUI
  const validTypes = ["success", "warning", "error", "info"];
  const toastType = validTypes.includes(type) ? type : "info"; // Default to "info" if type is invalid

  return (
    <motion.div
      className="toast toast-center toast-top"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
    >
      <div className={`alert alert-${toastType} shadow-lg`}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ToastMsg;
