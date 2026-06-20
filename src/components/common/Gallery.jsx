import React, { useState, useMemo } from 'react';
import useGallery from '../../hooks/useGallery';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorState from '../ui/ErrorState';
import EmptyState from '../ui/EmptyState';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImg, setSelectedImg] = useState(null);

  const { data: galleryItems, loading, error, refetch } = useGallery();

  // Build categories dynamically from data
  const categories = useMemo(() => {
    if (!galleryItems || galleryItems.length === 0) {
      return [{ label: 'Semua', id: 'all' }];
    }
    const cats = [{ label: 'Semua', id: 'all' }];
    const seen = new Set();
    galleryItems.forEach(item => {
      const catId = item.category || 'uncategorized';
      const catLabel = item.category || catId;
      if (!seen.has(catId)) {
        seen.add(catId);
        cats.push({ label: catLabel, id: catId });
      }
    });
    return cats;
  }, [galleryItems]);

  const filteredItems = useMemo(() => {
    if (!galleryItems) return [];
    return activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter(item => (item.category || 'uncategorized') === activeFilter);
  }, [galleryItems, activeFilter]);

  if (loading) return <LoadingSpinner text="Memuat galeri..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!galleryItems || galleryItems.length === 0) {
    return <EmptyState message="Belum ada foto galeri" icon="photo_library" />;
  }

  return (
    <section className="py-20 bg-surface px-4 md:px-10" id="galeri">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight mb-4">Galeri LA Dental Care</h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            Intip fasilitas interior bergaya butik, higienitas ruang perawatan, dan prosedur dental modern yang kami hadirkan di klinik.
          </p>
        </div>

        {/* Filters */}
        {categories.length > 1 && (
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveFilter(c.id)}
                className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  activeFilter === c.id 
                    ? 'bg-secondary text-white shadow-sm' 
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden ambient-shadow border border-surface-variant/40 hover:border-secondary/30 transition-all duration-300 group cursor-pointer text-left"
              onClick={() => setSelectedImg(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-sans text-[10px] tracking-wider font-bold uppercase mb-3">
                  {item.category || 'Galeri'}
                </span>
                <h3 className="font-serif text-base md:text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Image Modal Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <div 
            className="bg-surface rounded-2xl overflow-hidden max-w-3xl w-full ambient-shadow relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute right-4 top-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors duration-200 z-10"
              onClick={() => setSelectedImg(null)}
            >
              <span className="material-symbols-outlined block text-base leading-none">close</span>
            </button>
            <div className="relative aspect-[16/10] bg-black">
              <img 
                src={selectedImg.image_url} 
                alt={selectedImg.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 md:p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-sans text-[10px] tracking-wider font-bold uppercase mb-3">
                  {selectedImg.category || 'Galeri'}
              </span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-primary mb-2">{selectedImg.title}</h3>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">{selectedImg.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}