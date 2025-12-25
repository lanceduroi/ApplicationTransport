import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = 'http://localhost:3000/voyageurs';
    constructor(private http: HttpClient) {}

// Ajouter un utilisateur
  addUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Supprimer un utilisateur
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  }