<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Packages
        DB::statement('ALTER TABLE packages MODIFY inclusions LONGTEXT');
        DB::statement('ALTER TABLE packages MODIFY exclusions LONGTEXT');

        // Activities
        DB::statement('ALTER TABLE activities MODIFY highlights LONGTEXT');
        DB::statement('ALTER TABLE activities MODIFY inclusions LONGTEXT');
        DB::statement('ALTER TABLE activities MODIFY exclusions LONGTEXT');
        DB::statement('ALTER TABLE activities MODIFY guidelines LONGTEXT');

        // Destinations
        DB::statement('ALTER TABLE destinations MODIFY attractions LONGTEXT');
        
        // Services
        DB::statement('ALTER TABLE services MODIFY features LONGTEXT');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Note: Converting back to JSON might fail if data is not valid JSON.
        // This down method is best effort.
        
        // Packages
        DB::statement('ALTER TABLE packages MODIFY inclusions JSON');
        DB::statement('ALTER TABLE packages MODIFY exclusions JSON');

        // Activities
        DB::statement('ALTER TABLE activities MODIFY highlights JSON');
        DB::statement('ALTER TABLE activities MODIFY inclusions JSON');
        DB::statement('ALTER TABLE activities MODIFY exclusions JSON');
        DB::statement('ALTER TABLE activities MODIFY guidelines JSON');

        // Destinations
        DB::statement('ALTER TABLE destinations MODIFY attractions JSON');
        
        // Services
        DB::statement('ALTER TABLE services MODIFY features JSON');
    }
};
