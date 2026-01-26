<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'images' => 'array',
        // 'attractions' => 'array', // Removed to allow HTML string from RichTextEditor
        'show_in_menu' => 'boolean',
    ];
}
