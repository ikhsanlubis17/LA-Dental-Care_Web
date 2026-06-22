import React, { useState, useEffect } from 'react';
import { submitBooking } from '../../services/bookingService';
import useServices from '../../hooks/useServices';
import useDoctors from '../../hooks/useDoctors';
import useSiteSettings from '../../hooks/useSiteSettings';
import { validateBookingForm } from '../../lib/validation';
import { generateWaLink } from '../../lib/whatsapp';
import Toast from '../ui/Toast';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp_number: '',
    service_id: '',
    doctor_id: '',
    preferred_date: '',
    preferred_time: '',
    complaint: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const { data: services } = useServices();
  const { data: doctors } = useDoctors();
  const { data: settings } = useSiteSettings();

  const waNumber = settings?.whatsapp_number;
  const serviceList = Array.isArray(services) ? services : [];
  const doctorList = Array.isArray(doctors) ? doctors : [];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  // Map form fields -> submitBooking arguments
  function mapFormToBooking(data) {
    const selectedService = serviceList.find(s => String(s.id) === String(data.service_id));
    const selectedDoctor = doctorList.find(d => String(d.id) === String(data.doctor_id));
    return {
      patient_name: data.name,
      whatsapp_number: data.whatsapp_number,
      selected_service_id: data.service_id || null,
      selected_service_name: selectedService?.title || null,
      selected_doctor_id: selectedDoctor?.id || null,
      selected_doctor_name: selectedDoctor?.name || null,
      booking_date: data.preferred_date || null,
      booking_time: data.preferred_time || null,
      complaint: data.complaint || null
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate using mapped fields
    const mapped = mapFormToBooking(formData);
    const validation = validateBookingForm(mapped);
    if (!validation.valid) {
      // Remap validation errors back to form field names
      const fieldMap = {
        patient_name: 'name',
        whatsapp_number: 'whatsapp_number',
        selected_service: 'service_id',
        booking_date: 'preferred_date',
        booking_time: 'preferred_time',
        complaint: 'complaint'
      };
      const remapped = {};
      for (const [key, msg] of Object.entries(validation.errors)) {
        const formField = fieldMap[key] || key;
        remapped[formField] = msg;
      }
      setErrors(remapped);
      return;
    }

    setSubmitting(true);

    try {
      await submitBooking(mapped);
      setToast({
        type: 'success',
        message: 'Booking berhasil dikirim! Kami akan menghubungi Anda segera.'
      });
      setFormData({
        name: '',
        whatsapp_number: '',
        service_id: '',
        doctor_id: '',
        preferred_date: '',
        preferred_time: '',
        complaint: ''
      });
    } catch (err) {
      setToast({
        type: 'error',
        message: err?.message || 'Gagal mengirim booking. Silakan coba lagi.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDoctor = doctorList.find(d => String(d.id) === String(formData.doctor_id));
  const selectedService = serviceList.find(s => String(s.id) === String(formData.service_id));
  const bookingWaMsg = formData.name
    ? `Halo LA Dental Care Klampok, saya ingin melakukan booking jadwal kunjungan:\n\n• *Nama Lengkap:* ${formData.name}\n• *Nomor WhatsApp:* ${formData.whatsapp_number}\n• *Layanan:* ${selectedService?.title || '-'}\n• *Dokter:* ${selectedDoctor?.name || '-'}\n• *Tanggal:* ${formData.preferred_date || '-'}\n• *Waktu:* ${formData.preferred_time || '-'}\n• *Keluhan/Catatan:* ${formData.complaint || '-'}\n\nMohon info ketersediaan jam kunjungan. Terima kasih!`
    : '';

  const waBookingUrl = waNumber && formData.name
    ? generateWaLink(waNumber, bookingWaMsg)
    : null;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Nama Lengkap <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Masukkan nama lengkap Anda"
            className={`w-full px-4 py-3 rounded-xl bg-surface border-2 transition-all duration-200 text-sm font-sans outline-none
              ${errors.name
                ? 'border-error text-error focus:border-error'
                : 'border-outline-variant text-on-surface focus:border-secondary'
              }`}
          />
          {errors.name && <p className="mt-1 text-xs font-sans text-error font-medium">{errors.name}</p>}
        </div>

        {/* WhatsApp Number */}
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
              ${errors.whatsapp_number
                ? 'border-error text-error focus:border-error'
                : 'border-outline-variant text-on-surface focus:border-secondary'
              }`}
          />
          {errors.whatsapp_number && <p className="mt-1 text-xs font-sans text-error font-medium">{errors.whatsapp_number}</p>}
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service_id" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Pilih Layanan <span className="text-error">*</span>
          </label>
          <select
            id="service_id"
            value={formData.service_id}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl bg-surface border-2 transition-all duration-200 text-sm font-sans outline-none appearance-none
              ${errors.service_id
                ? 'border-error text-error focus:border-error'
                : 'border-outline-variant text-on-surface focus:border-secondary'
              }`}
          >
            <option value="">-- Pilih Layanan --</option>
                {serviceList.map(service => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
          {errors.service_id && <p className="mt-1 text-xs font-sans text-error font-medium">{errors.service_id}</p>}
        </div>

        {/* Doctor */}
        <div>
          <label htmlFor="doctor_id" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Pilih Dokter (Opsional)
          </label>
          <select
            id="doctor_id"
            value={formData.doctor_id}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-surface border-2 border-outline-variant text-on-surface focus:border-secondary transition-all duration-200 text-sm font-sans outline-none appearance-none"
          >
            <option value="">-- Pilih Dokter (Opsional) --</option>
            {doctorList.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="preferred_date" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Tanggal Kunjungan <span className="text-error">*</span>
          </label>
          <input
            type="date"
            id="preferred_date"
            value={formData.preferred_date}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl bg-surface border-2 transition-all duration-200 text-sm font-sans outline-none
              ${errors.preferred_date
                ? 'border-error text-error focus:border-error'
                : 'border-outline-variant text-on-surface focus:border-secondary'
              }`}
          />
          {errors.preferred_date && <p className="mt-1 text-xs font-sans text-error font-medium">{errors.preferred_date}</p>}
        </div>

        {/* Preferred Time */}
        <div>
          <label htmlFor="preferred_time" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Jam Kunjungan <span className="text-error">*</span>
          </label>
          <input
            type="time"
            id="preferred_time"
            value={formData.preferred_time}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-xl bg-surface border-2 transition-all duration-200 text-sm font-sans outline-none
              ${errors.preferred_time
                ? 'border-error text-error focus:border-error'
                : 'border-outline-variant text-on-surface focus:border-secondary'
              }`}
          />
          {errors.preferred_time && <p className="mt-1 text-xs font-sans text-error font-medium">{errors.preferred_time}</p>}
        </div>

        {/* Complaint */}
        <div>
          <label htmlFor="complaint" className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Keluhan / Catatan <span className="text-xs text-on-surface-variant font-normal normal-case">(Opsional, namun disarankan)</span>
          </label>
          <textarea
            id="complaint"
            rows={3}
            value={formData.complaint}
            onChange={handleInputChange}
            placeholder="Deskripsikan keluhan atau keperluan Anda..."
            className="w-full px-4 py-3 rounded-xl bg-surface border-2 border-outline-variant text-on-surface focus:border-secondary transition-all duration-200 text-sm font-sans outline-none resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-sans font-bold text-sm tracking-wider uppercase hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ambient-shadow flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Mengirim...
              </>
            ) : (
              'Kirim Booking'
            )}
          </button>
        </div>

        {/* WhatsApp Redirect after success */}
        {toast?.type === 'success' && waBookingUrl && (
          <div className="pt-2">
            <a
              href={waBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-success text-white font-sans font-bold text-sm tracking-wider uppercase hover:bg-success/90 active:scale-[0.98] transition-all duration-200 ambient-shadow flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Konfirmasi via WhatsApp
            </a>
          </div>
        )}
      </form>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}