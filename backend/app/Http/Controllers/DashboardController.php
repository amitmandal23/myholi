<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Activity;
use App\Models\Destination;
use App\Models\Blog;
use App\Models\Inquiry;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'packages_count' => Package::count(),
            'activities_count' => Activity::count(),
            'destinations_count' => Destination::count(),
            'blogs_count' => Blog::count(),
            'inquiries_pending' => Inquiry::where('status', 'pending')->count(),
            'recent_inquiries' => Inquiry::latest()->take(5)->get()
        ]);
    }
}
