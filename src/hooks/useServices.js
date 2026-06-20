import useApiData from './useApiData';

export default function useServices() {
  return useApiData('/api/services', []);
}
