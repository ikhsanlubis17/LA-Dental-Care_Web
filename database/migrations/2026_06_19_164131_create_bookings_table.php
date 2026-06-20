<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
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
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
