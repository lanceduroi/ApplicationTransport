import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, IonIcon, IonList, IonItem } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Product } from '../product.interface';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import{ clipboard } from 'ionicons/icons';

@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonGrid, IonCol, IonRow, IonLabel, IonIcon, IonList, IonItem],

})
export class accueilPage implements OnInit {
  nom: string = '';
  products: Product[] = [];

  constructor(private http: HttpClient,private navCtrl: NavController ) {}

  goToReservation() { this.navCtrl.navigateForward('/home'); }

   ngOnInit() {
      // Récupérer toutes les réservations
      this.http.get<any[]>('http://localhost:3000/home')
        .subscribe(home => {
          if (home.length > 0) {
            // Ici on prend la dernière réservation
            const lasthome = home[home.length - 1];
            this.nom = lasthome.nom;
          }
        });
    }

  showMessage1() {
    alert('Bienvenue sur le bouton secondaire');
  }

  showMessage2() {
    alert('Tout ce que tu fais, moi je le fais en mieux');
  }

  showMessage3() {
    alert('Bienvenue sur le bouton principal');
  }

  doSomething() {
    console.log('Bouton cliqué !');
    alert('BSB LA MALA_GANG');
  }
action(msg: string) {
    alert(msg);
  }

  //action(icone: string) {
  //  this.router.navigate(['/reservations']);
   // console.log('Clic sur l’icône', icone);

  //}
}
