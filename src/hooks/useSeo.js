import useApiData from './useApiData';

export default function useSeo() {
  return useApiData('/api/seo-settings', null, (data) => {
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return data;
  });
}
