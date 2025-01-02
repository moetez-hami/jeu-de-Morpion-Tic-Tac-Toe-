<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Matchs;
use App\Models\Score;
use Illuminate\Http\Request;

class GameController extends Controller
{
    // Récupérer la liste des matchs
    public function index()
    {
        $matches = Matchs::all();
        return response()->json($matches);
    }

    // Créer un nouveau match
    public function store(Request $request)
    {
        $request->validate([
            'player1' => 'required|string|max:255',
            'player2' => 'required|string|max:255',
        ]);

        $match = Matchs::create([
            'player1' => $request->input('player1'),
            'player2' => $request->input('player2'),
            'status' => 'in_progress',
        ]);

        // $match = Matchs::create([
        //     'player1' => 'Joueur 1', // Nom par défaut ou utilisateur authentifié
        //     'player2' => 'Joueur 2',
        //     'status' => 'in_progress',
        // ]);

        $score = Score::create([
            'match_id' => $match->id,
            'X_score' => 0, // Initialisation des scores
            'O_score' => 0,
        ]);
        return response()->json(['match' => $match, 'score' => $score]);
    }

    public function show($id)
    {
        // Trouver le match avec son score associé
        $match = Matchs::with('score')->find($id);

        // Si le match n'est pas trouvé, retourner une réponse 404
        if (!$match) {
            return response()->json(['message' => 'Match not found'], 404);
        }

        // Retourner les informations du match et du score
        return response()->json([
            'match' => $match,
            'score' => $match->score // Inclure le score associé au match
        ]);
    }

    public function showExistMatch($id)
{
    $match = Matchs::with('score')->find($id);

    if (!$match) {
        return response()->json(['message' => 'Match not found'], 404);
    }

    return response()->json($match);
}
}
