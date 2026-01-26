<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'slots' => 'array',
        'images' => 'array',
        'price' => 'decimal:2',
        'discounted_price' => 'decimal:2',
        'show_in_menu' => 'boolean',
    ];
}
