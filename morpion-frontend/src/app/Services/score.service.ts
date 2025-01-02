import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Score {
  X_score: number;
  O_score: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private apiUrl = 'http://localhost:8000/api/scores'; // URL de l'API Laravel

  constructor(private http: HttpClient) { }

   // Récupérer les scores
   getScoreByMatchId(matchId: number): Observable<Score> {
    return this.http.get<Score>(`this.apiUrl/${matchId}`);
  }

  // Mettre à jour les scores
  updateScores(matchId: number,X_score: number, O_score: number, draws:number): Observable<Score> {
    // Si les scores sont null ou undefined, initialise-les à 0
    const payload = {
      X_score: X_score || 0,  // Si X_score est null ou undefined, met 0
      O_score: O_score || 0,   // Si O_score est null ou undefined, met 0
      draws: draws || 0
    };
    return this.http.post<Score>(`http://localhost:8000/api/scores/${matchId}`,payload);
  }
}
