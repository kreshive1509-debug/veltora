import React, { useEffect } from 'react';
import { ToastMessage } from '../types';
import { Sparkles, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-black/80 border-emerald-500/50 text-emerald-400 shadow-emerald-500/10',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
        };
      case 'error':
        return {
          bg: 'bg-black/80 border-rose-500/50 text-rose-400 shadow-rose-500/10',
          icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-black/80 border-purple-500/50 text-purple-400 shadow-purple-500/10',
          icon: <Info className="w-5 h-5 text-purple-400 shrink-0" />,
        };
    }
  };

  const { bg, icon } = getStyle();

  return (
    <div
      id={`toast-${toast.id}`}
      className={`flex items-center gap-3 px-4 py-3 border rounded-xl backdrop-blur-xl shadow-lg transition-all duration-300 transform translate-y-0 scale-100 animate-slide-in-right max-w-sm ${bg}`}
      style={{
        animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
      
      {icon}
      <span className="text-sm font-medium tracking-tight text-white/90">{toast.text}</span>
      <button
        id={`toast-close-${toast.id}`}
        onClick={() => onClose(toast.id)}
        className="p-1 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
