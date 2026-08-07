<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold">Course Details</h2>
    </x-slot>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Side: Main Content -->
            <div class="lg:col-span-2 space-y-6">

                <!-- Course Header -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    @if (!empty($course->banner_image))
                        <div class="relative h-64 sm:h-96 overflow-hidden">
                            <img 
                                src="{{ asset('storage/' . $course->banner_image) }}" 
                                alt="{{ $course->name }}" 
                                class="w-full h-full object-cover"
                            >
                            <div class="absolute top-4 right-4">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {{ ucfirst($course->skill_level ?? 'Beginner') }}
                                </span>
                            </div>
                        </div>
                    @endif

                    <div class="p-6">
                        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $course->name }}</h1>

                        <!-- Quick Stats -->
                        <div class="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                            <div class="flex items-center text-gray-600">
                                <x-heroicon-o-globe-alt class="w-5 h-5 mr-2"/>
                                <span class="text-sm">{{ ucfirst($course->language ?? 'English') }}</span>
                            </div>
                            <div class="flex items-center text-gray-600">
                                <x-heroicon-o-academic-cap class="w-5 h-5 mr-2"/>
                                <span class="text-sm">{{ ucfirst($course->skill_level ?? 'Beginner') }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Course Details Sections -->
                @foreach ([
                    'About This Course' => $course->description,
                    'Instructor Name' => $course->instructor_name,
                    'Instructor Details' => $course->instructor_detail,
                    'Requirements' => $course->requirements,
                    'Curriculum' => $course->curriculum,
                ] as $title => $content)
                    @if (!empty($content))
                        <div class="bg-white rounded-xl shadow-sm p-6">
                            <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $title }}</h2>
                            <div class="prose max-w-none text-gray-700 leading-relaxed">
                                {!! $content !!}
                            </div>
                        </div>
                    @endif
                @endforeach

                <!-- Thumbnail Image -->
                @if (!empty($course->thumbnail))
                    <div class="bg-white rounded-xl shadow-sm p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Course Thumbnail</h2>
                        <img 
                            src="{{ asset('storage/' . $course->thumbnail) }}" 
                            alt="{{ $course->name }}" 
                            class="w-full max-h-96 object-cover rounded-lg"
                        >
                    </div>
                @endif
            </div>

            <!-- Right Side: Sidebar -->
            <div class="lg:col-span-1">
                <div class="sticky top-8 space-y-6">

                    <!-- Course Info Card -->
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 class="font-bold text-gray-900 mb-4">Course Information</h3>

                        <div class="space-y-3 text-sm">
                            <x-info-row label="Price" :value="'$' . number_format($course->price ?? 0, 2)" />
                            <x-info-row label="Language" :value="ucfirst($course->language ?? 'English')" />
                            <x-info-row label="Certification" :value="ucfirst($course->certification ?? 'N/A')" />
                            <x-info-row label="Duration" :value="$course->duration ?? 'Not specified'" />
                            <x-info-row label="Delivery" :value="$course->delivery ?? 'N/A'" />
                            <x-info-row label="Mode" :value="$course->mode ?? 'N/A'" />
                            <x-info-row label="Start Date" :value="$course->start_date ?? 'N/A'" />
                            @php
                                $status = strtolower($course->status ?? 'draft');
                            @endphp
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <span class="text-gray-600 text-sm">Status</span>
                                <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full 
                                    {{ $status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}">
                                    {{ ucfirst($status) }}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</x-app-layout>
