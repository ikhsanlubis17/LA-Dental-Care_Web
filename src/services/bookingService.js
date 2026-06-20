import axios from 'axios';

export async function submitBooking(data) {
  const response = await axios.post('/api/bookings', data);
  return response.data;
}
