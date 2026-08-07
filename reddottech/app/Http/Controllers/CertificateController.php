<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::latest()->paginate(10);
        return view('private.certificates.index', compact('certificates'));
    }

    public function show(Certificate $certificate)
    {
        return view('private.certificates.show', compact('certificate'));
    }

    public function preview(Certificate $certificate)
    {
        return view('private.certificates.preview', compact('certificate'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'school' => 'nullable|string|max:255',
        ]);

        $validated['completed_at'] = now();

        Certificate::create($validated);

        return response()->json(['success' => true]);
    }

    public function destroy(Certificate $certificate)
    {
        $certificate->delete();
        return redirect()->route('admin.certificates.index')->with('success', 'Certificate record deleted successfully');
    }
}
