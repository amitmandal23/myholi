<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Package::latest();

        if ($request->has('menu_only') && $request->menu_only == 'true') {
            $query->where('show_in_menu', true);
        }

        // Search by generic term
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('overview', 'like', "%{$search}%");
            });
        }

        // Filter by Destination
        if ($request->filled('destination') && $request->destination !== 'All Islands') {
            $destinationInput = $request->destination;
            
            // Split by comma to support multiple locations (AND logic)
            // e.g. "Port Blair, Havelock" -> Requires both to be present
            $destinations = array_filter(array_map('trim', explode(',', $destinationInput)));

            // Use logical AND for multiple destinations
            foreach ($destinations as $dest) {
                $query->where(function($q) use ($dest) {
                    $q->where('title', 'like', "%{$dest}%")
                      ->orWhere('overview', 'like', "%{$dest}%")
                      ->orWhere('itinerary', 'like', "%{$dest}%")
                      ->orWhere('hotel_details', 'like', "%{$dest}%");
                });
            }
        }

        // Filter by Category
        if ($request->filled('category') && $request->category !== 'All Types') {
            // Convert "Honeymoon" -> "honeymoon-packages" matching
            // Or just check if category column contains the slugified term
            $categoryTerm = Str::slug($request->category); // e.g. "Honeymoon" -> "honeymoon"
            $query->where('category', 'like', "%{$categoryTerm}%");
        }

        $packages = $query->get();

        // Filter by Duration (PHP Side)
        if ($request->filled('duration') && $request->duration !== 'Any Days') {
            $range = $request->duration;
            
            $packages = $packages->filter(function ($package) use ($range) {
                // Extract days from "5 Nights / 6 Days" or "6 Days"
                $days = 0;
                if (preg_match('/(\d+)\s*Days/i', $package->duration, $matches)) {
                    $days = (int)$matches[1];
                } elseif (preg_match('/(\d+)\s*Nights/i', $package->duration, $matches)) {
                    $days = (int)$matches[1] + 1;
                }

                if ($days === 0) return true; // Keep if format unknown

                if (strpos($range, '+') !== false) {
                    $min = (int)$range;
                    return $days >= $min;
                } elseif (is_numeric($range)) {
                    // "Upto X Days" logic
                    $max = (int)$range;
                    return $days <= $max;
                } elseif (strpos($range, '-') !== false) {
                    // Range logic (backup)
                    [$min, $max] = explode('-', $range);
                    return $days >= (int)$min && $days <= (int)$max;
                }
                return true;
            });
        }

        return response()->json($packages->values());
    }

    public function getByCategoryAndSlug($category, $slug)
    {
        $package = Package::where('category', $category)
                          ->where('slug', $slug)
                          ->firstOrFail();
        return response()->json($package);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'category' => 'required|string',
                'duration' => 'required|string',
                'price' => 'required|numeric',
                'discounted_price' => 'nullable|numeric',
                'overview' => 'required|string',
                'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $slug = Str::slug($request->title);
            $count = Package::where('slug', $slug)->count();
            if ($count > 0) {
                $slug = $slug . '-' . ($count + 1);
            }

            $package = new Package();
            $package->fill($request->all());
            $package->slug = $slug;
            
            // Handle Featured Image
            if ($request->hasFile('featured_image')) {
                $file = $request->file('featured_image');
                if ($file->isValid()) {
                    $path = $file->store('packages', 'public');
                    $package->featured_image = '/storage/' . $path;
                } else {
                    \Log::error('Featured image upload failed', [
                        'error' => $file->getErrorMessage(),
                        'originalName' => $file->getClientOriginalName()
                    ]);
                }
            }

            // Handle Gallery Images
            $galleryImages = [];
            if ($request->hasFile('gallery_images')) {
                foreach ($request->file('gallery_images') as $file) {
                    if ($file->isValid()) {
                        $path = $file->store('packages/gallery', 'public');
                        $galleryImages[] = '/storage/' . $path;
                    } else {
                        \Log::error('Gallery image upload failed', [
                            'error' => $file->getErrorMessage(),
                            'originalName' => $file->getClientOriginalName()
                        ]);
                    }
                }
            }
            $package->images = $galleryImages;

            $package->save();

            return response()->json($package, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $package = Package::find($id);
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }
        return response()->json($package);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $package = Package::find($id);
            if (!$package) {
                return response()->json(['message' => 'Package not found'], 404);
            }

            $data = $request->except(['slug', 'featured_image', 'gallery_images']);
            
            // Handle Featured Image
            if ($request->hasFile('featured_image')) {
                $file = $request->file('featured_image');
                if ($file->isValid()) {
                    $path = $file->store('packages', 'public');
                    $package->featured_image = '/storage/' . $path;
                } else {
                    \Log::error('Featured image upload failed in update', [
                        'error' => $file->getErrorMessage(),
                        'originalName' => $file->getClientOriginalName()
                    ]);
                }
            }

            // Handle Gallery Images Update
            $currentImages = $package->images ?? [];
            if (is_string($currentImages)) {
                $currentImages = json_decode($currentImages, true) ?? [];
            }
            
            if ($request->hasFile('gallery_images')) {
                foreach ($request->file('gallery_images') as $file) {
                    if ($file->isValid()) {
                        $path = $file->store('packages/gallery', 'public');
                        $currentImages[] = '/storage/' . $path;
                    } else {
                        \Log::error('Gallery image upload failed in update', [
                            'error' => $file->getErrorMessage(),
                            'originalName' => $file->getClientOriginalName()
                        ]);
                    }
                }
            }
            // Update images field with merged array
            $data['images'] = $currentImages;

            // Ensure images is not null
            if (empty($data['images'])) {
                $data['images'] = [];
            }

            $package->fill($data);

            $package->save();

            return response()->json($package);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $package = Package::find($id);
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }

        $package->delete();
        return response()->json(['message' => 'Package deleted successfully']);
    }
}
