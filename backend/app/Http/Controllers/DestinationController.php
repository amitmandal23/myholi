<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DestinationController extends Controller
{
    public function index(Request $request)
    {
        $query = Destination::latest();
        if ($request->has('menu_only') && $request->menu_only == 'true') {
            $query->where('show_in_menu', true);
        }
        return response()->json($query->get());
    }

    public function getBySlug($slug)
    {
        $destination = Destination::where('slug', $slug)->firstOrFail();
        return response()->json($destination);
    }

    public function store(Request $request)
    {
        try {
            $slug = Str::slug($request->title);
            $destination = new Destination();
            $destination->fill($request->all());
            $destination->slug = $slug;

            if ($request->hasFile('hero_image')) {
                $path = $request->file('hero_image')->store('destinations', 'public');
                $destination->hero_image = '/storage/' . $path;
            }
            
            // Ensure JSON fields are valid if passed as strings (though Frontend sends FormData)
            // If coming from FormData, they might need json_decode if sent as stringified JSON
            // But fill() handles them if they are in the request. 
            // We should ensure defaults if not present
            if (!$request->has('images')) $destination->images = [];
            if (!$request->has('attractions')) $destination->attractions = [];

            $destination->save();
            return response()->json($destination, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return response()->json(Destination::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        try {
            $destination = Destination::findOrFail($id);
            $destination->fill($request->except('slug'));

            if ($request->hasFile('hero_image')) {
                $path = $request->file('hero_image')->store('destinations', 'public');
                $destination->hero_image = '/storage/' . $path;
            }

            $destination->save();
            return response()->json($destination);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        Destination::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
