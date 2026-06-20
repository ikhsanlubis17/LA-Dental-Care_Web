import useApiData from './useApiData';

export default function useTestimonials() {
  return useApiData('/api/testimonials', []);
}
