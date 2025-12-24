import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

export interface Voyageur {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string
}

@Injectable({
  providedIn: 'root',
})
export class VoyageurService {

  private apiUrl = 'http://localhost:3000/voyageurs';
  private voyageurs$ = new BehaviorSubject<Voyageur[]>([]);
  private voyageur$ = new BehaviorSubject<Voyageur | null>(null);

  constructor(private http: HttpClient, private zone: NgZone, private router: Router) {
    this.findAll();
  }

  findAll() {
    let v = this.http.get<any[]>(this.apiUrl);
    v.forEach(v => {
      console.log(v);
    })
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      const voyageurs = data.map(v => ({
        id: v.id,
        email: v.email,
        password: v.password,
        firstName: v.firstName,
        lastName: v.lastName,
        phone: v.phone
      }));
      this.voyageurs$.next(voyageurs);
    });
  }

  findById(id: number): Observable<Voyageur> {
    return this.http.get<Voyageur>(`${this.apiUrl}/${id}`).pipe(tap(v => {
      this.voyageur$.next(v);
    }));
  }

  getVoyageur(): Observable<Voyageur | null> {
    return this.voyageur$.asObservable();
  }

  getVoyageurs(): Observable<Voyageur[]> {
    return this.voyageurs$.asObservable();
  }

  create(voyageur: Voyageur): Observable<Voyageur> {
    return this.http.post<Voyageur>(this.apiUrl, voyageur).pipe(tap(() => this.findAll()));
  }

  update(id: number, voyageur: Voyageur): Observable<Voyageur> {
    return this.http.put<Voyageur>(`${this.apiUrl}/${id}`, voyageur).pipe(tap(() => this.findAll()));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(tap(() => this.findAll()));;
  }

  navigateTo(routes: any, param?: NavigationExtras | undefined) {
    this.zone.run(() => {
      console.log(routes, param);
      this.router.navigate([routes], param);
    });
  }
}
