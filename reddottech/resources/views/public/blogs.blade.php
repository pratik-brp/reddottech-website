@extends('layouts.public-layout')

@section('content')
<div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col lg:flex-row justify-between relative">
            <!-- Main Content -->
            <div class="lg:w-2/3 max-w-[730px]">
                <!-- Blog Post 1 -->
                <article class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" alt="Team working" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                </svg>
                                April 21, 2025
                            </span>
                            <span class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                </svg>
                                Design Crowdfund
                            </span>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-3">Curabitur at fermentum purus. Interdum et malesuada fames ac ante ipsum</h2>
                        <a href="#" class="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Read More</a>
                    </div>
                </article>

                <!-- Blog Post 2 -->
                <article class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" alt="Earbuds" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                </svg>
                                April 21, 2025
                            </span>
                            <span class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                </svg>
                                Design Crowdfund
                            </span>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-3">Curabitur at fermentum purus. Interdum et malesuada fames ac ante ipsum</h2>
                        <a href="#" class="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Read More</a>
                    </div>
                </article>

                <!-- Blog Post 3 -->
                <article class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <img src="https://images.unsplash.com/photo-1621588159685-ff856f6c711d?w=800" alt="Product packaging" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                </svg>
                                April 21, 2025
                            </span>
                            <span class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                </svg>
                                Design Crowdfund
                            </span>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-3">Curabitur at fermentum purus. Interdum et malesuada fames ac ante ipsum</h2>
                        <a href="#" class="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Read More</a>
                    </div>
                </article>

                <!-- Pagination -->
                <div class="flex justify-center gap-2 mt-8">
                    <a href="#" class="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700">1</a>
                    <a href="#" class="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded hover:bg-gray-700">2</a>
                    <a href="#" class="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded hover:bg-gray-700">3</a>
                    <a href="#" class="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded hover:bg-gray-700">4</a>
                </div>
            </div>

            <!-- Sidebar -->
            <aside class="lg:w-1/3 max-w-[379px] sticky top-0 max-h-fit">
                <!-- Search -->
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Search</h3>
                    <div class="relative">
                        <input type="text" placeholder="Search..." class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600">
                        <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Service Category -->
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">SERVICE CATEGORY</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="block py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700">Planchonella</a></li>
                        <li><a href="#" class="flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded">E-fund Software <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                        <li><a href="#" class="flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded">Spam Checking <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                        <li><a href="#" class="flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded">Ux & Homepedia <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                        <li><a href="#" class="flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded">Whale Application <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                    </ul>
                </div>

                <!-- Recent Posts -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">RECENT POST</h3>
                    <div class="space-y-4">
                        @foreach([
                            ['img' => 'photo-1522071820081-009f0129c71c', 'date' => '04 Oct 2021'],
                            ['img' => 'photo-1505740420928-5e560c06d30e', 'date' => '04 Oct 2021'],
                            ['img' => 'photo-1621588159685-009f0129c71c', 'date' => '04 Oct 2021'],
                            ['img' => 'photo-1505740420928-5e560c06d30e', 'date' => '04 Oct 2021'],
                            ['img' => 'photo-1621588159685-009f0129c71c', 'date' => '04 Oct 2021']
                        ] as $post)
                        <div class="flex gap-3">
                            <img src="https://images.unsplash.com/{{ $post['img'] }}?w=100" alt="Post thumbnail" class="w-20 h-20 object-cover rounded">
                            <div class="flex-1">
                                <p class="text-xs text-gray-500 mb-1">{{ $post['date'] }}</p>
                                <p class="text-sm text-gray-900 line-clamp-2">Sed porttitor lectus nibh. Cras ultricies ligula sed...</p>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </aside>
        </div>
    </div>
</div>
@endsection