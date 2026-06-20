import axios from 'axios';

export async function submitContact(data) {
  const response = await axios.post('/api/contact-messages', data);
  return response.data;
}
