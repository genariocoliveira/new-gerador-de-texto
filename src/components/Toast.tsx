
import React, { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for animation to complete before unmounting
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={18} className="text-green-500" />;
      case "error":
        return <X size={18} className="text-red-500" />;
      case "info":
        return <CheckCircle size={18} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 ${
        isVisible ? "animate-scale-in" : "animate-scale-out"
      }`}
    >
      <div
        className={`py-3 px-5 rounded-lg shadow-subtle flex items-center gap-3 border ${getTypeStyles()}`}
      >
        {getIcon()}
        <p className="font-medium text-sm">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-3 p-1 rounded-full hover:bg-black/5 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
