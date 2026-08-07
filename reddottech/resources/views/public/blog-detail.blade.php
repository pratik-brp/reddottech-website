@extends('layouts.public-layout')

@section('content')
<div class="min-h-screen bg-gray-50">
    <!-- Hero Image -->
    <div class="w-full h-64 md:h-96 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200')">
    </div>

    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Main Content -->
            <div class="lg:w-2/3 max-w-[730px]">
                <article class="bg-white rounded-lg shadow-sm p-6 md:p-8">
                    <!-- Featured Image -->
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800" alt="Meeting" class="w-full h-64 object-cover rounded-lg mb-6">
                    
                    <!-- Meta Info -->
                    <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span class="flex items-center gap-1 text-red-600">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                            </svg>
                            16 June 2023
                        </span>
                        <span class="flex items-center gap-1 text-red-600">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                            </svg>
                            Comment (06)
                        </span>
                    </div>

                    <!-- Title -->
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.</h1>

                    <!-- Content -->
                    <div class="prose max-w-none text-gray-700 space-y-4 mb-6">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat excepteur sint occaecat.</p>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat excepteur sint occaecat.</p>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor in reprehenderit.</p>
                    </div>

                    <!-- Image Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400" alt="Team meeting" class="w-full h-64 object-cover rounded-lg">
                        <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400" alt="Working together" class="w-full h-64 object-cover rounded-lg">
                    </div>

                    <!-- More Content -->
                    <div class="prose max-w-none text-gray-700 space-y-4 mb-8">
                        <p>With worldwide annual spend on digital advertising surpassing $325 billion, it's no surprise ImpactPlus appreciates its online marketing and becoming audience. One of three clear approaches QuickMedia employs involves influencer marketing: Using influencers to boost in distribution.</p>
                    </div>

                    <!-- Quote Block -->
                    <div class="bg-gray-50 border-l-4 border-red-600 p-6 mb-8">
                        <svg class="w-10 h-10 text-red-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <p class="text-lg md:text-xl text-gray-900 font-medium mb-2">Diam urna mollis dignissim adipiscing vitae ac semper semper rutrum sed neque felis enim. Cursus felis in viverra tempus vitae duis vestibulum</p>
                        <p class="text-gray-600">- Civali Bleciton</p>
                    </div>

                    <!-- Tags & Share -->
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-gray-700 font-semibold">Posted In:</span>
                            <a href="#" class="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">Development</a>
                            <a href="#" class="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">Digital</a>
                            <a href="#" class="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">Tech</a>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-gray-700 font-semibold">Share:</span>
                            <a href="#" class="text-gray-600 hover:text-blue-600"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                            <a href="#" class="text-gray-600 hover:text-blue-400"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
                            <a href="#" class="text-gray-600 hover:text-pink-600"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg></a>
                        </div>
                    </div>
                </article>
            </div>
            <!-- Sidebar -->
            <aside class="lg:w-1/3 h-fit sticky top-0">
                <!-- Search -->
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">SEARCH</h3>
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
                        <li><a href="#" class="flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded">Graphic Design <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                        <li><a href="#" class="block py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700">Web Design</a></li>
                        <li><a href="#" class="flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded">E-fund Software <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                        <li><a href="#" class="flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded">Spam Checking <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                        <li><a href="#" class="flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded">Whale Application <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></li>
                    </ul>
                </div>

                <!-- Recent Posts -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">RECENT POST</h3>
                    <div class="space-y-4">
                        @foreach([
                            ['img' => 'photo-1522071820081-009f0129c71c', 'date' => '16 June 2023'],
                            ['img' => 'photo-1505740420928-5e560c06d30e', 'date' => '16 June 2023'],
                            ['img' => 'photo-1621588159685-ff856f6c711d', 'date' => '16 June 2023'],
                            ['img' => 'photo-1505740420928-5e560c06d30e', 'date' => '16 June 2023'],
                            ['img' => 'photo-1621588159685-ff856f6c711d', 'date' => '16 June 2023']
                        ] as $post)
                        <div class="flex gap-3 pb-4 border-b last:border-b-0">
                            <img src="https://images.unsplash.com/{{ $post['img'] }}?w=100" alt="Post thumbnail" class="w-20 h-20 object-cover rounded">
                            <div class="flex-1">
                                <p class="text-xs text-red-600 mb-1">🗓 {{ $post['date'] }}</p>
                                <p class="text-sm text-gray-900 line-clamp-2">Sed porttitor lectus nibh aliquet libero purus.</p>
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