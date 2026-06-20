import useApiData from './useApiData';

export default function useSiteSettings() {
  return useApiData('/api/site-settings', null);
}
