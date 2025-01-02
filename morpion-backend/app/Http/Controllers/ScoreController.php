<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    // Récupérer les scores
    public function getScoreById($id)
    {

        $score = Score::with('match')->where('match_id', $id)->first();
        if (!$score) {
        // Si aucun score n'existe pour ce match, on retourne une réponse 404 ou on crée un score par défaut
        return response()->json(['message' => 'Score not found for the given match'], 404);

        // $score = Score::first();  // Vous pouvez aussi récupérer les scores par d'autres méthodes, selon la structure
        // if (!$score) {
        //     // Si les scores n'existent pas, on les initialise avec 0
        //     $score = Score::create([
        //         'X_score' => 0,
        //         'O_score' => 0
        //     ]);
        }
        return response()->json($score);
    }

    // Mettre à jour les scores
    public function updateScoresById($id,Request $request)
    {
        $score = Score::where('match_id', $id)->first();;

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
