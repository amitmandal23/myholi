<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'hotel_details' => 'array',
        'itinerary' => 'array',
        'images' => 'array',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'discounted_price' => 'decimal:2',
        'show_in_menu' => 'boolean',
    ];
}
