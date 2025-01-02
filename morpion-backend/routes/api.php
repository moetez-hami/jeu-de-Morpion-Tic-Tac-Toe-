<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\ScoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/matches', [GameController::class, 'index']);
Route::post('/matches', [GameController::class, 'store']);
Route::get('/matches/{id}', [GameController::class, 'show']);
Route::get('/matchesExist/{id}', [GameController::class, 'showExistMatch']);
Route::get('/scores/{id}', [ScoreController::class, 'getScoresById']);
Route::post('/scores/{id}', [ScoreController::class, 'updateScoresById']);
