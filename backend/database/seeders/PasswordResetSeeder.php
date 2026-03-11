<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PasswordResetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'admin@andamanholidaytrips.com')->first();
        if ($user) {
            $user->password = Hash::make('admin@321');
            $user->save();
            $this->command->info('Password reset for: ' . $user->email);
        } else {
            // Create if not exists
            User::create([
                'name' => 'Admin',
                'email' => 'admin@andamanholidaytrips.com',
                'password' => Hash::make('admin@321'),
            ]);
            $this->command->info('Admin user created with default password.');
        }
    }
}
