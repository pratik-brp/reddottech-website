{{-- resources/views/welcome.blade.php --}}
@extends('layouts.public-layout')

@section('title', 'Home | ' . config('app.name', 'Reddot Technologies'))

@section('content')
<div class="">
    @include('elements.home.app-hero')
    @include('elements.pecp.pecp-batch')
    @include('elements.home.app-lp-about')
    @include('elements.home.app-feature')
    @include('elements.home.app-lp-courses')
    <!-- @include('elements.home.app-lp-instructor-list') -->
    <section class='md:pb-14 pb-7'>
        @include('elements.common.app-cta')
    </section>
</div>
@endsection
