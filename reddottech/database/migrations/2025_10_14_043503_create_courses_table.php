<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('instructor_name')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('start_date')->nullable();
            $table->string('duration')->nullable();
            $table->enum('delivery', ['online', 'physical'])->default('online');
            $table->string('mode')->nullable();
            $table->string('language')->nullable()->default('English');
            $table->enum('status', ['draft', 'published'])->default('published');
            $table->string('certification')->nullable()->default('pecp');
            $table->string('thumbnail')->nullable();
            $table->string('banner_image')->nullable();
            $table->enum('skill_level', ['beginner', 'intermediate', 'advanced'])->nullable();
            $table->text('curriculum')->nullable();
            $table->text('instructor_detail')->nullable();
            $table->text('requirements')->nullable();
            $table->timestamps();
            
            $table->index('status');
            $table->index('delivery');
            $table->index('skill_level');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};