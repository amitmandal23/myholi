<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        // 'features' removed from casts to allow HTML string
        'show_in_menu' => 'boolean',
    ];
}
