<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold">Contact List</h2>
    </x-slot>

    <div class="max-w-7xl bg-white mx-auto mt-2">
        <div class="p-6 shadow-sm rounded-lg">
            <table class="w-full border">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="p-3 text-left">Name</th>
                        <th class="p-3 text-left">Email</th>
                        <th class="p-3 text-left">Phone</th>
                        <th class="p-3 text-left">Message</th>
                        <th class="p-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($contacts as $contact)
                        <tr class="border-t">
                            <td class="p-3">{{ $contact->first_name }} {{ $contact->last_name }}</td>
                            <td class="p-3">{{ $contact->email }}</td>
                            <td class="p-3">{{ $contact->phone }}</td>
                            <td class="p-3">{{ Str::limit($contact->message, 50) }}</td>
                            <td class="p-3 text-right">
                                <form action="{{ route('admin.contacts.destroy', $contact) }}" method="POST" onsubmit="return confirm('Delete this contact?')">
                                    @csrf
                                    @method('DELETE')
                                    <x-danger-button>Delete</x-danger-button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="mt-4">{{ $contacts->links() }}</div>
        </div>
    </div>
</x-app-layout>
