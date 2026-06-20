<?php

$migrationsDir = __DIR__ . '/database/migrations';
$files = scandir($migrationsDir);

$schemas = [
    'create_admin_profiles_table' => <<<'PHP'
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('full_name');
            $table->string('email');
            $table->enum('role', ['super_admin', 'admin', 'staff', 'editor'])->default('admin');
            $table->string('avatar_url')->nullable();
            $table->timestamps();
PHP,
    'create_site_settings_table' => <<<'PHP'
            $table->id();
            $table->string('clinic_name')->nullable();
            $table->string('tagline')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('favicon_url')->nullable();
            $table->string('primary_phone')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->text('google_maps_url')->nullable();
            $table->text('google_maps_embed')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('tiktok_url')->nullable();
            $table->string('youtube_url')->nullable();
            $table->text('default_whatsapp_message')->nullable();
            $table->text('business_hours_summary')->nullable();
            $table->string('copyright_text')->nullable();
            $table->timestamps();
PHP,
    'create_hero_sections_table' => <<<'PHP'
            $table->id();
            $table->string('badge_text')->nullable();
            $table->string('headline')->nullable();
            $table->string('highlighted_text')->nullable();
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->string('doctor_name')->nullable();
            $table->string('doctor_title')->nullable();
            $table->string('primary_button_text')->nullable();
            $table->string('primary_button_link')->nullable();
            $table->string('secondary_button_text')->nullable();
            $table->string('secondary_button_link')->nullable();
            $table->string('stat_1_label')->nullable();
            $table->string('stat_1_value')->nullable();
            $table->string('stat_2_label')->nullable();
            $table->string('stat_2_value')->nullable();
            $table->string('stat_3_label')->nullable();
            $table->string('stat_3_value')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
PHP,
    'create_about_sections_table' => <<<'PHP'
            $table->id();
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('story_headline')->nullable();
            $table->text('story_text')->nullable();
            $table->string('vision_title')->nullable();
            $table->text('vision_text')->nullable();
            $table->string('mission_title')->nullable();
            $table->text('mission_text')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
PHP,
    'create_clinic_advantages_table' => <<<'PHP'
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('icon_name')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
PHP,
    'create_doctors_table' => <<<'PHP'
            $table->id();
            $table->string('name');
            $table->string('title')->nullable();
            $table->string('photo_url')->nullable();
            $table->text('description')->nullable();
            $table->text('education')->nullable();
            $table->text('experience')->nullable();
            $table->string('specialization')->nullable();
            $table->string('license_number')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
PHP,
    'create_services_table' => <<<'PHP'
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon_name')->nullable();
            $table->string('image_url')->nullable();
            $table->string('category')->nullable();
            $table->decimal('price_start_from', 12, 2)->nullable();
            $table->string('duration')->nullable();
            $table->text('whatsapp_message')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
PHP,
    'create_schedules_table' => <<<'PHP'
            $table->id();
            $table->foreignId('doctor_id')->constrained('doctors')->cascadeOnDelete();
            $table->string('day_name');
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->boolean('is_open')->default(true);
            $table->string('note')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
PHP,
    'create_special_schedules_table' => <<<'PHP'
            $table->id();
            $table->foreignId('doctor_id')->nullable()->constrained('doctors')->cascadeOnDelete();
            $table->date('date');
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->enum('status', ['open', 'closed', 'limited', 'leave', 'holiday'])->default('closed');
            $table->string('note')->nullable();
            $table->timestamps();
PHP,
    'create_galleries_table' => <<<'PHP'
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('image_url');
            $table->enum('category', ['clinic_room', 'dental_unit', 'doctor', 'treatment', 'before_after', 'activity'])->nullable();
            $table->string('alt_text')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
PHP,
    'create_testimonials_table' => <<<'PHP'
            $table->id();
            $table->string('patient_name');
            $table->string('patient_avatar_url')->nullable();
            $table->integer('rating')->default(5);
            $table->string('treatment_name')->nullable();
            $table->text('testimonial_text');
            $table->enum('status', ['pending', 'published', 'hidden'])->default('pending');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
PHP,
    'create_faqs_table' => <<<'PHP'
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->string('category')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
PHP,
    'create_bookings_table' => <<<'PHP'
            $table->id();
            $table->string('patient_name');
            $table->string('whatsapp_number');
            $table->foreignId('selected_service_id')->nullable()->constrained('services')->nullOnDelete();
            $table->string('selected_service_name')->nullable();
            $table->foreignId('selected_doctor_id')->nullable()->constrained('doctors')->nullOnDelete();
            $table->string('selected_doctor_name')->nullable();
            $table->date('booking_date')->nullable();
            $table->time('booking_time')->nullable();
            $table->text('complaint')->nullable();
            $table->enum('status', ['new', 'processing', 'confirmed', 'completed', 'cancelled', 'no_show'])->default('new');
            $table->text('admin_note')->nullable();
            $table->timestamps();
PHP,
    'create_contact_messages_table' => <<<'PHP'
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->enum('status', ['unread', 'read', 'replied', 'archived'])->default('unread');
            $table->text('admin_note')->nullable();
            $table->timestamps();
PHP,
    'create_media_files_table' => <<<'PHP'
            $table->id();
            $table->string('file_name');
            $table->string('file_url');
            $table->string('file_type')->nullable();
            $table->integer('file_size')->nullable();
            $table->string('alt_text')->nullable();
            $table->string('folder')->nullable();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
PHP,
    'create_seo_settings_table' => <<<'PHP'
            $table->id();
            $table->string('page_key')->unique();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->string('og_image_url')->nullable();
            $table->string('canonical_url')->nullable();
            $table->json('schema_json')->nullable();
            $table->timestamps();
PHP,
    'create_activity_logs_table' => <<<'PHP'
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action');
            $table->string('entity_type')->nullable();
            $table->unsignedBigInteger('entity_id')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
PHP,
];

foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;
    
    foreach ($schemas as $key => $schema) {
        if (strpos($file, $key) !== false) {
            $path = $migrationsDir . '/' . $file;
            $content = file_get_contents($path);
            
            // Replace the inside of the up() method
            $pattern = '/(Schema::create\(\'[^\']+\', function \(Blueprint \$table\) \{)(.*?)(\}\);)/s';
            $replacement = "$1\n$schema\n        $3";
            $newContent = preg_replace($pattern, $replacement, $content);
            
            file_put_contents($path, $newContent);
            echo "Updated $file\n";
            break;
        }
    }
}