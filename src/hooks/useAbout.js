import useApiData from './useApiData';

export default function useAbout() {
  return useApiData('/api/about-section', null);
}
