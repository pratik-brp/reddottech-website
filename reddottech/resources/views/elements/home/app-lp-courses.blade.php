<!-- Include Swiper CSS -->

<section id="course-list-container" class="common-section">
    <div class="container mx-auto">
        <h2 class="heading-primary text-center">
            Upskill with Our <span class="text-primary">Popular Courses</span>
        </h2>

        <!-- Swiper -->
        <div class="swiper mySwiper lg:py-14 md:py-8 py-4 px-4">
            <div class="swiper-wrapper">
                @foreach($courses as $course)
                    @php
                        $thumbnail = $course->thumbnail
                            ? Storage::url($course->thumbnail)
                            : asset('images/courses/default.jpg');
                    @endphp

                    <div class="swiper-slide h-full">
                        <x-app-course-card 
                            heading="{{ data_get($course, 'name', '') }}"
                            banner="{{ $thumbnail }}"
                            description="{{ strip_tags(data_get($course, 'description', 'N/A')) }}"
                            instructorName="{{ strip_tags(data_get($course, 'instructor_name', 'N/A')) }}"
                            instructorImage="{{ asset('images/common/dummy-avatar.jpg') }}"
                            courseId="{{ data_get($course, 'id', 1) }}"
                            duration="{{ data_get($course, 'duration', 'N/A') }}"
                        />
                    </div>
                @endforeach
            </div>

            <!-- Pagination (optional) -->
            <div class="swiper-pagination"></div>
        </div>

        <div class="button-holder text-center mt-14">
            <a href="{{ route('courses') }}">
                <x-app-button variant="outline">Explore All Courses</x-app-button>
            </a>
        </div>
    </div>
</section>

<!-- Include Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

<script>
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 3000, // 3 seconds
            disableOnInteraction: false, // keeps autoplay even after user interacts
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
</script>
