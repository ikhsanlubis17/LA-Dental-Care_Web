import React, { useState } from 'react';
import useFaqs from '../../hooks/useFaqs';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorState from '../ui/ErrorState';
import EmptyState from '../ui/EmptyState';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const { data: dbFaqs, loading, error, refetch } = useFaqs();

  if (loading) return <LoadingSpinner text="Memuat FAQ..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  // Fallback static FAQ if DB empty
  const faqs = (dbFaqs && dbFaqs.length > 0) ? dbFaqs : [
    {
      id: 1,
      question: 'Bagaimana cara melakukan booking jadwal kunjungan?',
      answer: 'Anda dapat mengisi Form Booking di website ini, kemudian Anda akan diarahkan langsung ke WhatsApp klinik kami untuk konfirmasi dan finalisasi jadwal. Anda juga bisa langsung klik tombol WhatsApp melayang untuk berbicara dengan staf admin kami.'
    },
    {
      id: 2,
      question: 'Apakah semua tindakan ditangani langsung oleh dokter gigi berlisensi?',
      answer: 'Ya, seluruh konsultasi dan tindakan medis di LA Dental Care Klampok ditangani langsung oleh dokter gigi yang berpengalaman dan berlisensi resmi, dipimpin oleh drg. Lely Apriani Nasution.'
    },
    {
      id: 3,
      question: 'Apakah pembersihan karang gigi (scaling) terasa sakit?',
      answer: 'Pembersihan karang gigi menggunakan alat ultrasonic scaler yang sangat modern. Tindakan ini umumnya minim rasa sakit. Anda mungkin akan merasakan sedikit sensasi ngilu atau getaran ringan di beberapa area karang gigi yang tebal, namun hal tersebut sangat wajar dan aman.'
    },
    {
      id: 4,
      question: 'Klinik buka hari apa saja dan jam berapa?',
      answer: 'Kami melayani pasien pada hari Senin sampai Jumat dari pukul 09:00 hingga 20:00, serta hari Sabtu dari pukul 09:00 hingga 17:00. Hari Minggu dan hari libur nasional klinik tutup.'
    },
    {
      id: 5,
      question: 'Metode pembayaran apa saja yang diterima di klinik?',
      answer: 'Kami menerima pembayaran tunai (cash) serta transfer bank (debit) dan QRIS untuk kemudahan transaksi non-tunai Anda.'
    }
  ];

  if (faqs.length === 0) {
    return <EmptyState message="Belum ada FAQ" icon="help" />;
  }

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
            const question = faq.question || faq.q;
            const answer = faq.answer || faq.a;
            return (
              <div 
                key={faq.id || idx}
                className="bg-surface-container-lowest rounded-xl border border-surface-variant/40 overflow-hidden ambient-shadow transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full flex justify-between items-center p-5 font-serif text-sm md:text-base font-bold text-primary text-left focus:outline-none"
                >
                  <span>{question}</span>
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
                    {answer}
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