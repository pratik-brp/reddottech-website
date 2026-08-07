@extends('layouts.public-layout')


@section('content')
<section id='404' class='bg-white min-h-[80vh] flex items-center'>
    <div class="container mx-auto">
        <div class="grid grid-cols-2 ">
            <div class="">
                <div class="error-badge bg-[#f8e9e9] py-1 px-3 w-fit flex gap-2.5 items-center rounded mb-3">
                    <x-application-error-icon class="block h-3 w-auto fill-current text-primary" />
                    <span class='text-sm font-semibold text-primary'>404 Error</span>
                </div>
                <h1 class="text-5xl font-bold text-secondary mb-4">Page Not Found !</h1>
                <p class="mt-4 text-gray-600 text-xl mb-9">Sorry, the page you are looking for doesn’t exist or has been removed. Keep exploring out site:</p>
                <a href="">
                    <x-app-button variant='arrow-lt'>Back to Home</x-app-button>
                </a>
            </div>
            <div>
                <img src="{{ asset('images/common/notfound.svg') }}" alt="404 Error Image" class="w-full h-auto">
            </div>
        </div>
    </div>
</section>
@endsection
