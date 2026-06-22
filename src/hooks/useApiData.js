import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const responseCache = new Map();
const inflightRequests = new Map();

export default function useApiData(endpoint, initialValue = null, transform = null) {
  const transformRef = useRef(transform);
  const abortRef = useRef(null);
  transformRef.current = transform;

  const [data, setData] = useState(() => {
    const cachedData = responseCache.get(endpoint);
    if (cachedData === undefined) return initialValue;
    return transformRef.current ? transformRef.current(cachedData) : cachedData;
  });
  const [loading, setLoading] = useState(() => !responseCache.has(endpoint));
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const applyTransform = (payload) =>
      transformRef.current ? transformRef.current(payload) : payload;

    if (responseCache.has(endpoint)) {
      const cachedPayload = responseCache.get(endpoint);
      setData(applyTransform(cachedPayload));
      setLoading(false);
      setError(null);
      return;
    }

    if (inflightRequests.has(endpoint)) {
      try {
        const payload = await inflightRequests.get(endpoint);
        setData(applyTransform(payload));
        setError(null);
      } catch (err) {
        setError('Gagal memuat data');
      }
      return;
    }

    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

    const request = axios
      .get(endpoint, { signal: controller.signal })
      .then((response) => {
        const payload = response.data;
        responseCache.set(endpoint, payload);
        return payload;
      })
      .then((payload) => {
        setData(applyTransform(payload));
        setError(null);
        return payload;
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError('Gagal memuat data');
        }
        throw err;
      })
      .finally(() => {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        inflightRequests.delete(endpoint);
        setLoading(false);
      });

    inflightRequests.set(endpoint, request);
    try {
      await request;
    } catch (err) {
      // handled above
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
