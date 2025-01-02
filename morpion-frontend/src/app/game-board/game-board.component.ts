import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GameService } from '../Services/game.service';
import { ScoreService } from '../Services/score.service';
import { Score } from '../Commons/score.interface';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../Commons/match.interface';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class GameBoardComponent implements OnInit {

  matchId!: number;
  //score: any;
  errorMessage: string | null = null;
  board: string[] = Array(9).fill(null);
  currentPlayer: 'X' | 'O' = 'X'; // Joueur actuel
  winner: string | null = null; // Gagnant actuel
  scores!: Score ; // Initialisation avec des valeurs par défaut
  match!: Match ;


  constructor(private scoreService: ScoreService,private gameService: GameService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.matchId = +this.route.snapshot.paramMap.get('matchId')!;
    this.loadMatch();
  }

  loadMatch(): void {
    this.gameService.getMatchById(this.matchId).subscribe({
      next: (data) => {
        this.scores = data.score;
        this.match=data.match;
        console.log('Match loaded:', this.scores);
        console.log('Match loaded:', this.match);
      },
      error: (error) => console.error('Error loading match:', error)
    });
  }

  makeMove(index: number): void {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;
      this.winner = this.checkWinner();

      if (this.winner) {
        const key = `${this.winner}_score` as keyof Score;
        this.scores[key] += 1; // Correctement indexé
        this.scoreService.updateScores(this.matchId,this.scores.X_score, this.scores.O_score).subscribe();
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; // Changer de joueur
      }
    }
  }

  checkWinner() {
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
        this.winner = this.board[a] === 'X' ? this.match.player1 : this.match.player2;
        // console.log("heellllooo"+this.winner);
        // console.log(valueA);
        return this.winner; // Retourner le gagnant (X ou O)
      }
    }

    return null; // Aucun gagnant
  }

  restartGame(): void {
    this.board = Array(9).fill(null); // Réinitialiser la grille
    this.winner = null; // Réinitialiser le gagnant
  }

}
