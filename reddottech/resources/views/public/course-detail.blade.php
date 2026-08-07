@extends('layouts.public-layout')

@section('content')
<div class="min-h-screen bg-gray-50" x-data="{ activeTab: 'overview' }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column -->
            <div class="lg:col-span-2">
                <!-- Hero Image -->
                <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <img 
                        src="{{ $course->banner_image ? asset('storage/' . $course->banner_image) : 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop' }}" 
                        alt="{{ $course->name }}" 
                        class="w-full min-h-64 sm:min-h-80 h-[50vh] object-cover rounded-lg"
                    >
                </div>

                <!-- Course Title -->
                 <div class="bg-white">
                    <div class=" shadow-sm p-6  rounded-lg">
                        <h1 class="text-3xl font-bold text-gray-900">{{ $course->name }}</h1>
                        
                        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            @if($course->total_lessons)
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>{{ $course->total_lessons }} Lessons</span>
                                </div>
                            @endif
    
                            @if($course->day)
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>{{ $course->day }}</span>
                                </div>
                            @endif
                        </div>
                    </div>
     
                     <!-- Tabs -->
                     <div class="rounded-lg shadow-sm mb-6 overflow-hidden">
                         <div class="border-b border-gray-200">
                             <nav class="flex flex-wrap -mb-px">
                                 <button 
                                     @click="activeTab = 'overview'"
                                     :class="activeTab === 'overview' ? 'text-white bg-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'"
                                     class="px-6 py-4 text-sm font-medium transition-colors"
                                 >
                                     Overview
                                 </button>
                                 <button 
                                     @click="activeTab = 'curriculum'"
                                     :class="activeTab === 'curriculum' ? 'text-white bg-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'"
                                     class="px-6 py-4 text-sm font-medium transition-colors"
                                 >
                                     Curriculum
                                 </button>
                                 <button 
                                     @click="activeTab = 'instructor'"
                                     :class="activeTab === 'instructor' ? 'text-white bg-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'"
                                     class="px-6 py-4 text-sm font-medium transition-colors"
                                 >
                                     Instructor
                                 </button>
                                 <button 
                                     @click="activeTab = 'requirements'"
                                     :class="activeTab === 'requirements' ? 'text-white bg-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'"
                                     class="px-6 py-4 text-sm font-medium transition-colors"
                                 >
                                     Requirements
                                 </button>
                             </nav>
                         </div>
     
                         <!-- Tab Contents -->
                         <div class="p-6 pt-10">
                             <!-- Overview -->
                             <div x-show="activeTab === 'overview'" x-cloak>
                                 <h2 class="text-xl font-bold mb-4">COURSE DESCRIPTION</h2>
                                 <div class="text-gray-600 leading-relaxed prose max-w-none">
                                     {!! $course->description !!}
                                 </div>
                             </div>
     
                             <!-- Curriculum -->
                             <div x-show="activeTab === 'curriculum'" x-cloak>
                                 <h2 class="text-xl font-bold mb-4">CURRICULUM</h2>
                                 <div class="text-gray-600 leading-relaxed prose max-w-none">
                                     {!! $course->curriculum !!}
                                 </div>
                             </div>
     
                             <!-- Instructor -->
                             <div x-show="activeTab === 'instructor'" x-cloak>
                                 <h2 class="text-xl font-bold mb-4">INSTRUCTOR DETAILS</h2>
                                 <p class="card-text font-semibold mb-2 text-black">{{$course->instructor_name}}</p>
                                 <div class="text-gray-600 leading-relaxed prose max-w-none">
                                     {!! $course->instructor_detail !!}
                                 </div>
                             </div>
     
                             <!-- Requirements -->
                             <div x-show="activeTab === 'requirements'" x-cloak>
                                 <h2 class="text-xl font-bold mb-4">REQUIREMENTS</h2>
                                 <div class="text-gray-600 leading-relaxed prose max-w-none">
                                     {!! $course->requirements !!}
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-lg shadow-sm overflow-hidden sticky top-8">
                    <div class="relative">
                        <img 
                            src="{{ $course->thumbnail ? asset('storage/' . $course->thumbnail) : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop' }}" 
                            alt="{{ $course->name }}" 
                            class="w-full h-48 object-cover"
                        />
                    </div>

                    <div class="p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm text-gray-600">Course Fee</span>
                            <span class="text-2xl font-bold text-gray-900">
                                {{ $course->price ? '$' . number_format($course->price, 2) . '*' : 'Free' }}
                            </span>
                        </div>

                        <p class="text-xs text-gray-500 mb-6">
                            Additional 13% VAT applicable
                        </p>

                        <a href="{{ route('contact') }}" 
                           class="block text-center w-full bg-primary hover:bg-red-700 text-white font-semibold py-3 px-6 rounded transition duration-200 mb-6">
                            ENROLL
                        </a>

                        <div class="space-y-4">
                            @if($course->start_date)
                                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                                    <span class="text-sm text-gray-600">Start Date</span>
                                    <span class="text-sm text-gray-900 font-medium">{{ format_date($course->start_date , 'human') }}</span>
                                </div>
                            @endif
                            @if($course->duration)
                                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                                    <span class="text-sm text-gray-600">Duration</span>
                                    <span class="text-sm text-gray-900 font-medium">{{ $course->duration }}</span>
                                </div>
                            @endif
                            @if($course->delivery)
                                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                                    <span class="text-sm text-gray-600">Delivery</span>
                                    <span class="text-sm text-gray-900 font-medium">{{ ucfirst($course->delivery) }}</span>
                                </div>
                            @endif
                            @if($course->mode)
                                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                                    <span class="text-sm text-gray-600">Mode</span>
                                    <span class="text-sm text-gray-900 font-medium">{{ $course->mode }}</span>
                                </div>
                            @endif
                            @if($course->language)
                                <div class="flex items-center justify-between py-3">
                                    <span class="text-sm text-gray-600">Language</span>
                                    <span class="text-sm text-gray-900 font-medium">{{ ucfirst($course->language) }}</span>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection
