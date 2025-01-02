<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    // Nom de la table (si ce n'est pas le pluriel de la classe)
    protected $table = 'scores';

    // Colonnes qui peuvent être assignées en masse
    protected $fillable = [ 'match_id','X_score', 'O_score','draws'];

    // Relation avec le modèle Match
    public function match()
    {
        return $this->belongsTo(Matchs::class);
    }
}
