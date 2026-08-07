<?php 

namespace App\View\Components;

use Illuminate\View\Component;

class Button extends Component
{
    public $variant; 
    public $size;
    public $type;

    public function __construct($variant = 'default', $size = 'md', $type = 'button')
    {
        $this->variant = $variant;
        $this->size = $size;
        $this->type = $type;
    }

    public function render()
    {
        return view('components.app-button');
    }
}