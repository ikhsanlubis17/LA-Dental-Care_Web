import React from 'react';
import useSiteSettings from '../../hooks/useSiteSettings';
import { generateWaLink, getDefaultWaMessage } from '../../lib/whatsapp';

export default function Footer({ onNavClick }) {
  const { data: settings } = useSiteSettings();

  const clinicName = settings?.clinic_name || 'LA Dental Care Klampok';
  const clinicTagline = settings?.clinic_tagline || 'Klinik gigi premium yang berdedikasi memberikan senyum terbaik dengan layanan profesional, ramah, dan teknologi modern untuk keluarga Anda.';
  const waNumber = settings?.whatsapp_number || '6281234567890';
  const instagramUrl = settings?.instagram_url || 'https://instagram.com/la.dentalcare_klampok';
  const phone = settings?.phone || '+62 812-3456-7890';

  return (
    <footer className="w-full py-16 bg-primary-container text-white border-t border-outline-variant/20 px-4 md:px-10 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <span className="font-serif text-lg md:text-xl text-secondary-fixed-dim font-bold">{clinicName}</span>
          <p className="font-sans text-xs text-primary-fixed-dim leading-relaxed">
            {clinicTagline}
          </p>
          <p className="font-sans text-[10px] text-primary-fixed-dim/60 mt-auto pt-4 hidden md:block">
            &copy; 2026 {clinicName}. All Rights Reserved.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-sans text-[11px] tracking-widest font-bold uppercase text-secondary-fixed mb-4">Navigasi Utama</h4>
          <ul className="space-y-2.5 font-sans text-xs text-primary-fixed-dim">
            <li>
              <a 
                href="#beranda" 
                onClick={(e) => { e.preventDefault(); onNavClick('beranda'); }}
                className="hover:text-secondary-fixed transition-colors hover:underline underline-offset-4"
              >
                Beranda
              </a>
            </li>
            <li>
              <a 
                href="#tentang" 
                onClick={(e) => { e.preventDefault(); onNavClick('tentang'); }}
                className="hover:text-secondary-fixed transition-colors hover:underline underline-offset-4"
              >
                Tentang Kami
              </a>
            </li>
            <li>
              <a 
                href="#layanan" 
                onClick={(e) => { e.preventDefault(); onNavClick('layanan'); }}
                className="hover:text-secondary-fixed transition-colors hover:underline underline-offset-4"
              >
                Layanan Perawatan
              </a>
            </li>
            <li>
              <a 
                href="#jadwal" 
                onClick={(e) => { e.preventDefault(); onNavClick('jadwal'); }}
                className="hover:text-secondary-fixed transition-colors hover:underline underline-offset-4"
              >
                Jadwal Dokter
              </a>
            </li>
            <li>
              <a 
                href="#faq" 
                onClick={(e) => { e.preventDefault(); onNavClick('faq'); }}
                className="hover:text-secondary-fixed transition-colors hover:underline underline-offset-4"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Column */}
        <div>
          <h4 className="font-sans text-[11px] tracking-widest font-bold uppercase text-secondary-fixed mb-4">Hubungi Kami</h4>
          <ul className="space-y-3 font-sans text-xs text-primary-fixed-dim">
            <li>
              <a 
                href={instagramUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary-fixed transition-colors hover:underline underline-offset-4 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
              </a>
            </li>
            <li>
              <a 
                href={generateWaLink(waNumber, getDefaultWaMessage(settings))}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary-fixed transition-colors hover:underline underline-offset-4 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                WhatsApp Resmi
              </a>
            </li>
            <li className="pt-2">
              <span className="block text-primary-fixed-dim/60 font-semibold uppercase text-[9px] tracking-wider mb-1">Telepon/CS:</span>
              <span className="text-secondary-fixed-dim font-bold">{phone}</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 md:hidden">
        <p className="font-sans text-[10px] text-primary-fixed-dim/60 text-center">
          &copy; 2026 {clinicName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}