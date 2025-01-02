import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GameService } from '../Services/game.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewMatchDialogComponent } from '../new-match-dialog/new-match-dialog.component';
import { Match } from '../Commons/match.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{

  matches: any[] = [];
  scores: Match[] = [];
  matchData: any = {};

  constructor(private dialog: MatDialog,private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.loadMatches();
  }

  loadMatches(): void {
    this.gameService.getMatches().subscribe((data: any[]) => {
      this.matches = data;
      this.scores=data;
      console.log(this.matches);
    });

  }

  openNewMatchDialog(): void {
    const dialogRef = this.dialog.open(NewMatchDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.startNewMatch(result.playerX, result.playerO);
      }
    });
  }


  startNewMatch(playerX: string, playerO: string): void {
    this.gameService.createNewMatch({ player1: playerX, player2: playerO }).subscribe({
      next: (match) => {
        this.router.navigate(['/game', match.match.id]);
        console.log('Nouveau match créé:', match);
      },
      error: (error) => console.error('Error creating match:', error)
    });
  }

  joinMatch(matchId: number): void {
    this.router.navigate(['/game', matchId]);
    console.log('Rejoindre le match:', matchId);
  }

  deleteMatch(matchId: number): void {

    this.gameService.softDeleteMatch(matchId).subscribe(() => {
      const matchIndex = this.matches.findIndex((match) => match.id === matchId);
      if (matchIndex !== -1) {
        this.matches[matchIndex].isRemoving = true;

        setTimeout(() => {
          this.matches = this.matches.filter((match) => match.id !== matchId);
        }, 500);
      }
    });
  }
}
