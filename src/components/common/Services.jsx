import React from 'react';
import useServices from '../../hooks/useServices';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorState from '../ui/ErrorState';

export default function Services({ onNavClick }) {
  const { data: services, loading, error, refetch } = useServices();
  const serviceList = services || [];

  if (loading) return <LoadingSpinner text="Memuat layanan..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const gridServices = serviceList.filter(s => !s.is_featured);
  const featuredService = serviceList.find(s => s.is_featured);

  return (
    <section className="py-20 bg-surface px-4 md:px-10" id="layanan">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Services Hero Header */}
        <div className="flex flex-col lg:flex-row items-center gap-12 text-left">
          <div className="lg:w-1/2 space-y-4">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
              Layanan Premium Kami
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Solusi perawatan gigi komprehensif yang dirancang untuk kenyamanan dan estetika optimal. Dikelola oleh tenaga medis profesional dengan teknologi terkini.
            </p>
          </div>
          <div className="lg:w-1/2 w-full h-64 md:h-80 rounded-2xl overflow-hidden relative ambient-shadow">
            <img 
              alt="Klinik Gigi Premium" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-102" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpM6R79kloEnheuP2NezeXxCTYKplytDgtH1Y20UlKuVa_Oagr29ihaFcU4LTamM9MCaH3GeCxoATBDjlBTabKK1T8lTB6OtH-1HvhiyBVqu8_ILV1CJ31FAP3E1pSZlTMb58IbzxWNpDfhwGGfU7URzKOHQMRfNTuj6g2HNG4g-6C7tDU6MC5nU8nkKJV3lZZsuHwwmkKtP9I0OvImZcVampG7z-Xm_tU4uqnHAVeEaFazBXldgx-L0NYxRFfY3K2h0VmExvSHtBU"
            />
            <div className="absolute inset-0 bg-primary/10"></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((item, idx) => (
            <article 
              key={item.id || idx} 
              className={`bg-surface-container-lowest rounded-xl p-6 border-t-4 transition-all duration-300 ambient-shadow hover:-translate-y-1 text-left flex flex-col justify-between ${
                idx === 0 ? 'border-secondary' : 'border-transparent hover:border-secondary'
              }`}
            >
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-secondary text-2xl">{item.icon_name || 'stethoscope'}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">{item.title}</h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mb-6">{item.description}</p>
                
                {item.duration || item.price_start_from ? (
                  <div className="mb-6 pt-4 border-t border-surface-variant/40">
                    <h4 className="font-sans text-[10px] tracking-wider font-bold text-primary mb-3 uppercase">Detail</h4>
                    <ul className="space-y-2">
                      {item.duration && (
                        <li className="flex items-center gap-2 font-sans text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                          {item.duration}
                        </li>
                      )}
                      {item.price_start_from && (
                        <li className="flex items-center gap-2 font-sans text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                          Mulai dari Rp {Number(item.price_start_from).toLocaleString('id-ID')}
                        </li>
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>

              <a 
                href="#booking"
                onClick={(e) => { e.preventDefault(); onNavClick('booking'); }}
                className="w-full text-center bg-primary text-white hover:bg-secondary/95 py-3 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors duration-300 block"
              >
                Booking Sekarang
              </a>
            </article>
          ))}

          {/* Special Consultancy Item (Spans Full Width on lg Screens) */}
          <article className="bg-surface-container-lowest rounded-xl p-6 md:p-8 ambient-shadow border border-surface-variant/40 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row gap-6 items-center text-left">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary text-3xl">forum</span>
            </div>
            <div className="flex-grow">
              <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-2">Konsultasi Spesialistik</h3>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Diskusi mendalam mengenai masalah kesehatan gigi dan mulut Anda bersama tim dokter ahli kami. Dapatkan rencana perawatan personal yang disesuaikan dengan kebutuhan dan preferensi Anda.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <a 
                href="#booking"
                onClick={(e) => { e.preventDefault(); onNavClick('booking'); }}
                className="w-full md:w-auto text-center bg-secondary text-white hover:bg-secondary/90 px-8 py-3.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 inline-block"
              >
                Booking Sekarang
              </a>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
