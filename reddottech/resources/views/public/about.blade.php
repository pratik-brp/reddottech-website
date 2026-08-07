{{-- resources/views/welcome.blade.php --}}
@extends('layouts.public-layout')

@section('title', 'About Us | ' . config('app.name', 'Reddot Technologies'))

@section('content')
<div class="">

    @include('elements.about.about-intro')
    @include('elements.about.about-vision-mission')
    @include('elements.about.about-values')
    @include('elements.about.about-what-we-do')
    @include('elements.about.about-why-choose-us')
    <section class='common-section'>
        @include('elements.common.app-cta')
    </section>
    
</div>
@endsection
