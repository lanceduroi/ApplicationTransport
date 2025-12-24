import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Reservation {
  private apiUrl = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) { }

  // Ajouter une réservation
  addReservation(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Récupérer les réservations
  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  //supprimer
  deleteReservation(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  //Modifier
  updateReservation(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  //dernier reservation
  getLastReservation() {
    return this.http.get<any[]>(
      'http://localhost:3000/Reservation?_sort=DateReservation&_order=desc&_limit=1'
    );
  }

}
