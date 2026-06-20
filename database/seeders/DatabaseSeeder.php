<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\AdminProfile;
use App\Models\SiteSetting;
use App\Models\HeroSection;
use App\Models\AboutSection;
use App\Models\ClinicAdvantage;
use App\Models\Doctor;
use App\Models\Service;
use App\Models\Schedule;
use App\Models\Faq;
use App\Models\SeoSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin Default
        $adminEmail = env('ADMIN_EMAIL', 'adminklinik01@gmail.com');
        $adminPassword = env('ADMIN_PASSWORD', 'password');
        $adminName = env('ADMIN_NAME', 'Admin Klinik');
        $adminRole = env('ADMIN_ROLE', 'super_admin');

        $user = User::firstOrCreate(
            ['email' => $adminEmail],
            [
                'name' => $adminName,
                'password' => Hash::make($adminPassword),
            ]
        );

        AdminProfile::firstOrCreate(
            ['user_id' => $user->id],
            [
                'full_name' => $adminName,
                'email' => $adminEmail,
                'role' => $adminRole,
            ]
        );

        // Site Settings
        SiteSetting::firstOrCreate(
            ['id' => 1],
            [
                'clinic_name' => 'LA Dental Care Klampok',
                'tagline' => 'Klinik Gigi Terpercaya',
                'primary_phone' => '081234567890',
                'whatsapp_number' => '081234567890',
                'email' => 'hello@ladentalcare.com',
                'address' => 'Klampok',
                'business_hours_summary' => 'Senin - Sabtu: 09.00 - 20.00',
                'copyright_text' => '© 2026 LA Dental Care Klampok. All rights reserved.',
            ]
        );

        // Hero Section
        HeroSection::firstOrCreate(
            ['id' => 1],
            [
                'badge_text' => 'Klinik Gigi Pilihan Anda',
                'headline' => 'Senyum Sehat,',
                'highlighted_text' => 'Hidup Bahagia',
                'description' => 'Kami memberikan pelayanan kesehatan gigi terbaik dengan tenaga profesional.',
                'doctor_name' => 'drg. Lely Apriani Nasution',
                'doctor_title' => 'Dokter Gigi Utama',
                'primary_button_text' => 'Booking Sekarang',
                'secondary_button_text' => 'Pelajari Layanan',
                'is_active' => true,
            ]
        );

        // About Section
        AboutSection::firstOrCreate(
            ['id' => 1],
            [
                'title' => 'Tentang Kami',
                'subtitle' => 'Kenali LA Dental Care Lebih Dekat',
                'description' => 'LA Dental Care adalah klinik gigi yang berdedikasi memberikan senyum terbaik untuk pasien kami.',
                'is_active' => true,
            ]
        );

        // Clinic Advantages
        $advantages = [
            ['title' => 'Dokter Profesional', 'description' => 'Ditangani oleh dokter gigi berpengalaman.', 'icon_name' => 'Stethoscope'],
            ['title' => 'Peralatan Modern', 'description' => 'Menggunakan teknologi dental terbaru.', 'icon_name' => 'Tool'],
            ['title' => 'Lingkungan Nyaman', 'description' => 'Klinik yang bersih dan ramah keluarga.', 'icon_name' => 'Heart'],
        ];
        foreach ($advantages as $adv) {
            ClinicAdvantage::firstOrCreate(['title' => $adv['title']], $adv);
        }

        // Doctor
        $doctor = Doctor::firstOrCreate(
            ['name' => 'drg. Lely Apriani Nasution'],
            [
                'title' => 'Dokter Gigi Umum',
                'description' => 'Berpengalaman dalam berbagai perawatan gigi.',
                'specialization' => 'Dokter Gigi',
                'is_active' => true,
            ]
        );

        // Services
        $services = [
            ['title' => 'Pemeriksaan', 'slug' => 'pemeriksaan', 'description' => 'Konsultasi dan pemeriksaan gigi menyeluruh.'],
            ['title' => 'Tambal', 'slug' => 'tambal', 'description' => 'Restorasi gigi berlubang.'],
            ['title' => 'Scaling', 'slug' => 'scaling', 'description' => 'Pembersihan karang gigi.'],
            ['title' => 'Perawatan Saluran Akar', 'slug' => 'perawatan-saluran-akar', 'description' => 'Perawatan untuk gigi yang infeksinya sudah mencapai saraf.'],
            ['title' => 'Pencabutan', 'slug' => 'pencabutan', 'description' => 'Pencabutan gigi dengan aman dan nyaman.'],
            ['title' => 'Bleaching', 'slug' => 'bleaching', 'description' => 'Pemutihan gigi agar senyum lebih cerah.'],
        ];
        foreach ($services as $srv) {
            Service::firstOrCreate(['slug' => $srv['slug']], $srv);
        }

        // Schedules
        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        foreach ($days as $index => $day) {
            Schedule::firstOrCreate(
                ['doctor_id' => $doctor->id, 'day_name' => $day],
                [
                    'start_time' => '09:00:00',
                    'end_time' => '20:00:00',
                    'is_open' => true,
                    'sort_order' => $index + 1
                ]
            );
        }
        Schedule::firstOrCreate(
            ['doctor_id' => $doctor->id, 'day_name' => 'Minggu'],
            [
                'is_open' => false,
                'note' => 'Tutup',
                'sort_order' => 7
            ]
        );

        // FAQs
        $faqs = [
            ['question' => 'Apakah harus membuat janji terlebih dahulu?', 'answer' => 'Ya, disarankan untuk melakukan booking terlebih dahulu agar tidak menunggu lama.'],
            ['question' => 'Apakah menerima BPJS?', 'answer' => 'Saat ini kami hanya menerima pasien umum dan asuransi tertentu.'],
        ];
        foreach ($faqs as $faq) {
            Faq::firstOrCreate(['question' => $faq['question']], $faq);
        }

        // SEO Settings
        SeoSetting::firstOrCreate(
            ['page_key' => 'home'],
            [
                'meta_title' => 'LA Dental Care Klampok - Klinik Gigi Terpercaya',
                'meta_description' => 'Klinik gigi terbaik di Klampok dengan pelayanan profesional.',
            ]
        );
    }
}