import useApiData from './useApiData';

export default function useFaqs() {
  return useApiData('/api/faqs', []);
}
