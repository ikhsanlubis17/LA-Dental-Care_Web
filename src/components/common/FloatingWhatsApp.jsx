import React from 'react';
import useSiteSettings from '../../hooks/useSiteSettings';
import { generateWaLink, getDefaultWaMessage } from '../../lib/whatsapp';

export default function FloatingWhatsApp() {
  const { data: settings } = useSiteSettings();

  const waNumber = settings?.whatsapp_number || '6281234567890';
  const defaultMessage = getDefaultWaMessage(settings);
  const waUrl = generateWaLink(waNumber, defaultMessage);

  return (
    <a 
      aria-label="Chat WhatsApp" 
      className="fixed bottom-6 right-6 bg-secondary text-white p-4 rounded-full deep-shadow hover:scale-110 transition-transform duration-300 z-40 flex items-center justify-center group" 
      href={waUrl}
      target="_blank" 
      rel="noopener noreferrer"
    >
      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
        chat
      </span>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-sans text-xs uppercase tracking-wider font-bold pl-0 group-hover:pl-2">
        Konsultasi WA
      </span>
    </a>
  );
}