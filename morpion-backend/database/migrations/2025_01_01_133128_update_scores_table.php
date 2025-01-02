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
        Schema::table('scores', function (Blueprint $table) {
            $table->foreignId('match_id')->constrained('matchs')->onDelete('cascade'); // Clé étrangère vers match
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('scores', function (Blueprint $table) {
            // Pour annuler la modification (si vous devez revenir en arrière)
            $table->dropColumn('match_id');
        });
    }
};
