import React, { useState, useEffect } from 'react';

export default function Schedule({ onNavClick }) {
  const [currentStatus, setCurrentStatus] = useState({ isOpen: false, message: '' });

  const schedules = [
    { day: 'Senin', time: '09:00 - 20:00', note: 'Sesi Siang & Sore' },
    { day: 'Selasa', time: '09:00 - 20:00', note: 'Sesi Siang & Sore' },
    { day: 'Rabu', time: '09:00 - 20:00', note: 'Sesi Siang & Sore' },
    { day: 'Kamis', time: '09:00 - 20:00', note: 'Sesi Siang & Sore' },
    { day: 'Jumat', time: '09:00 - 20:00', note: 'Sesi Siang & Sore' },
    { day: 'Sabtu', time: '09:00 - 17:00', note: 'Sesi Akhir Pekan' },
    { day: 'Minggu', time: 'Tutup', note: 'Hari Libur Klinik', isClosed: true }
  ];

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      // Adjust timezone if necessary, but using client local time is standard.
      const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const timeVal = hour + minutes / 60;

      if (day === 0) {
        setCurrentStatus({ isOpen: false, message: 'Klinik Tutup (Hari Minggu)' });
      } else if (day === 6) {
        // Saturday 09:00 - 17:00
        if (timeVal >= 9 && timeVal < 17) {
          setCurrentStatus({ isOpen: true, message: `Buka - Tutup Jam 17:00` });
        } else {
          setCurrentStatus({ isOpen: false, message: 'Klinik Tutup (Buka Sabtu 09:00 - 17:00)' });
        }
      } else {
        // Monday - Friday 09:00 - 20:00
        if (timeVal >= 9 && timeVal < 20) {
          setCurrentStatus({ isOpen: true, message: `Buka - Tutup Jam 20:00` });
        } else {
          setCurrentStatus({ isOpen: false, message: 'Klinik Tutup (Buka Senin-Jumat 09:00 - 20:00)' });
        }
      }
    };

    checkOpenStatus();
    const timer = setInterval(checkOpenStatus, 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-surface-container-low px-4 md:px-10" id="jadwal">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight mb-4">Jadwal Praktik Dokter Gigi</h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            Pilih waktu konsultasi yang sesuai dengan aktivitas harian Anda. Kami menyarankan untuk melakukan booking terlebih dahulu agar meminimalisir waktu tunggu.
          </p>
        </div>

        {/* Live Status Alert */}
        <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 ${
          currentStatus.isOpen 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center gap-3 text-left">
            <span className={`w-3.5 h-3.5 rounded-full ${
              currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
            }`}></span>
            <div>
              <span className="font-sans text-xs uppercase tracking-wider font-bold block">Status Klinik Sekarang:</span>
              <span className="font-sans text-sm font-semibold">{currentStatus.message}</span>
            </div>
          </div>
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); onNavClick('booking'); }}
            className={`px-6 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
              currentStatus.isOpen
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                : 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
            }`}
          >
            Booking Sekarang
          </a>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-surface rounded-2xl p-6 md:p-8 ambient-shadow border border-surface-variant/40 text-left">
            <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">medical_information</span>
              drg. Lely Apriani Nasution
            </h3>
            
            <div className="space-y-4">
              {schedules.map((s, idx) => (
                <div 
                  key={idx} 
                  className={`flex justify-between items-center py-3 border-b border-surface-variant/30 last:border-0 ${
                    s.isClosed ? 'text-on-surface-variant/60' : 'text-on-surface'
                  }`}
                >
                  <div className="text-left">
                    <span className="font-sans text-sm font-bold block">{s.day}</span>
                    <span className="font-sans text-xxs text-on-surface-variant font-medium">{s.note}</span>
                  </div>
                  <span className={`font-sans text-sm font-semibold ${
                    s.isClosed ? 'text-rose-600' : 'text-secondary'
                  }`}>
                    {s.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info / Guidelines */}
          <div className="flex flex-col justify-between gap-6 text-left">
            <div className="bg-surface rounded-2xl p-6 md:p-8 ambient-shadow border border-surface-variant/40">
              <h4 className="font-serif text-base md:text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">info</span>
                Ketentuan Janji Temu
              </h4>
              <ul className="space-y-4 font-sans text-xs md:text-sm text-on-surface-variant">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">1.</span>
                  <span>Harap datang <strong>15 menit</strong> sebelum jadwal yang ditentukan untuk melakukan pendaftaran ulang.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">2.</span>
                  <span>Jika ingin melakukan pembatalan atau perubahan jadwal, harap konfirmasi maksimal <strong>2 jam</strong> sebelumnya.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">3.</span>
                  <span>Reservasi mendadak di luar jam operasional dapat dilakukan via WhatsApp darurat tergantung ketersediaan dokter gigi.</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary/5 rounded-2xl p-6 md:p-8 border border-secondary/20 relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[100px] text-secondary/10 pointer-events-none select-none">
                contact_support
              </span>
              <div className="relative z-10">
                <h4 className="font-serif text-base md:text-lg font-bold text-primary mb-2">Ada Pertanyaan?</h4>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Jika Anda tidak yakin dengan layanan yang dibutuhkan atau ingin menanyakan ketersediaan dokter secara real-time, silakan hubungi tim kami.
                </p>
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary text-white hover:bg-secondary/90 px-6 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 inline-flex items-center gap-2 ambient-shadow"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  Tanya Kami di WA
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
