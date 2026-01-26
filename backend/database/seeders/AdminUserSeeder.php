<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if admin user exists
        if (!User::where('email', 'admin@andamanholidaytrips.com')->exists()) {
             // Create standard admin user
             // User requested: user admin and password : admin@321
             // We'll use email as username for standard Laravel Auth, 
             // mapping 'admin' to 'admin@andamanholidaytrips.com' or just 'admin' if we want custom username login.
             // But User model uses email. So I will create an email based admin.
             
             User::create([
                'name' => 'Admin',
                'email' => 'admin@andamanholidaytrips.com', // Using a valid email format
                'password' => Hash::make('admin@321'),
            ]);
        }
    }
}
