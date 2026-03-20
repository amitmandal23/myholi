<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\DashboardController;

use App\Http\Controllers\AuthController;

// Public Routes
Route::get('/packages', [PackageController::class, 'index']);
Route::get('/activities', [ActivityController::class, 'index']);
Route::get('/destinations', [DestinationController::class, 'index']);
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);

Route::get('/activities/slug/{slug}', [ActivityController::class, 'getBySlug']);
Route::get('/packages/{category}/{slug}', [PackageController::class, 'getByCategoryAndSlug']);
Route::get('/destinations/slug/{slug}', [DestinationController::class, 'getBySlug']);
Route::get('/blogs/slug/{slug}', [BlogController::class, 'getBySlug']);
Route::get('/services/slug/{slug}', [ServiceController::class, 'getBySlug']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    
    // Protected Admin Routes (excluding index for some as they are public)
    Route::apiResource('packages', PackageController::class)->except(['index']);
    Route::apiResource('activities', ActivityController::class)->except(['index']);
    Route::apiResource('destinations', DestinationController::class)->except(['index']);
    Route::apiResource('blogs', BlogController::class)->except(['index']);
    Route::apiResource('services', ServiceController::class)->except(['index']);
    Route::apiResource('testimonials', TestimonialController::class)->except(['index']);
    Route::apiResource('inquiries', InquiryController::class);
});
