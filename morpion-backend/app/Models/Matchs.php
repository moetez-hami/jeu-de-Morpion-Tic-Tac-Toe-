<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matchs extends Model
{
    use HasFactory;

    protected $fillable = [
        'player1',
        'player2',
        'status',
    ];

    // Relation avec le modèle Score
    public function score()
    {
        return $this->hasOne(Score::class, 'match_id');
    }
}
