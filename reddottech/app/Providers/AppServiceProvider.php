<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Courses;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('*', function ($view) {
            $footerCourses = Courses::where('status', 'published')
                ->latest()
                ->take(5)
                ->get();

            $view->with('footerCourses', $footerCourses);
        });
        require_once app_path('Helpers/date_helper.php');
        
    }
}
