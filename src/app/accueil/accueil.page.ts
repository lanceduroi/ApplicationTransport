import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton,  IonGrid, IonCol, IonRow, IonLabel, IonIcon, IonList, IonItem } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Voyageur } from '../models/voyageur';
@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton,  IonGrid, IonCol, IonRow, IonLabel, IonIcon, IonItem],

})
export class accueilPage implements OnInit {
  nom: string = '';
  
  User: Voyageur | null = null;

  constructor(private http: HttpClient,private navCtrl: NavController,private auth: AuthService) {}

  goToReservation() { this.navCtrl.navigateForward('/home'); }
  currentUser: any;
   ngOnInit() {
     this.currentUser = this.auth.getCurrentUser();
      // Récupérer toutes les réservations
      this.http.get<any[]>('http://localhost:3000/Voyageurs')
        .subscribe(createcompte => {
          if (createcompte.length > 0) {
            // Ici on prend la dernière réservation
            const lasthome = createcompte[createcompte.length - 1];
          
          }
     });
    }
      //pour recuperer utilusateur connecter
  get fullName(): string { return this.currentUser ? `${this.currentUser.firstName} ${this.currentUser.lastName}` : ''; }
  

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
