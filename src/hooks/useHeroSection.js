import useApiData from './useApiData';

export default function useHeroSection() {
  return useApiData('/api/hero-section', null);
}
