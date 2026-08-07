{{-- resources/views/welcome.blade.php --}}
@extends('layouts.public-layout')

@section('title', 'Contact | ' . config('app.name', 'Reddot Technologies'))

@section('content')
<div class="">
    @include('elements.contact.contact-form')
</div>
@endsection
