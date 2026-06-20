import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/common/Hero';
import About from '../components/common/About';
import DoctorProfile from '../components/common/DoctorProfile';
import Services from '../components/common/Services';
import Schedule from '../components/common/Schedule';
import Gallery from '../components/common/Gallery';
import Testimonials from '../components/common/Testimonials';
import FAQ from '../components/common/FAQ';
import Contact from '../components/common/Contact';
import ContactForm from '../components/common/ContactForm';
import BookingForm from '../components/common/BookingForm';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import Seo from '../components/common/Seo';
import Footer from '../components/layout/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('beranda');

  // Scroll Spy to highlight the active navbar link
  useEffect(() => {
    const sections = ['beranda', 'tentang', 'layanan', 'jadwal', 'galeri', 'faq', 'kontak'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for navbar height

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);

    // Smooth scroll to the section
    const targetEl = document.getElementById(sectionId === 'booking' ? 'kontak-booking' : sectionId);
    if (targetEl) {
      const offset = 80; // height of the fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-background text-on-surface antialiased font-sans">
      {/* SEO Metadata */}
      <Seo />

      {/* Navigation Bar */}
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Main Landing Sections */}
      <main className="w-full">
        {/* Hero Section */}
        <Hero onNavClick={handleNavClick} />

        {/* Tentang Kami (About) Section */}
        <About />

        {/* Doctor Profile Section */}
        <DoctorProfile />

        {/* Services Section */}
        <Services onNavClick={handleNavClick} />

        {/* Practice Schedule Section */}
        <Schedule onNavClick={handleNavClick} />

        {/* Gallery Section */}
        <Gallery />

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Booking Form & Contact Information Section */}
        <section className="py-20 bg-pattern px-4 md:px-10 border-t border-surface-variant/40" id="kontak">
          <div className="max-w-7xl mx-auto" id="kontak-booking">
            {/* Section Header */}
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight mb-4">Kontak & Reservasi</h2>
              <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                Jadwalkan kunjungan Anda bersama tim dokter gigi profesional kami. Kenyamanan dan kesehatan gigi Anda adalah prioritas utama.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Booking Column */}
              <div className="lg:col-span-7" id="booking">
                <BookingForm />
              </div>

              {/* Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <Contact />
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer onNavClick={handleNavClick} />

      {/* Floating WhatsApp Bubble */}
      <FloatingWhatsApp />
    </div>
  );
}