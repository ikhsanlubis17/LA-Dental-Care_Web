import React, { useState } from 'react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    layanan: '',
    hari: '',
    keluhan: ''
  });
  const [error, setError] = useState('');

  const services = [
    { label: 'Konsultasi Umum', value: 'Konsultasi Umum' },
    { label: 'Pembersihan Karang Gigi (Scaling)', value: 'Pembersihan Karang Gigi (Scaling)' },
    { label: 'Tambal Gigi', value: 'Tambal Gigi' },
    { label: 'Cabut Gigi', value: 'Cabut Gigi' },
    { label: 'Pemasangan Kawat Gigi (Behel)', value: 'Pemasangan Kawat Gigi (Behel)' },
    { label: 'Pemutihan Gigi (Bleaching)', value: 'Pemutihan Gigi (Bleaching)' }
  ];

  const days = [
    { label: 'Senin (09:00 - 20:00)', value: 'Senin' },
    { label: 'Selasa (09:00 - 20:00)', value: 'Selasa' },
    { label: 'Rabu (09:00 - 20:00)', value: 'Rabu' },
    { label: 'Kamis (09:00 - 20:00)', value: 'Kamis' },
    { label: 'Jumat (09:00 - 20:00)', value: 'Jumat' },
    { label: 'Sabtu (09:00 - 17:00)', value: 'Sabtu' }
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nama, whatsapp, layanan, hari, keluhan } = formData;

    if (!nama || !whatsapp || !layanan || !hari) {
      setError('Harap lengkapi semua bidang yang wajib diisi (*).');
      return;
    }

    setError('');

    // Format WhatsApp Message
    const clinicNumber = '6281234567890'; // Mock clinic number
    const message = `Halo LA Dental Care Klampok, saya ingin melakukan booking jadwal kunjungan:\n\n` +
      `• *Nama Lengkap:* ${nama}\n` +
      `• *Nomor WhatsApp:* ${whatsapp}\n` +
      `• *Layanan:* ${layanan}\n` +
      `• *Hari Kedatangan:* ${hari}\n` +
      `• *Keluhan/Catatan:* ${keluhan || '-'}\n\n` +
      `Mohon info ketersediaan jam kunjungan. Terima kasih!`;

    const waUrl = `https://wa.me/${clinicNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 md:p-10 ambient-shadow border border-outline-variant/30 h-full text-left">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-outline-variant/50">
        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
        <h2 className="font-serif text-xl md:text-2xl font-bold text-primary">Form Booking</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs md:text-sm rounded-lg font-sans">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-sans text-xs md:text-sm font-bold text-on-surface" htmlFor="nama">
              Nama Lengkap <span className="text-rose-500">*</span>
            </label>
            <input 
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-xs md:text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors outline-none" 
              id="nama" 
              placeholder="Masukkan nama lengkap Anda" 
              type="text"
              value={formData.nama}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="block font-sans text-xs md:text-sm font-bold text-on-surface" htmlFor="whatsapp">
              Nomor WhatsApp <span className="text-rose-500">*</span>
            </label>
            <input 
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-xs md:text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors outline-none" 
              id="whatsapp" 
              placeholder="Contoh: 08123456789" 
              type="tel"
              value={formData.whatsapp}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-sans text-xs md:text-sm font-bold text-on-surface" htmlFor="layanan">
            Pilih Layanan Perawatan <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select 
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-xs md:text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors outline-none appearance-none cursor-pointer" 
              id="layanan"
              value={formData.layanan}
              onChange={handleInputChange}
            >
              <option value="" disabled>Pilih perawatan yang Anda butuhkan...</option>
              {services.map((s, idx) => (
                <option key={idx} value={s.value}>{s.label}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-sans text-xs md:text-sm font-bold text-on-surface" htmlFor="hari">
            Pilih Hari Kedatangan <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select 
              className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-xs md:text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors outline-none appearance-none cursor-pointer" 
              id="hari"
              value={formData.hari}
              onChange={handleInputChange}
            >
              <option value="" disabled>Pilih hari...</option>
              {days.map((d, idx) => (
                <option key={idx} value={d.value}>{d.label}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-sans text-xs md:text-sm font-bold text-on-surface" htmlFor="keluhan">
            Keluhan / Catatan Khusus
          </label>
          <textarea 
            className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-xs md:text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors outline-none resize-none" 
            id="keluhan" 
            placeholder="Jelaskan singkat keluhan gigi Anda (opsional)" 
            rows="4"
            value={formData.keluhan}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="pt-4">
          <p className="font-sans text-[11px] text-on-surface-variant mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm shrink-0">info</span>
            Mengklik tombol di bawah akan mengarahkan Anda ke WhatsApp untuk melakukan konfirmasi jadwal.
          </p>
          
          <button 
            className="w-full md:w-auto bg-primary text-white hover:bg-secondary font-sans text-xs uppercase tracking-wider font-bold px-8 py-4 rounded-lg transition-all duration-300 deep-shadow flex items-center justify-center gap-3 group"
            type="submit"
          >
            <svg 
              className="w-5 h-5 text-secondary-fixed-dim group-hover:text-white transition-colors duration-300" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
            </svg>
            Lanjutkan ke WhatsApp
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
}
