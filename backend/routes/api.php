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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
});

Route::get('/activities/slug/{slug}', [ActivityController::class, 'getBySlug']);
Route::get('/packages/{category}/{slug}', [PackageController::class, 'getByCategoryAndSlug']);
Route::get('/destinations/slug/{slug}', [DestinationController::class, 'getBySlug']);
Route::get('/blogs/slug/{slug}', [BlogController::class, 'getBySlug']);
Route::get('/services/slug/{slug}', [ServiceController::class, 'getBySlug']);
Route::apiResource('packages', PackageController::class);
Route::apiResource('activities', ActivityController::class);
Route::apiResource('destinations', DestinationController::class);
Route::apiResource('blogs', BlogController::class);
Route::apiResource('services', ServiceController::class);
Route::apiResource('testimonials', TestimonialController::class);
Route::apiResource('inquiries', InquiryController::class);
