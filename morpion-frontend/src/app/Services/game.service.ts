import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://127.0.0.1:8000/api/games';
  constructor(private http: HttpClient) { }

  createGame(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
}

updateGame(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
}

getGames(): Observable<any> {
    return this.http.get(this.apiUrl);
}
}
