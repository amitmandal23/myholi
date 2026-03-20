<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::latest();
        if ($request->has('menu_only') && $request->menu_only == 'true') {
            $query->where('show_in_menu', true);
        }
        return response()->json($query->get());
    }

    public function getBySlug($slug)
    {
        $service = Service::where('slug', $slug)->firstOrFail();
        return response()->json($service);
    }

    public function store(Request $request)
    {
        try {
            $slug = Str::slug($request->title);
            $service = new Service();
            $service->fill($request->all());
            $service->slug = $slug;

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('services', 'public');
                $service->image = '/storage/' . $path;
            }

            $service->save();
            return response()->json($service, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return response()->json(Service::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        try {
            $service = Service::findOrFail($id);
            $service->fill($request->except('slug'));

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('services', 'public');
                $service->image = '/storage/' . $path;
            }

            $service->save();
            return response()->json($service);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        Service::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
