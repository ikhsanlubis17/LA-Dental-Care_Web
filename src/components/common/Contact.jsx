import React from 'react';
import useSiteSettings from '../../hooks/useSiteSettings';
import { generateWaLink, getDefaultWaMessage } from '../../lib/whatsapp';

export default function Contact() {
  const { data: settings } = useSiteSettings();

  const address = settings?.address || 'La Dental Care Dokter Gigi Klampok\nKec. Purwareja Klampok\nKab. Banjarnegara, Jawa Tengah';
  const googleMapsUrl = settings?.google_maps_url || 'https://maps.app.goo.gl/YourClinicLink';
  const googleMapsEmbed = settings?.google_maps_embed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.013397007813!2d109.42935247484081!3d-7.463768592547751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6551002d035af1%3A0x7a01b65789bab0f9!2sLa%20Dental%20Care%20Dokter%20Gigi%20Klampok%20Banjarnegara!5e0!3m2!1sid!2sid!4v1781728149932!5m2!1sid!2sid';
  const instagram = settings?.instagram_url || 'https://instagram.com/la.dentalcare_klampok';
  const instagramHandle = settings?.instagram_handle || '@la.dentalcare_klampok';
  const waNumber = settings?.whatsapp_number;

  return (
    <div className="space-y-6">
      
      {/* Location Card */}
      <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow border border-outline-variant/30 text-left">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          <h3 className="font-serif text-lg font-bold text-primary">Lokasi Klinik</h3>
        </div>
        
        {/* Google Maps Embed */}
        <div className="relative w-full rounded-lg overflow-hidden border border-outline-variant/50 mb-6" style={{ paddingBottom: '60%' }}>
          <iframe
            src={googleMapsEmbed}
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
            <p className="leading-relaxed whitespace-pre-line">{address}</p>
          </div>
          <div className="pt-4 border-t border-surface-variant/30">
            <a 
              href={googleMapsUrl}
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

      {/* Social Media Card */}
      <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow border border-outline-variant/30 text-left">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>alternate_email</span>
          <h3 className="font-serif text-base font-bold text-primary">Terhubung dengan Kami</h3>
        </div>
        <a 
          className="flex items-center justify-between p-4 rounded-lg bg-surface border border-outline-variant hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group" 
          href={instagram}
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
              <span className="block font-sans text-xs md:text-sm text-primary font-bold group-hover:text-secondary transition-colors">{instagramHandle}</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors text-base">arrow_outward</span>
        </a>
        {waNumber && (
          <a 
            className="flex items-center justify-between p-4 rounded-lg bg-surface border border-outline-variant hover:border-secondary hover:bg-secondary/5 transition-all duration-300 group mt-3" 
            href={generateWaLink(waNumber, getDefaultWaMessage(settings))}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-on-surface group-hover:text-secondary transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
              </svg>
              <div>
                <span className="block font-sans text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">WhatsApp</span>
                <span className="block font-sans text-xs md:text-sm text-primary font-bold group-hover:text-secondary transition-colors">{waNumber}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors text-base">arrow_outward</span>
          </a>
        )}
      </div>

    </div>
  );
}