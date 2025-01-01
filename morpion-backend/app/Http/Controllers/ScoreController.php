<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    // Récupérer les scores
    public function getScores()
    {
        $score = Score::first();  // Vous pouvez aussi récupérer les scores par d'autres méthodes, selon la structure
        if (!$score) {
            // Si les scores n'existent pas, on les initialise avec 0
            $score = Score::create([
                'X_score' => 0,
                'O_score' => 0
            ]);
        }
        return response()->json($score);
    }

    // Mettre à jour les scores
    public function updateScores(Request $request)
    {
        $score = Score::first();

        if (!$score) {
            // Si aucun score n'existe encore, on crée un nouveau record
            $score = Score::create([
                'X_score' => 0,
                'O_score' => 0
            ]);
        }

        $score->X_score = $request->X_score;
        $score->O_score = $request->O_score;
        $score->save();

        return response()->json($score);
    }
}
