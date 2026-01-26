<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('title');
            $table->string('duration');
            $table->decimal('price', 10, 2);
            $table->decimal('discounted_price', 10, 2);
            $table->text('overview');
            $table->string('featured_image');
            $table->json('hotel_details');
            $table->json('itinerary');
            $table->json('inclusions');
            $table->json('exclusions');
            $table->json('images');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
