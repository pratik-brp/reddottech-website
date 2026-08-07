<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Courses::latest()->paginate(10);
        return view('private.courses.index', compact('courses'));
    }

    public function create()
    {
        return view('private.courses.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'instructor_name' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'duration' => 'nullable|string|max:255',
            'delivery' => 'required|string|in:online,physical',
            'mode' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:255',
            'status' => 'required|string|in:published,draft',
            'certification' => 'nullable|string|max:255',
            'skill_level' => 'nullable|string|in:beginner,intermediate,advanced',
            'instructor_detail' => 'nullable|string',
            'requirements' => 'nullable|string',
            'curriculum' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'banner_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        // Set default values
        $validated['language'] = $validated['language'] ?? 'English';
        $validated['certification'] = $validated['certification'] ?? 'pecp';
        $validated['status'] = $validated['status'] ?? 'published';

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('courses/thumbnails', 'public');
        }

        if ($request->hasFile('banner_image')) {
            $validated['banner_image'] = $request->file('banner_image')->store('courses/banners', 'public');
        }

        Courses::create($validated);

        return redirect()->route('admin.courses.index')
            ->with('success', 'Course created successfully');
    }

    public function show(Courses $course)
    {
        return view('private.courses.show', compact('course'));
    }

    public function edit(Courses $course)
    {
        return view('private.courses.edit', compact('course'));
    }

    public function update(Request $request, Courses $course)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'instructor_name' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'duration' => 'nullable|string|max:255',
            'delivery' => 'required|string|in:online,physical',
            'mode' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:255',
            'status' => 'required|string|in:published,draft',
            'certification' => 'nullable|string|max:255',
            'skill_level' => 'nullable|string|in:beginner,intermediate,advanced',
            'instructor_detail' => 'nullable|string',
            'requirements' => 'nullable|string',
            'curriculum' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'banner_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        // Set default values if not provided
        $validated['language'] = $validated['language'] ?? 'English';
        $validated['certification'] = $validated['certification'] ?? 'pecp';
        $validated['status'] = $validated['status'] ?? 'published';

        // Handle new thumbnail
        if ($request->hasFile('thumbnail')) {
            if ($course->thumbnail && Storage::disk('public')->exists($course->thumbnail)) {
                Storage::disk('public')->delete($course->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('courses/thumbnails', 'public');
        }

        // Handle new banner image
        if ($request->hasFile('banner_image')) {
            if ($course->banner_image && Storage::disk('public')->exists($course->banner_image)) {
                Storage::disk('public')->delete($course->banner_image);
            }
            $validated['banner_image'] = $request->file('banner_image')->store('courses/banners', 'public');
        }

        $course->update($validated);

        return redirect()->route('admin.courses.index')
            ->with('success', 'Course updated successfully');
    }

    public function destroy(Courses $course)
    {
        // Delete stored images if they exist
        if ($course->thumbnail && Storage::disk('public')->exists($course->thumbnail)) {
            Storage::disk('public')->delete($course->thumbnail);
        }
        if ($course->banner_image && Storage::disk('public')->exists($course->banner_image)) {
            Storage::disk('public')->delete($course->banner_image);
        }

        $course->delete();

        return redirect()->route('admin.courses.index')
            ->with('success', 'Course deleted successfully');
    }
}
