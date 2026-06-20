import useApiData from './useApiData';

export default function useSchedules() {
  return useApiData('/api/schedules', []);
}
