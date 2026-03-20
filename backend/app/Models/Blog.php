<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'related_posts' => 'array',
        'published_at' => 'date',
        'show_in_menu' => 'boolean',
    ];
}
