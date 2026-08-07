<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;


// public routes
Route::get('/', [PublicPageController::class, 'home'])->name('home');
Route::get('/about', [PublicPageController::class, 'about'])->name('about');
Route::get('/pecp', [PublicPageController::class, 'pecp'])->name('pecp');
Route::get('/courses', [PublicPageController::class, 'courses'])->name('courses');
Route::get('/courses/{id}', [PublicPageController::class, 'courseDetail'])->name('course-detail');
Route::get('/blogs', [PublicPageController::class, 'blogs'])->name('blogs');
Route::get('/blogs/{id}', [PublicPageController::class, 'blogDetail'])->name('blog-detail');
Route::get('/contact', [PublicPageController::class, 'contact'])->name('contact');
Route::get('/ai-unlocked', [PublicPageController::class, 'aiUnlocked'])->name('ai-unlocked');

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('contacts', ContactController::class)->only(['index', 'destroy']);
    Route::resource('subscriptions', SubscriptionController::class)->only(['index', 'destroy']);
    Route::resource('courses', CourseController::class);
    Route::get('certificates/{certificate}/preview', [CertificateController::class, 'preview'])->name('certificates.preview');
    Route::resource('certificates', CertificateController::class)->only(['index', 'show', 'destroy']);
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('settings.update');
});

Route::post('/certificate/claim', [CertificateController::class, 'store'])->name('certificate.claim');

Route::post('/newsletter/subscribe', [SubscriptionController::class, 'store'])->name('newsletter.subscribe');
Route::post('/contact/submit', [ContactController::class, 'store'])->name('contact.submit');


require __DIR__.'/auth.php';
