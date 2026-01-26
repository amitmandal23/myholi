<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    public function index()
    {
        return response()->json(Inquiry::latest()->get());
    }

    public function store(Request $request)
    {
        try {
            $inquiry = Inquiry::create($request->all());
            return response()->json($inquiry, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return response()->json(Inquiry::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        try {
            $inquiry = Inquiry::findOrFail($id);
            $inquiry->update($request->all());
            return response()->json($inquiry);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        Inquiry::destroy($id);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
