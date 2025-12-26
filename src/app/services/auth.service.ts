import { Injectable } from '@angular/core';
import { VoyageurService } from './voyageur.service';
import { firstValueFrom } from 'rxjs';
import { Voyageur } from '../models/voyageur';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY = 'currentUser';

  constructor(private voyageurService: VoyageurService) {}

  async login(email: string, password: string): Promise<boolean> {
    const voyageurs = await firstValueFrom(this.voyageurService.getVoyageurs());

    const user = voyageurs.find(
      v => v.email === email && v.password === password
    );

    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getCurrentUser(): Voyageur | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }
}