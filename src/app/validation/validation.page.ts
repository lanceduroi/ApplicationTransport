import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonItem ,IonButton,
  IonButtons,IonIcon, IonCardSubtitle,IonLabel,
  IonBackButton} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Reservation } from '../reservation';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-validation',
  templateUrl: './validation.page.html',
  styleUrls: ['./validation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonItem,IonButton,  IonIcon,IonCardSubtitle,
  IonButtons,
  IonBackButton, IonCard,IonLabel,
  IonCardHeader,
  IonCardTitle,
  IonCardContent]
})
export class ValidationPage implements OnInit {
   lastReservation: any;
  constructor(private router: Router, private reservation: Reservation) { }
  currentUser: any;
  ngOnInit() {
   this.loadLastReservation()
     const userData = localStorage.getItem('currentUser');

  if (userData) {
    this.currentUser = JSON.parse(userData);
  }
  }
  //Annulation
  annulerReservation() {
  const ok = confirm('Voulez-vous vraiment annuler cette réservation ?');

  if (!ok) return;

  this.reservation.deleteReservation(this.lastReservation.id)
    .subscribe(() => {
      alert('Réservation annulée ❌');
      this.lastReservation = null;
        this.router.navigate(['/home']); // redirection
    });
}
  //validation
   ionViewWillEnter() {
    this.loadLastReservation();
  }
  validateReservation() {
    const updated = {
      ...this.lastReservation,
      status: 'valider'
    };

    this.reservation.updateReservation(this.lastReservation.id, updated)
      .subscribe(() => {
        alert('Réservation validée ✅');
        this.loadLastReservation();
    
      });
  }
  loadLastReservation() {
    this.reservation.getReservations().subscribe(data => {
      if (data.length > 0) {
        // Trier par DateReservation
        data.sort((a, b) =>
          new Date(a.DateReservation).getTime() -
          new Date(b.DateReservation).getTime()
        );

        // Prendre la dernière
        this.lastReservation = data[data.length - 1];
       
      }
      
    });
    

}   

}
