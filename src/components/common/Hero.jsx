import React from 'react';
import useHeroSection from '../../hooks/useHeroSection';

export default function Hero({ onNavClick }) {
  const { data: hero } = useHeroSection();
  const heroData = hero || {};

  return (
    <section
      className="relative min-h-[100dvh] flex items-center pt-24 pb-16 px-4 md:px-10 max-w-7xl mx-auto overflow-hidden"
      id="beranda"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 w-full relative">
        {/* Left Column (Text & Actions) */}
        <div className="flex flex-col gap-6 order-2 md:order-1 text-left">
          <div className="inline-flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full w-max border border-outline-variant/30">
            <span
              className="material-symbols-outlined text-secondary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <span className="font-sans text-[10px] tracking-widest font-bold text-on-surface-variant uppercase">
              {hero?.badge_text || 'Klinik Gigi Premium'}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-tight font-bold tracking-tight">
            {hero?.headline || 'Perawatan Gigi Profesional untuk '}
            {hero?.highlighted_text && (
              <span className="text-secondary">{hero.highlighted_text}</span>
            )}
          </h1>

          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
            {hero?.description ||
              'LA Dental Care Klampok menghadirkan pengalaman perawatan gigi yang menenangkan, modern, dan didukung oleh tenaga medis profesional untuk kesehatan optimal keluarga Anda.'}
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="#booking"
              onClick={e => {
                e.preventDefault();
                onNavClick('booking');
              }}
              className="bg-secondary-container text-on-secondary-container px-8 py-3.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold hover:bg-secondary hover:text-white transition-all duration-300 deep-shadow flex items-center gap-2"
            >
              {hero?.primary_button_text || 'Booking Sekarang'}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <a
              href="#jadwal"
              onClick={e => {
                e.preventDefault();
                onNavClick('jadwal');
              }}
              className="bg-surface border border-outline-variant text-primary px-8 py-3.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold hover:border-primary transition-all duration-300 flex items-center gap-2"
            >
              {hero?.secondary_button_text || 'Lihat Jadwal Dokter'}
            </a>
          </div>

          {/* Stats from DB: stat_1, stat_2, stat_3 */}
          {(hero?.stat_1_label || hero?.stat_2_label || hero?.stat_3_label) && (
            <div className="flex gap-6 mt-6 pt-6 border-t border-surface-variant/50">
              {hero.stat_1_label && (
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold text-primary">
                    {hero.stat_1_value}
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant">
                    {hero.stat_1_label}
                  </span>
                </div>
              )}
              {hero.stat_2_label && (
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold text-primary">
                    {hero.stat_2_value}
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant">
                    {hero.stat_2_label}
                  </span>
                </div>
              )}
              {hero.stat_3_label && (
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold text-primary">
                    {hero.stat_3_value}
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant">
                    {hero.stat_3_label}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (Hero Image with Dentist Card) */}
        <div className="order-1 md:order-2 relative w-full h-[320px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden ambient-shadow">
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-variant/30 to-surface-container-low/20 mix-blend-multiply opacity-50 z-10" />
          <img
            alt={hero?.doctor_name || 'drg. Lely Apriani Nasution at LA Dental Care'}
            className="w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105"
            src={hero?.image_url || '/fotodokter.png'}
            loading="eager"
            decoding="async"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-4 rounded-xl z-20 flex items-center gap-4 border border-white/20 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-secondary-container text-lg">
                verified
              </span>
            </div>
            <div className="text-left">
              <h3 className="font-serif text-sm md:text-base font-bold text-primary">
                {hero?.doctor_name || 'drg. Lely Apriani Nasution'}
              </h3>
              <p className="font-sans text-[11px] text-on-surface-variant font-medium">
                {hero?.doctor_title || 'Dokter Gigi Penanggung Jawab'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background shape */}
      <div className="absolute -right-1/4 -top-1/4 w-[700px] h-[700px] bg-secondary-fixed opacity-10 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
}