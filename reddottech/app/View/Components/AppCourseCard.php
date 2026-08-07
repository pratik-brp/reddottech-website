<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AppCourseCard extends Component
{
    public $heading;
    public $banner;
    public $description;
    public $instructorName;
    public $instructorImage;
    public $courseId;
    public $duration;

    public function __construct($heading, $banner, $description, $instructorName, $instructorImage, $courseId, $duration)
    {
        $this->heading = $heading;
        $this->banner = $banner;
        $this->description = $description;
        $this->instructorName = $instructorName;
        $this->instructorImage = $instructorImage;
        $this->courseId = $courseId;
        $this->duration = $duration;
    }

    
    public function render(): View|Closure|string
    {
        return view('components.app-course-card');
    }
}
