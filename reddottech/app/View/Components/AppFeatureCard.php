<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AppFeatureCard extends Component
{
    public $heading;
    public $icon;
    public $description;

    public function __construct($heading, $icon, $description)
    {
        $this->heading = $heading;
        $this->icon = $icon;
        $this->description = $description;
    }

    public function render(): View|Closure|string
    {
        return view('components.app-feature-card');
    }
}
