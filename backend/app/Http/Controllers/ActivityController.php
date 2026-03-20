<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $query = Activity::latest();
        if ($request->has('menu_only') && $request->menu_only == 'true') {
            $query->where('show_in_menu', true);
        }
        return response()->json($query->get());
    }

    public function getBySlug($slug)
    {
        $activity = Activity::where('slug', $slug)->firstOrFail();
        return response()->json($activity);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'location' => 'required|string',
            ]);

            $slug = Str::slug($request->title);
            $count = Activity::where('slug', $slug)->count();
            if ($count > 0) {
                $slug = $slug . '-' . ($count + 1);
            }

            $activity = new Activity();
            // Exclude 'image' from fill since it's not a column
            $activity->fill($request->except(['image']));
            $activity->slug = $slug;

            // Default value for images if not provided (since it's not nullable)
            if (!$request->has('images')) {
                $activity->images = [];
            }

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                if ($file->isValid()) {
                    $path = $file->store('activities', 'public');
                    $activity->featured_image = '/storage/' . $path;
                } else {
                    \Log::error('Activity image upload failed', [
                        'error' => $file->getErrorMessage(),
                        'originalName' => $file->getClientOriginalName()
                    ]);
                }
            }

            $activity->save();
            return response()->json($activity, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return response()->json(Activity::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        try {
            $activity = Activity::findOrFail($id);
            
            // Prepare data for update
            $data = $request->except(['slug', 'image', 'gallery_images']);
            
            // Handle Gallery Images Update
            $currentImages = $activity->images ?? [];
            if (is_string($currentImages)) {
                $currentImages = json_decode($currentImages, true) ?? [];
            }
            
            if ($request->hasFile('gallery_images')) {
                foreach ($request->file('gallery_images') as $file) {
                    if ($file->isValid()) {
                        $path = $file->store('activities/gallery', 'public');
                        $currentImages[] = '/storage/' . $path;
                    } else {
                        \Log::error('Activity gallery image upload failed', [
                            'error' => $file->getErrorMessage(),
                            'originalName' => $file->getClientOriginalName()
                        ]);
                    }
                }
            }
            // Update images field with merged array
            $data['images'] = $currentImages;

            // Ensure images is not null (fix for integrity constraint)
            if (empty($data['images'])) {
                $data['images'] = [];
            }

            $activity->fill($data);
            
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                if ($file->isValid()) {
                    $path = $file->store('activities', 'public');
                    $activity->featured_image = '/storage/' . $path;
                } else {
                    \Log::error('Activity image upload failed in update', [
                        'error' => $file->getErrorMessage(),
                        'originalName' => $file->getClientOriginalName()
                    ]);
                }
            }

            $activity->save();
            return response()->json($activity);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        Activity::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
