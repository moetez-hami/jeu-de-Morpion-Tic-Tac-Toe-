<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('player_x');
            $table->string('player_o');
            $table->json('board')->default(json_encode(array_fill(0, 9, null))); // Plateau 3x3
            $table->string('current_player')->default('X');
            $table->string('winner')->nullable(); // X, O, ou null
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
