import React from 'react';
import { Helmet } from 'react-helmet-async';
import useSeo from '../../hooks/useSeo';
import useSiteSettings from '../../hooks/useSiteSettings';

export default function Seo() {
  const { data: seo } = useSeo();
  const { data: settings } = useSiteSettings();

  const clinicName = settings?.clinic_name || 'LA Dental Care Klampok';
  const clinicAddress = settings?.address || '';

  // SEO fields from seo_settings (DB columns)
  const metaTitle = seo?.meta_title || `${clinicName} | Dokter Gigi Profesional di Banjarnegara`;
  const metaDescription = seo?.meta_description || 'Klinik gigi premium LA Dental Care Klampok, Banjarnegara. Layanan perawatan gigi lengkap oleh dokter gigi profesional. Booking online tersedia.';
  const keywords = seo?.meta_keywords || 'klinik gigi, dokter gigi, LA Dental Care, Klampok, Banjarnegara, perawatan gigi, scaling, tambal gigi, cabut gigi';
  const ogTitle = seo?.og_title || metaTitle;
  const ogDescription = seo?.og_description || metaDescription;
  const ogImage = seo?.og_image_url || '/favicon.svg';
  const canonicalUrl = seo?.canonical_url || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '');
  const schemaJson = seo?.schema_json || null;

  // Google Analytics ID from env var
  const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '';

  // Google Search Console verification from site_settings
  const googleSiteVerification = settings?.google_site_verification || '';

  // Build full OG image URL if relative
  const fullOgImage = ogImage?.startsWith('http')
    ? ogImage
    : (typeof window !== 'undefined' ? window.location.origin : '') + ogImage;

  // Structured data (LocalBusiness / Dentist)
  const structuredData = schemaJson || {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: clinicName,
    description: metaDescription,
    image: fullOgImage || '/favicon.svg',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: settings?.primary_phone || '',
    email: settings?.email || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinicAddress,
      addressCountry: 'ID'
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '09:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '09:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '09:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '09:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '17:00' }
    ],
    priceRange: '$$'
  };

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={clinicName} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Google Search Console verification */}
      {googleSiteVerification && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </script>
        </>
      )}
    </Helmet>
  );
}