<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold">Subscription List</h2>
    </x-slot>

    <div class="max-w-7xl mx-auto mt-2">
        <div class="p-6 bg-white shadow-sm rounded-lg">
            <table class="w-full border">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="p-3 text-left">Email</th>
                        <th class="p-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($subscriptions as $subscription)
                        <tr class="border-t">
                            <td class="p-3">{{ $subscription->email }}</td>
                            <td class="p-3 text-right">
                                <form action="{{ route('admin.subscriptions.destroy', $subscription) }}" method="POST" onsubmit="return confirm('Delete {{ $subscription->email }}?')">
                                    @csrf
                                    @method('DELETE')
                                    <x-danger-button>Delete</x-danger-button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="2" class="p-6 text-center text-gray-400">No subscriptions yet</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
            <div class="mt-4">{{ $subscriptions->links() }}</div>
        </div>
    </div>
</x-app-layout>
