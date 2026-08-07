<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AppInstructorCard extends Component
{
    public $name;
    public $designation;
    public $description;
    public $profile;
    public $linkedIn;
    public $email;

    public function __construct($name, $designation, $description, $profile, $linkedIn, $email)
    {
        $this->name = $name;
        $this->designation = $designation;
        $this->description = $description;
        $this->profile = $profile;
        $this->linkedIn = $linkedIn;
        $this->email = $email;
    }

    public function render(): View|Closure|string
    {
        return view('components.app-instructor-card');
    }
}
