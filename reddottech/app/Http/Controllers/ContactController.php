<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::latest()->paginate(10);
        return view('private.contacts.index', compact('contacts'));
    }

    public function store(Request $request)
    {
        try{
                $validated = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name'  => 'required|string|max:255',
                'phone'      => 'required|digits_between:7,15',
                'email'      => 'required|email|max:255',
                'subject'    => 'required|string|max:255',
                'message'    => 'required|string|max:1000',
            ]);

            Contact::create($validated);

            return redirect()->back()
                ->with('popup_message', 'Successfully submitted your query.')
                ->with('popup_type', 'success');
        }catch (\Exception $e) {
            \Log::error('Subscription error: ' . $e->getMessage());
            return redirect()->back()
                ->with('popup_message', 'Something went wrong! Please try again later.')
                ->with('popup_type', 'error');
        }
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->route('admin.contacts.index')->with('success', 'Contact deleted successfully');
    }
}
