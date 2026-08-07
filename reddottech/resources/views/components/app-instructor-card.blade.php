<article class='px-7 py-8  rounded-xl border-primary/80 bg-white shadow-[0_12px_16px_-4px_rgba(217,31,38,0.08)]'>
    <div class='text-center'>
        <img src="{{ $profile }}" alt="{{ $name }}" class='h-24 w-24 rounded-full object-cover mx-auto block'>
        <h3 class='md:text-xl text-base font-semibold text-gray-900 md:mb-1.5 mt-4'>{{ $name }}</h3>
        <p class='designation card-text text-base font-light'>{{$designation}}</p>
    </div>
    <p class='card-text md:my-6 my-2 text-center'>{{ $description }}</p>
    <div class="instructor-profile flex items-center gap-1 justify-center">
        <a href="{{ $linkedIn }}" target="_blank" class='h-6 w-6 rounded-full flex items-center justify-center'>
            <img src="{{ asset('images/common/linkedin.svg') }}" alt="LinkedIn" class='h-6 w-6 object-contain'>
        </a>
        <a href="mailto:{{ $email }}" target="_blank" class='h-6 w-6 rounded-full flex items-center justify-center'>
            <img src="{{ asset('images/common/email.svg') }}" alt="mail" class='h-6 w-6 object-contain'>
        </a>
    </div>
</article>