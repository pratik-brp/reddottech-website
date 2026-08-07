<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'instructor_name',
        'price',
        'start_date',
        'duration',
        'delivery',
        'mode',
        'language',
        'status',
        'certification',
        'thumbnail',
        'banner_image',
        'skill_level',
        'curriculum',
        'instructor_detail',
        'requirements',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'start_date' => 'date',
    ];

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeOnline($query)
    {
        return $query->where('delivery', 'online');
    }

    public function scopePhysical($query)
    {
        return $query->where('delivery', 'physical');
    }

    // Add accessors/mutators if needed
    public function getFormattedPriceAttribute()
    {
        return '$' . number_format($this->price, 2);
    }
}