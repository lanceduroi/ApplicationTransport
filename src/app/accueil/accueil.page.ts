import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonLabel, IonCard, IonCardContent, IonList, IonInput, IonButton, IonItem, IonIcon, IonCol, IonRow, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonLabel, IonList, IonInput, IonButton, IonItem, IonCol, IonRow, IonIcon, IonCard, IonCardContent, IonButtons]
})
export class AccueilPage implements OnInit {

  constructor(private router: Router, private auth: AuthService) {

  }
  currentUser: any;
  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  navigateToReservation() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
