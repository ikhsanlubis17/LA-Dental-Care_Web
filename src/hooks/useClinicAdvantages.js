import useApiData from './useApiData';

export function useClinicAdvantages() {
  return useApiData('/api/clinic-advantages', []);
}
