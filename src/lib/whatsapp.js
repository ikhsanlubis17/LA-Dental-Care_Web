import { formatPhoneForWa } from './validation';

/**
 * Generate wa.me link with optional message.
 * @param {string} phoneNumber - WhatsApp number (any format)
 * @param {string} [message] - Prefilled message (optional)
 * @returns {string} Full wa.me URL
 */
export function generateWaLink(phoneNumber, message = '') {
  const formatted = formatPhoneForWa(phoneNumber);
  const url = `https://wa.me/${formatted}`;
  if (message) {
    return `${url}?text=${encodeURIComponent(message)}`;
  }
  return url;
}

/**
 * Build a booking confirmation WhatsApp message.
 */
export function buildBookingMessage({
  patient_name,
  whatsapp_number,
  service_name,
  doctor_name,
  booking_date,
  booking_time,
  complaint
}) {
  const lines = [
    'Halo LA Dental Care Klampok, saya ingin melakukan booking jadwal kunjungan:',
    '',
    `• *Nama Lengkap:* ${patient_name}`,
    `• *Nomor WhatsApp:* ${whatsapp_number}`,
    `• *Layanan:* ${service_name || '-'}`,
    doctor_name ? `• *Dokter:* ${doctor_name}` : null,
    `• *Tanggal:* ${booking_date}`,
    `• *Jam:* ${booking_time}`,
    `• *Keluhan/Catatan:* ${complaint || '-'}`,
    '',
    'Mohon konfirmasi ketersediaan jadwal. Terima kasih!'
  ].filter(Boolean).join('\n');

  return lines;
}

/**
 * Build a service-specific inquiry WhatsApp message.
 */
export function buildServiceMessage(serviceName, whatsappMessage) {
  if (whatsappMessage) {
    return whatsappMessage;
  }
  return `Halo LA Dental Care Klampok! Saya ingin informasi lebih lanjut mengenai ${serviceName}. Mohon infokan jadwal yang tersedia.`;
}

/**
 * Build a contact/inquiry WhatsApp message.
 */
export function buildContactMessage({ name, whatsapp_number, subject, message }) {
  const lines = [
    `Halo LA Dental Care Klampok, saya ${name} ingin menghubungi:`,
    '',
    subject ? `• *Subjek:* ${subject}` : null,
    `• *Pesan:* ${message}`,
    '',
    'Terima kasih.'
  ].filter(Boolean).join('\n');

  return lines;
}

/**
 * Default WhatsApp message for floating button.
 */
export function getDefaultWaMessage(settings) {
  if (settings?.default_whatsapp_message) {
    return settings.default_whatsapp_message;
  }
  return 'Halo LA Dental Care Klampok! Saya ingin melakukan konsultasi awal mengenai perawatan gigi.';
}