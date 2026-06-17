import React from 'react';

export default function Contact() {
  return (
    <div className="space-y-6">
      
      {/* Location Card */}
      <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow border border-outline-variant/30 text-left">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          <h3 className="font-serif text-lg font-bold text-primary">Lokasi Klinik</h3>
        </div>
        
        {/* Google Maps Embed — responsive via padding-bottom trick */}
        <div className="relative w-full rounded-lg overflow-hidden border border-outline-variant/50 mb-6" style={{ paddingBottom: '60%' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.013397007813!2d109.42935247484081!3d-7.463768592547751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6551002d035af1%3A0x7a01b65789bab0f9!2sLa%20Dental%20Care%20Dokter%20Gigi%20Klampok%20Banjarnegara!5e0!3m2!1sid!2sid!4v1781728149932!5m2!1sid!2sid"
            title="Lokasi LA Dental Care Klampok di Google Maps"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="space-y-4 font-sans text-xs md:text-sm text-on-surface-variant">
          <div>
            <strong className="block text-primary font-bold mb-1">Alamat Lengkap:</strong>
            <p className="leading-relaxed">
              La Dental Care Dokter Gigi Klampok<br />
              Kec. Purwareja Klampok<br />
              Kab. Banjarnegara, Jawa Tengah
            </p>
          </div>
          <div className="pt-4 border-t border-surface-variant/30">
            <a 
              href="https://maps.app.goo.gl/YourClinicLink"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary font-bold transition-colors"
            >
              Buka di Google Maps
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>

      {/* Operational Hours Card */}
      <div className="bg-secondary/5 rounded-xl p-6 ambient-shadow border border-secondary/20 relative overflow-hidden text-left">
        <span className="material-symbols-outlined absolute -right-6 -top-6 text-[100px] text-secondary/5 pointer-events-none select-none">
          schedule
        </span>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
            <h3 className="font-serif text-lg font-bold text-primary">Jam Operasional</h3>
          </div>
          <ul className="space-y-3 font-sans text-xs md:text-sm text-on-surface">
            <li className="flex justify-between items-center pb-2 border-b border-surface-variant/20">
              <span>Senin - Jumat</span>
              <span className="font-semibold text-secondary">09:00 - 20:00</span>
            </li>
            <li className="flex justify-between items-center pb-2 border-b border-surface-variant/20">
              <span>Sabtu</span>
              <span className="font-semibold text-secondary">09:00 - 17:00</span>
            </li>
            <li className="flex justify-between items-center text-rose-600 font-bold">
              <span>Minggu & Hari Libur</span>
              <span>Tutup</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Card */}
      <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow border border-outline-variant/30 text-left">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>alternate_email</span>
          <h3 className="font-serif text-base font-bold text-primary">Terhubung dengan Kami</h3>
        </div>
        <a 
          className="flex items-center justify-between p-4 rounded-lg bg-surface border border-outline-variant hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group" 
          href="https://instagram.com/la.dentalcare_klampok" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div className="flex items-center gap-3">
            <svg 
              className="w-6 h-6 text-on-surface group-hover:text-secondary transition-colors" 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
            <div>
              <span className="block font-sans text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Instagram</span>
              <span className="block font-sans text-xs md:text-sm text-primary font-bold group-hover:text-secondary transition-colors">@la.dentalcare_klampok</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors text-base">arrow_outward</span>
        </a>
      </div>

    </div>
  );
}
