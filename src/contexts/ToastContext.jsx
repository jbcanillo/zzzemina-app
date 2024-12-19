import React, { createContext, useState, useContext } from "react";
import ToastMsg from "../components/ToastMsg"; // Adjust the path if necessary

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToastMessage }}>
      {children}
      {showToast && (
        <ToastMsg message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
      )}
    </ToastContext.Provider>
  );
};
