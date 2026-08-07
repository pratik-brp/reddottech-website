{{-- resources/views/welcome.blade.php --}}
@extends('layouts.public-layout')

@section('title', 'PECP | ' . config('app.name', 'Reddot Technologies'))

@section('content')
<div class="">
    @include('elements.pecp.about-pecp')
    @include('elements.pecp.about-usc')
    @include('elements.pecp.why-pecp')
    @include('elements.pecp.pecp-batch')
    @include('elements.pecp.pecp-why')
    <section class='common-section bg-white'>
        @include('elements.common.app-cta')
    </section>
</div>
@endsection
