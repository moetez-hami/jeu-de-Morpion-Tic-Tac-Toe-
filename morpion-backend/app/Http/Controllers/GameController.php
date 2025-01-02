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
        $matches = Matchs::with('score')->where('deleted', 0)->get();
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


        $score = Score::create([
            'match_id' => $match->id,
            'X_score' => 0,
            'O_score' => 0,
        ]);
        return response()->json(['match' => $match, 'score' => $score]);
    }

    public function show($id)
    {
        // Trouver le match avec son score associé
        $match = Matchs::with('score')->find($id);

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

public function softDelete($id)
    {
        $match = Matchs::findOrFail($id);
        $match->deleted = 1;
        $match->save();

        return response()->json(['message' => 'Match marked as deleted.']);
    }
}
