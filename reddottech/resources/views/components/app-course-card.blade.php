<a href="{{ route('course-detail', $courseId) }}" class="block w-fit h-full">
    <article class='p-6 border border-dotted border-primary rounded-lg  shadow-[0_12px_16px_-4px_rgba(217,31,38,0.08)]
    md:w-[384px] w-full min-h-[530px] flex flex-col justify-around'>
        <div class='info-graphics h-[254px] relative w-full'>
            <img src="{{ $banner }}" alt="{{ $heading }}" class='h-full object-cover w-full'>
            <p class='duration flex items-center gap-2 absolute top-4 right-2 bg-white px-2 py-1 rounded'>
                <img src="{{ asset('images/common/clock.svg') }}" alt="clock image" class='h-4 w-4 object-contain'>
                <span class='text-sm text-[#667085]'>{{ $duration }}</span>
            </p>
        </div>
        <h3 class='heading-normal my-3'>{{ $heading }}</h3>
        <p class='card-text text-gray-600 line-clamp-3'>{{ $description }}</p>
        <div class="card-cta flex items-center justify-between mt-6">
            <div class="author flex items-center gap-2">
                <img 
                    src="{{ $instructorImage }}" 
                    alt="{{ $instructorName }}" 
                    class="h-10 w-10 rounded-full object-cover"
                    onerror="this.onerror=null; this.src='{{ asset('images/instructor/default.png') }}';"
                />

                <p class='text-sm text-secondary font-medium'>{{ $instructorName }}</p>
            </div>
            <button class='bg-primary text-xs py-2 px-3 text-white rounded-full'>Learn More</button>
        </div>
    </article>
</a>
