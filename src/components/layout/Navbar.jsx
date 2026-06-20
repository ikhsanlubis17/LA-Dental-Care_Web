import React, { useState, useEffect } from 'react';
import useSiteSettings from '../../hooks/useSiteSettings';

export default function Navbar({ activeSection, onNavClick }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: settings } = useSiteSettings();

  const clinicName = settings?.clinic_name || 'LA Dental Care Klampok';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Tentang Kami', id: 'tentang' },
    { label: 'Layanan', id: 'layanan' },
    { label: 'Jadwal Dokter', id: 'jadwal' },
    { label: 'Galeri', id: 'galeri' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Kontak', id: 'kontak' }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-outline-variant/30 py-3' 
          : 'bg-surface/90 backdrop-blur-md py-4'
      }`}>
        <div className="flex justify-between items-center px-4 md:px-10 max-w-7xl mx-auto w-full">
          <a 
            href="#beranda" 
            onClick={(e) => { e.preventDefault(); onNavClick('beranda'); }}
            className="font-serif text-lg md:text-xl font-bold text-primary tracking-tight"
          >
            {clinicName}
          </a>
          
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex gap-6 items-center">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); onNavClick(item.id); }}
                className={`text-xs uppercase tracking-wider font-semibold transition-all duration-300 pb-1 border-b-2 ${
                  activeSection === item.id 
                    ? 'text-secondary border-secondary' 
                    : 'text-on-surface/80 border-transparent hover:text-secondary hover:border-secondary/30'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a 
            href="#booking"
            onClick={(e) => { e.preventDefault(); onNavClick('booking'); }}
            className="hidden lg:inline-flex bg-secondary text-white hover:bg-secondary/90 px-6 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 ambient-shadow"
          >
            Booking Sekarang
          </a>

          {/* Mobile Hamburger Button */}
          <button 
            aria-label="Toggle Menu" 
            className="lg:hidden text-on-surface p-1"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-primary/20 backdrop-blur-xs z-50 lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Side Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-surface shadow-2xl z-50 lg:hidden transform transition-transform duration-300 flex flex-col h-full py-6 px-4 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <h2 className="font-serif text-lg font-bold text-primary">{clinicName}</h2>
            <p className="text-xxs text-on-surface-variant uppercase tracking-widest">Premium Dental Clinic</p>
          </div>
          <button className="text-on-surface" onClick={() => setIsMobileOpen(false)}>
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavClick(item.id);
                setIsMobileOpen(false);
              }}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg font-sans text-sm font-semibold transition-transform duration-200 hover:translate-x-1 ${
                activeSection === item.id 
                  ? 'bg-secondary-container text-on-secondary-container' 
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {item.id === 'beranda' ? 'home' : 
                 item.id === 'tentang' ? 'info' : 
                 item.id === 'layanan' ? 'medical_services' : 
                 item.id === 'jadwal' ? 'calendar_month' : 
                 item.id === 'galeri' ? 'photo_library' : 
                 item.id === 'faq' ? 'help' : 'chat'}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <a 
          href="#booking"
          onClick={(e) => {
            e.preventDefault();
            onNavClick('booking');
            setIsMobileOpen(false);
          }}
          className="mt-auto bg-secondary text-white hover:bg-secondary/90 py-3 px-4 rounded-lg w-full flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider ambient-shadow"
        >
          <span className="material-symbols-outlined text-sm">chat</span>
          Booking via WhatsApp
        </a>
      </aside>
    </>
  );
}