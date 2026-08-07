<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        DB::table('settings')->insert([
            ['key' => 'batch_banner_title', 'value' => 'First batch begins November 15, 2025. <br /> Limited seats available.'],
            ['key' => 'batch_banner_subtitle', 'value' => 'Take the next step toward a globally recognized career.'],
            ['key' => 'batch_banner_button_text', 'value' => 'Enroll Now'],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
