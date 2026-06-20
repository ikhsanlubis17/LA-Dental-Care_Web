import useApiData from './useApiData';

export default function useDoctors() {
  return useApiData('/api/doctors', []);
}
