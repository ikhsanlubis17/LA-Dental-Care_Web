import useApiData from './useApiData';

export default function useGallery() {
  return useApiData('/api/gallery', []);
}
