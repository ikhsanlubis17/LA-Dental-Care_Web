/**
 * Validate booking form data.
 * Returns { valid: boolean, errors: Record<string, string> }
 */
export function validateBooking(data) {
  const errors = {};

  if (!data.patient_name || !data.patient_name.trim()) {
    errors.patient_name = 'Nama lengkap wajib diisi.';
  }

  if (!data.whatsapp_number || !data.whatsapp_number.trim()) {
    errors.whatsapp_number = 'Nomor WhatsApp wajib diisi.';
  } else if (!isValidWhatsAppNumber(data.whatsapp_number)) {
    errors.whatsapp_number = 'Nomor WhatsApp tidak valid. Gunakan format angka (contoh: 08123456789).';
  }

  if (!data.selected_service_id && !data.selected_service_name) {
    errors.selected_service = 'Silakan pilih layanan perawatan.';
  }

  if (!data.booking_date) {
    errors.booking_date = 'Tanggal booking wajib diisi.';
  }

  if (!data.booking_time) {
    errors.booking_time = 'Jam booking wajib diisi.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate contact form data.
 */
export function validateContact(data) {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Nama wajib diisi.';
  }

  if (!data.whatsapp_number || !data.whatsapp_number.trim()) {
    errors.whatsapp_number = 'Nomor WhatsApp wajib diisi.';
  } else if (!isValidWhatsAppNumber(data.whatsapp_number)) {
    errors.whatsapp_number = 'Nomor WhatsApp tidak valid.';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Pesan wajib diisi.';
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Format email tidak valid.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Basic WhatsApp number validation.
 * Accepts 08xx, 628xx, +628xx — 10-15 digits after stripping non-numeric.
 */
export function isValidWhatsAppNumber(number) {
  const cleaned = number.replace(/[^0-9]/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) return false;
  // Must start with 62 or 08
  if (!/^(62|8)/.test(cleaned)) return false;
  return true;
}

/**
 * Basic email validation.
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Format phone number for wa.me link: strip non-digits, ensure +62 prefix.
 */
export const validateBookingForm = validateBooking;

export function formatPhoneForWa(number) {
  const cleaned = number.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    return '62' + cleaned.slice(1);
  }
  if (cleaned.startsWith('62')) {
    return cleaned;
  }
  return '62' + cleaned;
}