import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Ratih Purwasih',
      rating: 5,
      role: 'Pasien Bleaching & Scaling',
      comment: 'Pengalaman tambal dan bleaching gigi terbaik! Biasanya saya tegang kalau ke dokter gigi, tapi di LA Dental Care suasananya tenang sekali mirip spa. drg. Lely ramah banget dan ngejelasin semua detail perawatannya dengan sabar.'
    },
    {
      name: 'Budi Santoso',
      rating: 5,
      role: 'Pasien Tambal Komposit',
      comment: 'Kliniknya bersih banget, interiornya premium dan peralatannya steril. Pelayanan dokternya informatif, gigi berlubang saya ditambal dengan rapi dan warnanya persis sama dengan gigi asli. Sangat puas dengan hasilnya!'
    },
    {
      name: 'Ahmad Fauzi',
      rating: 5,
      role: 'Pasien Konsultasi Rutin',
      comment: 'Booking jadwal lewat WhatsApp gampang banget dan ga perlu ngantre lama di ruang tunggu. Dokter gigi sangat menghargai waktu pasien. Edukasi giginya sangat jelas dan ga menakut-nakuti.'
    }
  ];

  return (
    <section className="py-20 bg-surface-container-low px-4 md:px-10" id="testimoni">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight mb-4">Senyum Bahagia Pasien Kami</h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            Dengarkan langsung ulasan dari mereka yang telah mempercayakan perawatan kesehatan gigi dan mulutnya kepada kami.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div 
              key={idx}
              className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 ambient-shadow border border-surface-variant/40 hover:border-secondary/30 transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex gap-1 mb-4 text-amber-500">
                  {[...Array(r.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed italic mb-6">
                  "{r.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-surface-variant/20">
                <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-sans text-sm font-bold">
                  {r.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-primary">{r.name}</h4>
                  <span className="font-sans text-xxs text-on-surface-variant font-medium">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
