<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptions = Subscription::latest()->paginate(10);
        return view('private.subscriptions.index', compact('subscriptions'));
    }

    public function store(Request $request)
    {
        try{
            $validate = $request->validate(['email'=>'required|email|max:255']);

            if (Subscription::where('email', $validate['email'])->exists()) {
                return redirect()->back()
                    ->with('popup_message', 'This email has already subscribed.')
                    ->with('popup_type', 'error');
            }
            Subscription::create($validate);
            return redirect()->back()
            ->with('popup_message', 'Thank you for subscribing to our newsletter!')
            ->with('popup_type', 'success');
        }catch (QueryException $e) {
            if ($e->getCode() == '23000') {
                return redirect()->back()
                    ->with('popup_message', 'This email has already subscribed.')
                    ->with('popup_type', 'error');
            }

            \Log::error('Subscription DB error: ' . $e->getMessage());
            return redirect()->back()
                ->with('popup_message', 'Something went wrong! Please try again later.')
                ->with('popup_type', 'error');
        } catch (\Exception $e) {
            \Log::error('Subscription error: ' . $e->getMessage());
            return redirect()->back()
                ->with('popup_message', 'Something went wrong! Please try again later.')
                ->with('popup_type', 'error');
        }

    }

    public function destroy(Subscription $subscription)
    {
        $subscription->delete();
        return redirect()->route('admin.subscriptions.index')->with('success', 'Subscription deleted successfully');
    }
}
