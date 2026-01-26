<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(Testimonial::latest()->get());
    }

    public function store(Request $request)
    {
        try {
            $testimonial = new Testimonial();
            $testimonial->fill($request->all());

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('testimonials', 'public');
                $testimonial->image = '/storage/' . $path;
            }

            $testimonial->save();
            return response()->json($testimonial, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return response()->json(Testimonial::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);
            $testimonial->fill($request->all());

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('testimonials', 'public');
                $testimonial->image = '/storage/' . $path;
            }

            $testimonial->save();
            return response()->json($testimonial);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        Testimonial::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
