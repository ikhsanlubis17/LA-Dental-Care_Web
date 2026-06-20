<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FrontendController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/site-settings', [FrontendController::class, 'getSiteSettings']);
Route::get('/hero-section', [FrontendController::class, 'getHeroSection']);
Route::get('/about-section', [FrontendController::class, 'getAboutSection']);
Route::get('/clinic-advantages', [FrontendController::class, 'getClinicAdvantages']);
Route::get('/doctors', [FrontendController::class, 'getDoctors']);
Route::get('/services', [FrontendController::class, 'getServices']);
Route::get('/schedules', [FrontendController::class, 'getSchedules']);
Route::get('/special-schedules', [FrontendController::class, 'getSpecialSchedules']);
Route::get('/gallery', [FrontendController::class, 'getGallery']);
Route::get('/testimonials', [FrontendController::class, 'getTestimonials']);
Route::get('/faqs', [FrontendController::class, 'getFaqs']);
Route::get('/seo-settings', [FrontendController::class, 'getSeoSettings']);
Route::post('/bookings', [FrontendController::class, 'storeBooking']);
Route::post('/contact-messages', [FrontendController::class, 'storeContactMessage']);