import React from 'react';
import useDoctors from '../../hooks/useDoctors';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorState from '../ui/ErrorState';

export default function DoctorProfile() {
  const { data: doctors, loading, error, refetch } = useDoctors();
  const doctor = doctors && doctors.length > 0 ? doctors[0] : null;

  if (loading) return <LoadingSpinner text="Memuat profil dokter..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!doctor) return null;

  const credentials = [
    { icon: 'school', title: 'Pendidikan', desc: doctor.education || 'Lulusan Kedokteran Gigi Universitas terkemuka dengan predikat cumlaude' },
    { icon: 'workspace_premium', title: 'Sertifikasi', desc: doctor.specialization || 'Anggota Persatuan Dokter Gigi Indonesia (PDGI) & Bersertifikasi Estetik' },
    { icon: 'psychology', title: 'Keahlian Khusus', desc: doctor.experience || 'Spesialis Restorasi Estetik Gigi, Bleaching, Scaling, & Konsultasi Preventif' }
  ];

  return (
    <section className="py-20 bg-surface-container-lowest px-4 md:px-10" id="dokter">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Doctor Image Block (4 cols) */}
          <div className="lg:col-span-5 relative w-full aspect-[4/5] rounded-2xl overflow-hidden ambient-shadow max-w-md mx-auto">
            <img 
              alt={doctor.name || 'Doctor profile portrait'} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              src={doctor.photo_url || '/fotodokter.png'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white text-left">
              <h4 className="font-serif text-lg font-bold">{doctor.name}</h4>
              <p className="font-sans text-xs text-secondary-fixed">{doctor.title || 'Dokter Gigi Utama'}</p>
            </div>
          </div>
          
          {/* Professional Details Block (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold leading-tight tracking-tight">
              {doctor.name}
            </h2>
            
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              {doctor.description || `Drg. ${doctor.name} adalah dokter gigi penanggung jawab di LA Dental Care Klampok. Beliau berkomitmen untuk memberikan pelayanan dental yang penuh perhatian, informatif, dan disesuaikan dengan kebutuhan unik setiap pasien.`}
            </p>
            
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-surface-variant/40">
              <div className="text-center">
                <span className="block font-serif text-2xl md:text-3xl text-secondary font-bold">8+</span>
                <span className="block font-sans text-xxs md:text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Tahun Pengalaman</span>
              </div>
              <div className="text-center border-x border-surface-variant/40">
                <span className="block font-serif text-2xl md:text-3xl text-secondary font-bold">5K+</span>
                <span className="block font-sans text-xxs md:text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Pasien Tersenyum</span>
              </div>
              <div className="text-center">
                <span className="block font-serif text-2xl md:text-3xl text-secondary font-bold">99%</span>
                <span className="block font-sans text-xxs md:text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Tingkat Kepuasan</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {credentials.map((c, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined">{c.icon}</span>
                  </div>
                  <div>
                    <h5 className="font-sans text-xs md:text-sm font-bold text-primary">{c.title}</h5>
                    <p className="font-sans text-xs text-on-surface-variant">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
