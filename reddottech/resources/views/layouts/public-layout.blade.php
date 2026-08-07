<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>@yield('title', config('app.name', 'Reddot Technologies'))</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="@yield('meta_description', 'REDDOT is your trusted platform to grow upskill and succeed in your career.')">
        <meta name="keywords" content="REDDOT, services, platform, business, technology">
        <meta name="author" content="Ayush Khatri">
        <link rel="canonical" href="{{ url()->current() }}">

        <!-- Favicon -->
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Open Graph (Facebook, LinkedIn) -->
        <meta property="og:title" content="@yield('og_title', config('app.name', 'REDDOT'))">
        <meta property="og:description" content="@yield('og_description', 'Discover the best features of REDDOT.')">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('og-image.png') }}">
        <meta property="og:site_name" content="REDDOT">

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="@yield('twitter_title', config('app.name', 'REDDOT'))">
        <meta name="twitter:description" content="@yield('twitter_description', 'Discover the best features of REDDOT.')">
        <meta name="twitter:image" content="{{ asset('twitter-image.png') }}">


        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"
        />

        <!-- Scripts -->
         <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
         <script src="//unpkg.com/alpinejs" defer></script>

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans antialiased">
        @include('layouts.public-navigation')

        <!-- Page Heading -->
        @isset($header)
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {{ $header }}
                </div>
            </header>
        @endisset

        <!-- Page Content -->
        <main class="{{ request()->routeIs('home') ? '' : 'pt-36 sm:pt-40' }}">
            @yield('content')
        </main>
        @include('layouts.app-footer')

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                @if(session('popup_message'))
                Swal.fire({
                    title: "{{ session('popup_type', 'success') === 'success' ? 'Success!' : 'Error!' }}",
                    text: "{{ session('popup_message') }}",
                    icon: "{{ session('popup_type', 'success') }}",
                    timer: 5000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
                @endif
                
                @if($errors->any())
                Swal.fire({
                    title: 'Error!',
                    text: "{{ $errors->first() }}",
                    icon: 'error',
                    timer: 5000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
                @endif
            });
        </script>
    </body>
</html>
