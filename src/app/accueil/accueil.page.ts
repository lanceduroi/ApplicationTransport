import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonGrid,IonLabel,IonCard,IonCardContent,IonList,IonInput,IonButton,IonItem,IonIcon,IonCol,IonRow} from '@ionic/angular/standalone';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonGrid,IonLabel,IonList,IonInput,IonButton,IonItem,IonCol, IonRow,IonIcon,IonCard,IonCardContent]
})
export class AccueilPage implements OnInit {

  constructor() {

   }
 currentUser: any;
  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

}
