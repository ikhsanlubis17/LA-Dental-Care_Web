import React, { useState } from 'react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImg, setSelectedImg] = useState(null);

  const categories = [
    { label: 'Semua', id: 'all' },
    { label: 'Klinik', id: 'clinic' },
    { label: 'Layanan', id: 'service' },
    { label: 'Peralatan', id: 'equipment' }
  ];

  const galleryItems = [
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3WUNVGefIW7a7uH3DK_Pi1esWOcNtNJ7FtiT2N-hTjp53CfoyL9Cg0HheC8wZFCOxpPxDqVm7grNG_zWuG9begrBNdMMIIzIqhLpZ_bysGQo4s78XkRKHFg6yXr-ghoLEMuNIaMQ4h--N8lX3rvDydJd_J6sSGdiCKHWGWyrvPCEDkRQk_sb8-ucp82tkGgJXh_erM2QllUaGmPk71yUarlbWVS2_ACew75B7y0FnQVjsqcYNQKmtlZe8caulogdCsxOQxjKwvmqc',
      category: 'clinic',
      title: 'Ruang Tunggu Premium',
      desc: 'Desain interior modern yang nyaman dan menenangkan bagi pasien.'
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpM6R79kloEnheuP2NezeXxCTYKplytDgtH1Y20UlKuVa_Oagr29ihaFcU4LTamM9MCaH3GeCxoATBDjlBTabKK1T8lTB6OtH-1HvhiyBVqu8_ILV1CJ31FAP3E1pSZlTMb58IbzxWNpDfhwGGfU7URzKOHQMRfNTuj6g2HNG4g-6C7tDU6MC5nU8nkKJV3lZZsuHwwmkKtP9I0OvImZcVampG7z-Xm_tU4uqnHAVeEaFazBXldgx-L0NYxRFfY3K2h0VmExvSHtBU',
      category: 'equipment',
      title: 'Kursi Perawatan Modern',
      desc: 'Peralatan dental canggih dan steril untuk kenyamanan ekstra.'
    },
    {
      img: '/fotodokter.png',
      category: 'service',
      title: 'Pemeriksaan Gigi Presisi',
      desc: 'drg. Lely Apriani Nasution melakukan pemeriksaan menyeluruh pada pasien.'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="py-20 bg-surface px-4 md:px-10" id="galeri">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight mb-4">Galeri LA Dental Care</h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            Intip fasilitas interior bergaya butik, higienitas ruang perawatan, dan prosedur dental modern yang kami hadirkan di klinik.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveFilter(c.id)}
              className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                activeFilter === c.id 
                  ? 'bg-secondary text-white shadow-sm' 
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden ambient-shadow border border-surface-variant/40 hover:border-secondary/30 transition-all duration-300 group cursor-pointer text-left"
              onClick={() => setSelectedImg(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-sans text-[10px] tracking-wider font-bold uppercase mb-3">
                  {item.category === 'clinic' ? 'Klinik' : item.category === 'service' ? 'Layanan' : 'Peralatan'}
                </span>
                <h3 className="font-serif text-base md:text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Image Modal Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <div 
            className="bg-surface rounded-2xl overflow-hidden max-w-3xl w-full ambient-shadow relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute right-4 top-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors duration-200 z-10"
              onClick={() => setSelectedImg(null)}
            >
              <span className="material-symbols-outlined block text-base leading-none">close</span>
            </button>
            <div className="relative aspect-[16/10] bg-black">
              <img 
                src={selectedImg.img} 
                alt={selectedImg.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 md:p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-sans text-[10px] tracking-wider font-bold uppercase mb-3">
                {selectedImg.category === 'clinic' ? 'Klinik' : selectedImg.category === 'service' ? 'Layanan' : 'Peralatan'}
              </span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-2">{selectedImg.title}</h3>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">{selectedImg.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
