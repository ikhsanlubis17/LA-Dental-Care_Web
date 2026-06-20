import React, { useState } from 'react';
import { submitContact } from '../../services/contactService';
import { validateContact } from '../../lib/validation';
import Toast from '../ui/Toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp_number: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validation = validateContact(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);

    try {
      await submitContact(formData);
      setToast({
        type: 'success',
        message: 'Pesan kontak berhasil dikirim. Tim kami akan segera menghubungi Anda.'
      });
      setFormData({
        name: '',
        email: '',
        whatsapp_number: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      const message = err?.response?.data?.errors
        ? 'Periksa kembali data formulir lalu coba lagi.'
        : err?.message || 'Gagal mengirim pesan. Silakan coba lagi.';
      setToast({ type: 'error', message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow border border-outline-variant/30">
      <div className="mb-6">
        <h3 className="font-serif text-lg font-bold text-primary">Kirim Pesan</h3>
        <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
          Kirim pertanyaan, saran, atau permintaan informasi tambahan melalui formulir berikut.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Nama Lengkap <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Masukkan nama Anda"
            className={`w-full px-4 py-3 rounded-xl bg-surface border-2 transition-all duration-200 text-sm font-sans outline-none
              ${errors.name ? 'border-error text-error focus:border-error' : 'border-outline-variant text-on-surface focus:border-secondary'}`}
          />
          {errors.name && <p className="mt-1 text-xs font-sans text-error font-medium">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Email <span className="text-on-surface-variant text-xs font-normal normal-case">(Opsional)</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="contoh@domain.com"
            className={`w-full px-4 py-3 rounded-xl bg-surface border-2 transition-all duration-200 text-sm font-sans outline-none
              ${errors.email ? 'border-error text-error focus:border-error' : 'border-outline-variant text-on-surface focus:border-secondary'}`}
          />
          {errors.email && <p className="mt-1 text-xs font-sans text-error font-medium">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="whatsapp_number" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Nomor WhatsApp <span className="text-error">*</span>
          </label>
          <input
            type="tel"
            id="whatsapp_number"
            value={formData.whatsapp_number}
            onChange={handleInputChange}
            placeholder="Contoh: 08123456789"
            className={`w-full px-4 py-3 rounded-xl bg-surface border-2 transition-all duration-200 text-sm font-sans outline-none
              ${errors.whatsapp_number ? 'border-error text-error focus:border-error' : 'border-outline-variant text-on-surface focus:border-secondary'}`}
          />
          {errors.whatsapp_number && <p className="mt-1 text-xs font-sans text-error font-medium">{errors.whatsapp_number}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Subjek <span className="text-on-surface-variant text-xs font-normal normal-case">(Opsional)</span>
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Contoh: Pertanyaan Jadwal"
            className="w-full px-4 py-3 rounded-xl bg-surface border-2 border-outline-variant text-on-surface focus:border-secondary transition-all duration-200 text-sm font-sans outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Pesan <span className="text-error">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tuliskan pesan atau pertanyaan Anda..."
            className={`w-full px-4 py-3 rounded-xl bg-surface border-2 transition-all duration-200 text-sm font-sans outline-none resize-none
              ${errors.message ? 'border-error text-error focus:border-error' : 'border-outline-variant text-on-surface focus:border-secondary'}`}
          />
          {errors.message && <p className="mt-1 text-xs font-sans text-error font-medium">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-primary text-white font-sans font-bold text-sm tracking-wider uppercase hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ambient-shadow"
        >
          {submitting ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </form>

      {toast && (
        <div className="mt-4">
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}
