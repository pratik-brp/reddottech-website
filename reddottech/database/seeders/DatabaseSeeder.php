<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@reddottech.com',
                'email_verified_at' => now(),
                'password' => Hash::make('admin@reddottech'),
                'created_at' => now(),
                'updated_at' => now(),
            ],);
    }
}
