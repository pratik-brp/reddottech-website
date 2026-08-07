<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">AI Unlocked Certificates</h2>
            <span class="text-sm text-gray-500">{{ $certificates->total() }} total</span>
        </div>
    </x-slot>

    <div class="max-w-7xl mx-auto mt-2">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">School</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Completed</th>
                        <th class="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse ($certificates as $cert)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4">
                            <span class="font-medium text-gray-900">{{ $cert->name }}</span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">{{ $cert->email }}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">{{ $cert->school ?: '-' }}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">{{ $cert->completed_at ? $cert->completed_at->format('d M Y') : '-' }}</td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.certificates.show', $cert) }}" class="px-3 py-1.5 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-900">View</a>
                                <form action="{{ route('admin.certificates.destroy', $cert) }}" method="POST" onsubmit="return confirm('Delete record for {{ $cert->name }}?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded hover:bg-red-100">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center text-gray-400">
                            <p class="font-medium">No certificates yet</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
            <div class="px-6 py-3 border-t border-gray-100 bg-gray-50">
                {{ $certificates->links() }}
            </div>
        </div>
    </div>
</x-app-layout>
