<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold">Edit Course</h2>
    </x-slot>

    <div class="max-w-7xl mx-auto">
        <div class="p-6  shadow-sm rounded-lg">
            <form action="{{ route('admin.courses.update', $course) }}" method="POST" enctype="multipart/form-data" class="space-y-4 bg-white p-6">
                @csrf
                @method('PUT')
                @include('private.courses.partials.form', ['course' => $course])
                <x-primary-button>Update</x-primary-button>
            </form>
        </div>
    </div>
</x-app-layout>
