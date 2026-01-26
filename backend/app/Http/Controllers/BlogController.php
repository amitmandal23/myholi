<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::latest();
        if ($request->has('menu_only') && $request->menu_only == 'true') {
            $query->where('show_in_menu', true);
        }
        return response()->json($query->get());
    }

    public function getBySlug($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        return response()->json($blog);
    }

    public function store(Request $request)
    {
        try {
            $slug = Str::slug($request->title);
            $blog = new Blog();
            $blog->fill($request->all());
            $blog->slug = $slug;

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('blogs', 'public');
                $blog->image = '/storage/' . $path;
            }

            $blog->save();
            return response()->json($blog, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return response()->json(Blog::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        try {
            $blog = Blog::findOrFail($id);
            $blog->fill($request->except('slug'));

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('blogs', 'public');
                $blog->image = '/storage/' . $path;
            }

            $blog->save();
            return response()->json($blog);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        Blog::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
