<section class='batch bg-batch common-section'>
    <div class="container mx-auto">
        <div class="intro">
            <p class='md:text-2xl text-sm text-white font-semibold md:mb-4 mb-1'>{{ \App\Models\Setting::get('batch_banner_subtitle', 'Take the next step toward a globally recognized career.') }}</p>
            <h2 class='md:text-6xl text-2xl font-semibold text-white mb-4 md:leading-[72px] md:mb-12'>{!! \App\Models\Setting::get('batch_banner_title', 'First batch begins November 15, 2025. <br /> Limited seats available.') !!}</h2>
            <a href="{{ route('contact') }}">
                <x-app-button variant='arrow-rt'>{{ \App\Models\Setting::get('batch_banner_button_text', 'Enroll Now') }}</x-app-button>
            </a>
        </div>
    </div>
</section>
