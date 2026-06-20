import React, { useEffect } from 'react';

export default function Toast({ type = 'success', message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const styles = {
    success: {
      bg: 'bg-green-600',
      icon: 'check_circle',
      label: 'Berhasil'
    },
    error: {
      bg: 'bg-rose-600',
      icon: 'error',
      label: 'Gagal'
    },
    info: {
      bg: 'bg-blue-600',
      icon: 'info',
      label: 'Info'
    }
  };

  const config = styles[type] || styles.info;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={onClose} />
      <div className={`relative ${config.bg} text-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-fade-in-up`}>
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-2xl shrink-0">{config.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-xs uppercase tracking-widest font-bold mb-1 opacity-80">{config.label}</p>
            <p className="font-sans text-sm leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-white/70 hover:text-white transition-colors"
            aria-label="Tutup"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}