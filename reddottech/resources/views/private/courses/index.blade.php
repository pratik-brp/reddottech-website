<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Courses</h2>
            <a href="{{ route('admin.courses.create') }}" class="px-4 py-2 bg-primary text-white rounded-md">+ Add Course</a>
        </div>
    </x-slot>

    <div class=''>
        <div class="max-w-7xl mx-auto">
            <div class="p-6  shadow-sm rounded-lg ">
                <table class="w-full border">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="p-2">Thumbnail</th>
                            <th class="p-2 text-left">Name</th>
                            <th class="p-2 text-left">Price</th>
                            <th class="p-2 text-left">Language</th>
                            <th class="p-2 text-left">Certification</th>
                            <th class="p-2 text-left">Status</th>
                            <th class="p-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($courses as $course)
                            <tr class="border-t">
                                <td class="p-2">
                                    @if ($course->thumbnail)
                                        <img src="{{ asset('storage/' . $course->thumbnail) }}" alt="" class="w-16 h-12 object-cover rounded">
                                    @else
                                        <span class="text-gray-400 italic">No image</span>
                                    @endif
                                </td>
                                <td class="p-2">{{ $course->name }}</td>
                                
                                <td class="p-2">{{ $course->price }}</td>
                                <td class="p-2">{{ $course->language }}</td>
                                <td class="p-2">{{ $course->certification }}</td>
                                <td class="p-2">
                                    @php
                                        $isPublished = strtolower($course->status) === 'published';
                                    @endphp

                                    <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full 
                                        {{ $isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}">
                                        {{ ucfirst($course->status ?? 'Draft') }}
                                    </span>
                                </td>
                                <td class="p-2 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <a href="{{ route('admin.courses.show', $course) }}" class="text-blue-600">View</a>
                                        <a href="{{ route('admin.courses.edit', $course) }}" class="text-yellow-600">Edit</a>
                                        <form action="{{ route('admin.courses.destroy', $course) }}" method="POST" onsubmit="return confirm('Delete this course?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="text-red-600">Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
        
                <div class="mt-4">{{ $courses->links() }}</div>
            </div>
        </div>
    </div>
</x-app-layout>
