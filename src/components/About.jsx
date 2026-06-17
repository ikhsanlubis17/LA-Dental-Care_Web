import React from 'react';

export default function About() {
  const pillars = [
    {
      icon: 'volunteer_activism',
      title: 'Pelayanan Ramah',
      desc: 'Staf dan dokter yang bersahabat untuk mengurangi kecemasan Anda selama perawatan.'
    },
    {
      icon: 'info',
      title: 'Informatif',
      desc: 'Edukasi komprehensif mengenai kondisi gigi dan rencana perawatan yang transparan.'
    },
    {
      icon: 'schedule',
      title: 'Jadwal Jelas',
      desc: 'Manajemen waktu yang efisien untuk meminimalkan antrean di ruang tunggu klinik.'
    },
    {
      icon: 'smartphone',
      title: 'Booking WA',
      desc: 'Kemudahan reservasi jadwal hanya melalui pesan WhatsApp, cepat dan praktis.'
    }
  ];

  return (
    <section className="py-20 bg-surface-container-low px-4 md:px-10" id="tentang">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Core Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight mb-4">Tentang LA Dental Care Klampok</h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Klinik gigi modern yang mengedepankan kenyamanan pasien dengan standar medis profesional dan pelayanan sepenuh hati.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div 
                key={idx} 
                className="bg-surface p-6 rounded-xl border border-surface-variant/40 hover:border-secondary transition-all-custom duration-300 ambient-shadow hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center mb-4 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{p.icon}</span>
                </div>
                <h3 className="font-serif text-base md:text-lg font-bold mb-2 text-primary group-hover:text-secondary transition-colors duration-300">{p.title}</h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 border-t border-surface-variant/40">
          <div className="space-y-6 text-left">
            <h3 className="font-serif text-2xl md:text-4xl font-bold text-primary leading-tight tracking-tight">
              Elevating Dental Care to an Art Form.
            </h3>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Di LA Dental Care Klampok, kami memadukan keunggulan klinis yang ketat dengan lingkungan yang tenang dan mewah. Misi kami adalah mengubah pengalaman perawatan gigi Anda menjadi momen yang menenangkan dan nyaman.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ambient-shadow">
            <img 
              alt="Modern dental clinic interior" 
              className="object-cover w-full h-full hover:scale-102 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3WUNVGefIW7a7uH3DK_Pi1esWOcNtNJ7FtiT2N-hTjp53CfoyL9Cg0HheC8wZFCOxpPxDqVm7grNG_zWuG9begrBNdMMIIzIqhLpZ_bysGQo4s78XkRKHFg6yXr-ghoLEMuNIaMQ4h--N8lX3rvDydJd_J6sSGdiCKHWGWyrvPCEDkRQk_sb8-ucp82tkGgJXh_erM2QllUaGmPk71yUarlbWVS2_ACew75B7y0FnQVjsqcYNQKmtlZe8caulogdCsxOQxjKwvmqc"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/20 to-transparent"></div>
          </div>
        </div>

        {/* Vision & Mission Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="bg-surface p-8 rounded-xl ambient-shadow border-t-2 border-secondary text-left space-y-4">
            <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>visibility</span>
            </div>
            <h4 className="font-serif text-lg md:text-xl font-bold text-primary">Visi Kami</h4>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Menjadi tujuan utama untuk perawatan gigi holistik dan kelas atas di wilayah ini, yang dikenal karena standar perawatan kami yang tanpa kompromi, teknologi canggih, dan pendekatan penuh kasih untuk setiap senyum pasien.
            </p>
          </div>
          <div className="bg-surface p-8 rounded-xl ambient-shadow border-t-2 border-primary-fixed-dim text-left space-y-4">
            <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>flag</span>
            </div>
            <h4 className="font-serif text-lg md:text-xl font-bold text-primary">Misi Kami</h4>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Kami berusaha keras untuk memberikan hasil kesehatan mulut yang luar biasa melalui rencana perawatan yang dipersonalisasi, edukasi medis berkelanjutan, dan menciptakan lingkungan di mana kenyamanan dan presisi klinis hidup berdampingan secara harmonis.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
