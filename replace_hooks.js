const fs = require('fs');
const path = require('path');

const components = [
  {
    file: 'src/components/common/About.jsx',
    api: '/api/about',
    state: 'about',
    hook: 'useAbout'
  },
  {
    file: 'src/components/common/DoctorProfile.jsx',
    api: '/api/doctors',
    state: 'doctors',
    hook: 'useDoctors'
  },
  {
    file: 'src/components/common/Services.jsx',
    api: '/api/services',
    state: 'services',
    hook: 'useServices'
  },
  {
    file: 'src/components/common/Schedule.jsx',
    api: '/api/schedules',
    state: 'schedules',
    hook: 'useSchedule'
  },
  {
    file: 'src/components/common/Gallery.jsx',
    api: '/api/gallery',
    state: 'gallery',
    hook: 'useGallery'
  },
  {
    file: 'src/components/common/Testimonials.jsx',
    api: '/api/testimonials',
    state: 'testimonials',
    hook: 'useTestimonials'
  },
  {
    file: 'src/components/common/FAQ.jsx',
    api: '/api/faqs',
    state: 'faqs',
    hook: 'useFaq'
  },
  {
    file: 'src/components/common/Seo.jsx',
    api: '/api/seo-settings?page=home',
    state: 'seo',
    hook: 'useSeo'
  },
  {
    file: 'src/components/common/FloatingWhatsApp.jsx',
    api: '/api/site-settings',
    state: 'settings',
    hook: 'useSiteSettings'
  },
  {
    file: 'src/components/layout/Navbar.jsx',
    api: '/api/site-settings',
    state: 'settings',
    hook: 'useSiteSettings'
  },
  {
    file: 'src/components/layout/Footer.jsx',
    api: '/api/site-settings',
    state: 'settings',
    hook: 'useSiteSettings'
  }
];

components.forEach(({ file, api, state, hook }) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace hook import
  const hookRegex = new RegExp(`import\\s+${hook}\\s+from\\s+['"].*${hook}['"];?\\n?`);
  content = content.replace(hookRegex, '');
  content = content.replace(/import\s+{\s*[^}]*\s*}\s+from\s+['"].*use[^'"]+['"];?\n?/g, '');

  // Add axios import if not present
  if (!content.includes('import axios')) {
    content = content.replace(/import React[^;]*;?\n/, "$&\nimport axios from 'axios';\n");
  }

  // Use useState, useEffect if not present
  if (content.includes('import React') && !content.includes('useState')) {
    content = content.replace(/import React.*?;/, "import React, { useState, useEffect } from 'react';");
  } else if (!content.includes('import React')) {
    content = "import React, { useState, useEffect } from 'react';\nimport axios from 'axios';\n" + content;
  }

  // Replace hook usage
  let hookUsageRegex;
  if (hook === 'useFaq') {
     hookUsageRegex = /const\s*{\s*faqs,\s*loading,\s*error,\s*refetch\s*}\s*=\s*useFaq\(\);/;
  } else if (hook === 'useAbout') {
    hookUsageRegex = /const\s*{\s*aboutData,\s*advantages,\s*loading,\s*error,\s*refetch\s*}\s*=\s*useAbout\(\);/;
  } else if (state === 'settings') {
    hookUsageRegex = /const\s*{\s*settings,\s*loading,\s*error\s*}\s*=\s*useSiteSettings\(\);/;
  } else {
    hookUsageRegex = new RegExp(`const\\s*{\\s*(?:data:\\s*)?${state}(?:Data)?,\\s*loading,\\s*error(?:,\\s*refetch)?\\s*}\\s*=\\s*${hook}\\(\\);`);
  }

  let axiosLogic = '';
  
  if (hook === 'useAbout') {
    axiosLogic = `
  const [aboutData, setAboutData] = useState(null);
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [aboutRes, advRes] = await Promise.all([
        axios.get('/api/about'),
        axios.get('/api/advantages')
      ]);
      setAboutData(aboutRes.data);
      setAdvantages(advRes.data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = fetchData;
`;
  } else {
    axiosLogic = `
  const [${state === 'settings' ? 'settings' : (hook === 'useFaq' ? 'faqs' : state)}, set${state === 'settings' ? 'Settings' : (hook === 'useFaq' ? 'Faqs' : state.charAt(0).toUpperCase() + state.slice(1))}] = useState(${state === 'settings' || state === 'about' || state === 'seo' ? 'null' : '[]'});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('${api}');
      set${state === 'settings' ? 'Settings' : (hook === 'useFaq' ? 'Faqs' : state.charAt(0).toUpperCase() + state.slice(1))}(response.data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = fetchData;
`;
  }

  content = content.replace(hookUsageRegex, axiosLogic);
  
  // Custom tweaks for edge cases
  if (hook === 'useSeo') {
    content = content.replace(/const { data: seo, loading } = useSeo\(\);/, axiosLogic);
  }

  fs.writeFileSync(file, content);
});

console.log('Hooks replaced');