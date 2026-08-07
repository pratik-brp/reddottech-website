<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use App\Models\Contact;
use App\Models\Courses;
use App\Models\Certificate;

class DashboardController extends Controller
{
    //

    public function index()
    {
        return view('dashboard', [
            'contactsCount' => Contact::count(),
            'subscriptionsCount' => Subscription::count(),
            'coursesCount' => Courses::where('status', 'published')->count(),
            'certificatesCount' => Certificate::count(),
        ]);
    }
}
