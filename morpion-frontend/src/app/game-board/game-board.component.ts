import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GameService } from '../Services/game.service';
import { ScoreService } from '../Services/score.service';
import { Score } from '../Commons/score.interface';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class GameBoardComponent implements OnInit {

  board: string[] = Array(9).fill(null);
  currentPlayer: 'X' | 'O' = 'X'; // Joueur actuel
  winner: 'X' | 'O' | null = null; // Gagnant actuel
  scores: Score = { X_score: 0, O_score: 0 }; // Initialisation avec des valeurs par défaut


  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    // Récupérer les scores lors de l'initialisation du composant
    this.scoreService.getScores().subscribe(
      (score) => {
        // S'assurer que les scores ne sont pas null ou undefined avant de les affecter
        this.scores = score ? score : { X_score: 0, O_score: 0 };
        console.log(this.scores);
      },
      (error) => {
        console.error('Erreur lors de la récupération des scores:', error);
        // Si une erreur se produit, on initialise les scores avec des valeurs par défaut
        this.scores = { X_score: 0, O_score: 0 };
      }
    );
  }

  makeMove(index: number): void {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;
      this.winner = this.checkWinner();

      if (this.winner) {
        this.scores[`${this.winner}_score`] += 1; // Correctement indexé
        this.scoreService.updateScores(this.scores.X_score, this.scores.O_score).subscribe();
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; // Changer de joueur
      }
    }
  }


  checkWinner(): 'X' | 'O' | null {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
      [0, 4, 8], [2, 4, 6], // Diagonales
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      // Utiliser la conversion explicite pour indiquer que la valeur est de type 'X' | 'O' | null
      const valueA = this.board[a] as 'X' | 'O' | null;
      const valueB = this.board[b] as 'X' | 'O' | null;
      const valueC = this.board[c] as 'X' | 'O' | null;

      // Vérifie si tous les trois sont identiques et non nuls
      if (valueA && valueA === valueB && valueA === valueC) {
        return valueA; // Retourner le gagnant (X ou O)
      }
    }

    return null; // Aucun gagnant
  }

  restartGame(): void {
    this.board = Array(9).fill(null); // Réinitialiser la grille
    this.winner = null; // Réinitialiser le gagnant
  }

}
