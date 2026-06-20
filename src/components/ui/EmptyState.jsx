import React from 'react';

export default function EmptyState({
  icon = 'inbox',
  title = 'Tidak Ada Data',
  message = 'Belum ada konten yang tersedia untuk ditampilkan.'
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>
        {icon}
      </span>
      <h3 className="font-serif text-lg font-bold text-primary mb-1">{title}</h3>
      <p className="font-sans text-sm text-on-surface-variant max-w-xs">{message}</p>
    </div>
  );
}