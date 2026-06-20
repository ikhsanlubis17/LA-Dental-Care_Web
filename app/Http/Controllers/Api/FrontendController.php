<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SiteSetting;
use App\Models\HeroSection;
use App\Models\AboutSection;
use App\Models\ClinicAdvantage;
use App\Models\Doctor;
use App\Models\Service;
use App\Models\Schedule;
use App\Models\SpecialSchedule;
use App\Models\Gallery;
use App\Models\Testimonial;
use App\Models\Faq;
use App\Models\SeoSetting;
use App\Models\Booking;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Validator;

class FrontendController extends Controller
{
    public function getSiteSettings()
    {
        return response()->json(SiteSetting::first());
    }

    public function getHeroSection()
    {
        return response()->json(HeroSection::where('is_active', true)->latest()->first());
    }

    public function getAboutSection()
    {
        return response()->json(AboutSection::where('is_active', true)->latest()->first());
    }

    public function getClinicAdvantages()
    {
        return response()->json(ClinicAdvantage::where('is_active', true)->orderBy('sort_order')->get());
    }

    public function getDoctors()
    {
        return response()->json(Doctor::where('is_active', true)->orderBy('sort_order')->get());
    }

    public function getServices()
    {
        return response()->json(Service::where('is_active', true)->orderBy('sort_order')->get());
    }

    public function getSchedules()
    {
        return response()->json(Schedule::orderBy('sort_order')->get());
    }

    public function getSpecialSchedules()
    {
        return response()->json(SpecialSchedule::where('date', '>=', today())->orderBy('date')->get());
    }

    public function getGallery()
    {
        return response()->json(Gallery::where('is_active', true)->orderBy('sort_order')->get());
    }

    public function getTestimonials()
    {
        return response()->json(Testimonial::where('status', 'published')->orderBy('sort_order')->get());
    }

    public function getFaqs()
    {
        return response()->json(Faq::where('is_active', true)->orderBy('sort_order')->get());
    }

    public function getSeoSettings()
    {
        return response()->json(SeoSetting::all());
    }

    public function storeBooking(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_name' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|max:20',
            'selected_service_id' => 'nullable|exists:services,id',
            'selected_service_name' => 'nullable|string|max:255',
            'selected_doctor_id' => 'nullable|exists:doctors,id',
            'selected_doctor_name' => 'nullable|string|max:255',
            'booking_date' => 'required|date',
            'booking_time' => 'required|string',
            'complaint' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking = Booking::create([
            'patient_name' => $request->patient_name,
            'whatsapp_number' => $request->whatsapp_number,
            'selected_service_id' => $request->selected_service_id,
            'selected_service_name' => $request->selected_service_name,
            'selected_doctor_id' => $request->selected_doctor_id,
            'selected_doctor_name' => $request->selected_doctor_name,
            'booking_date' => $request->booking_date,
            'booking_time' => $request->booking_time,
            'complaint' => $request->complaint,
            'status' => 'new',
        ]);

        return response()->json(['message' => 'Booking created successfully', 'data' => $booking], 201);
    }

    public function storeContactMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'whatsapp_number' => 'required|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $contactMessage = ContactMessage::create([
            'name' => $request->name,
            'email' => $request->email,
            'whatsapp_number' => $request->whatsapp_number,
            'subject' => $request->subject,
            'message' => $request->message,
            'status' => 'unread',
        ]);

        return response()->json(['message' => 'Contact message created successfully', 'data' => $contactMessage], 201);
    }
}