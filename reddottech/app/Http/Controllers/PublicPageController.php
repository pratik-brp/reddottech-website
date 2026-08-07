<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Courses;


class PublicPageController extends Controller
{
    
    public function home(){
        $courses = Courses::where('status', 'published')
        ->latest()
        ->get();
        return view('public.home' , compact('courses'));
    }

    public function about(){
        return view('public.about');
    }

    public function pecp(){
        return view('public.pecp');
    }

    public function courses(){
        $courses = Courses::where('status', 'published')
        ->latest()
        ->get();
        return view('public.courses' , compact('courses'));
    }

    public function courseDetail($id){
        $course = Courses::findOrFail($id);
        return view('public.course-detail', compact('course'));
    }

    public function blogs(){
        return view('public.blogs');
    }

    public function blogDetail(){
        return view('public.blog-detail');
    }
    
    public function contact(){
        return view('public.contact');
    }

    public function aiUnlocked(){
        return view('public.ai-unlocked');
    }
}