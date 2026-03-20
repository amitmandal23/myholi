<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('location');
            $table->string('title');
            $table->string('duration');
            $table->decimal('price', 10, 2);
            $table->decimal('discounted_price', 10, 2);
            $table->text('overview');
            $table->json('highlights');
            $table->json('inclusions');
            $table->json('exclusions');
            $table->json('guidelines');
            $table->json('slots');
            $table->json('images');
            $table->string('featured_image');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
