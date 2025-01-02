import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GameService } from '../Services/game.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewMatchDialogComponent } from '../new-match-dialog/new-match-dialog.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{

  matches: any[] = [];
  matchData: any = {};

  constructor(private dialog: MatDialog,private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer la liste des matchs
      this.loadMatches();
  }

  loadMatches(): void {
    this.gameService.getMatches().subscribe((data: any[]) => {
      this.matches = data;
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


    // ({ player_x: playerX, player_o: playerO }).subscribe((match) => {
    //   // Redirigez vers l'interface de jeu avec l'ID du match
    //   //console.log(match.match.id);
    //   this.router.navigate(['/game', match.match.id]);

    // });

  }

  joinMatch(matchId: number): void {
    // Rediriger vers l'interface du jeu en continuant un match
    this.router.navigate(['/game', matchId]);
    console.log('Rejoindre le match:', matchId);
  }

  deleteMatch(matchId: number): void {

    this.gameService.softDeleteMatch(matchId).subscribe(() => {
      const matchIndex = this.matches.findIndex((match) => match.id === matchId);
      if (matchIndex !== -1) {
        // Ajouter une propriété temporaire pour activer l'animation
        this.matches[matchIndex].isRemoving = true;

        // Attendre la fin de l'animation (500ms) avant de supprimer
        setTimeout(() => {
          this.matches = this.matches.filter((match) => match.id !== matchId);
        }, 500); // Durée identique à celle définie dans le CSS
      }
    });
  }
}
