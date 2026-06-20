import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApiData(endpoint, initialValue = null, transform = null) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endpoint);
      const payload = response.data;
      setData(transform ? transform(payload) : payload);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
}
