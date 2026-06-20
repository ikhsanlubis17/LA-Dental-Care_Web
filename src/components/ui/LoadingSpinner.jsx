import React from 'react';

export default function LoadingSpinner({ text = 'Memuat...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mb-4" />
      <p className="font-sans text-sm text-on-surface-variant">{text}</p>
    </div>
  );
}

export function InlineSpinner({ size = 'sm', className = '' }) {
  const sizeClass = size === 'sm' ? 'w-5 h-5 border-2' : 'w-7 h-7 border-2';
  return (
    <div
      className={`${sizeClass} border-secondary/20 border-t-secondary rounded-full animate-spin inline-block ${className}`}
    />
  );
}