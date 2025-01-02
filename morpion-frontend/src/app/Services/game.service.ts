import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8000/api/matches'; // URL de l'API Laravel
  constructor(private http: HttpClient) { }

  // Récupérer la liste des matchs
  getMatches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Créer un nouveau match
  createNewMatch(matchData: { player1: string; player2: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, matchData);
  }

  getMatchById(matchId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${matchId}`);
  }
}
