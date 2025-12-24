import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { VoyageurService } from './voyageur.service';
import { Voyageur } from '../models/voyageur';
BehaviorSubject

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private STORAGE_KEY = 'loggedVoyageur';
  constructor(private service: VoyageurService) { }

  async login(email: string, password: string): Promise<boolean> {
    const voyageurs = await firstValueFrom(this.service.getVoyageurs());
    const v1 = voyageurs.find(v => v.email === email && v.password === password);

    if (v1) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(v1));
      return true;
    }
    return false;
  }


  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  getVoyageur(): Voyageur | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
}
