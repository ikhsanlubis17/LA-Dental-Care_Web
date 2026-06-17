import React, { useState } from 'react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Bagaimana cara melakukan booking jadwal kunjungan?',
      a: 'Anda dapat mengisi Form Booking di website ini, kemudian Anda akan diarahkan langsung ke WhatsApp klinik kami untuk konfirmasi dan finalisasi jadwal. Anda juga bisa langsung klik tombol WhatsApp melayang untuk berbicara dengan staf admin kami.'
    },
    {
      q: 'Apakah semua tindakan ditangani langsung oleh dokter gigi berlisensi?',
      a: 'Ya, seluruh konsultasi dan tindakan medis di LA Dental Care Klampok ditangani langsung oleh dokter gigi yang berpengalaman dan berlisensi resmi, dipimpin oleh drg. Lely Apriani Nasution.'
    },
    {
      q: 'Apakah pembersihan karang gigi (scaling) terasa sakit?',
      a: 'Pembersihan karang gigi menggunakan alat ultrasonic scaler yang sangat modern. Tindakan ini umumnya minim rasa sakit. Anda mungkin akan merasakan sedikit sensasi ngilu atau getaran ringan di beberapa area karang gigi yang tebal, namun hal tersebut sangat wajar dan aman.'
    },
    {
      q: 'Klinik buka hari apa saja dan jam berapa?',
      a: 'Kami melayani pasien pada hari Senin sampai Jumat dari pukul 09:00 hingga 20:00, serta hari Sabtu dari pukul 09:00 hingga 17:00. Hari Minggu dan hari libur nasional klinik tutup.'
    },
    {
      q: 'Metode pembayaran apa saja yang diterima di klinik?',
      a: 'Kami menerima pembayaran tunai (cash) serta transfer bank (debit) dan QRIS untuk kemudahan transaksi non-tunai Anda.'
    }
  ];

  return (
    <section className="py-20 bg-surface px-4 md:px-10" id="faq">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            Temukan jawaban cepat atas pertanyaan-pertanyaan yang sering ditanyakan mengenai layanan, operasional, dan perawatan gigi di klinik kami.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-surface-container-lowest rounded-xl border border-surface-variant/40 overflow-hidden ambient-shadow transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full flex justify-between items-center p-5 font-serif text-sm md:text-base font-bold text-primary text-left focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className={`material-symbols-outlined text-secondary transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}>
                    expand_more
                  </span>
                </button>

                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-64 opacity-100 border-t border-surface-variant/20' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-5 font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed text-left bg-surface/30">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
