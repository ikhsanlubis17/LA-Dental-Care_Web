<?php
$resources = ['SiteSetting', 'HeroSection', 'AboutSection', 'ClinicAdvantage', 'Doctor', 'Service', 'Schedule', 'SpecialSchedule', 'Gallery', 'Testimonial', 'Faq', 'Booking', 'ContactMessage', 'MediaFile', 'SeoSetting', 'ActivityLog', 'User', 'AdminProfile'];
foreach ($resources as $resource) {
    echo "Creating resource for $resource...\n";
    exec('php artisan make:filament-resource ' . $resource . ' --generate -q');
}
echo "Done.\n";