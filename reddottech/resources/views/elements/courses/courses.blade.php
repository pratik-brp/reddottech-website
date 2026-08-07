<section class='courses-list common-section'>
    <div class="container mx-auto">
        <h2 class='heading-primary text-center'>Explore <span class='text-primary'>Our Courses</span></h2>
        <ul class="course-container grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-4 gap-x-4 md:gap-y-16 gap-y-7 md:mt-16 mt-7 px-4 md:px-0">
            @foreach($courses as $course)
                @php
                    $thumbnail = $course->thumbnail
                        ? Storage::url($course->thumbnail)
                        : asset('images/courses/default.jpg');
                @endphp
                <li>
                    <x-app-course-card 
                        heading="{{ data_get($course, 'name', '') }}"
                        banner="{{ $thumbnail }}"
                        description="{{ strip_tags(data_get($course, 'description', 'N/A')) }}"
                        instructorName="{{ strip_tags(data_get($course, 'instructor_name', 'N/A')) }}"
                        instructorImage="{{ asset('images/common/dummy-avatar.jpg') }}"
                        courseId="{{ data_get($course, 'id', 1) }}"
                        duration="{{ data_get($course, 'duration', 'N/A') }}"
                    />

                </li>

            @endforeach
    </ul>

    </div>
</section>