import React from 'react';

export default function ErrorState({
  message = 'Terjadi kesalahan saat memuat data.',
  onRetry
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="material-symbols-outlined text-5xl text-error/60 mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>
        error_outline
      </span>
      <h3 className="font-serif text-lg font-bold text-primary mb-1">Gagal Memuat</h3>
      <p className="font-sans text-sm text-on-surface-variant max-w-xs mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-sans text-xs uppercase tracking-wider font-bold hover:bg-primary/90 transition-colors"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}