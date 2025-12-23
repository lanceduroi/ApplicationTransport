import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonButton,IonCard,IonButtons,IonCardContent,IonToolbar, IonIcon,IonList ,IonItem,IonInput,IonCol, IonBackButton} from '@ionic/angular/standalone';
import { User } from '../user';
@Component({
  selector: 'app-createcompte',
  templateUrl: './createcompte.page.html',
  styleUrls: ['./createcompte.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,IonCard,IonCardContent,IonCol,IonButtons,IonButton,IonInput, IonItem,IonBackButton,IonToolbar, CommonModule, IonIcon,FormsModule,IonList]
})
export class CreatecomptePage implements OnInit {
  userData = {
    Nom: '',
    Prenom: '',
    Telephone: '',
    Email: '',
    MotDepasse: ''
  };
  constructor(private User:User) { }
  ngOnInit() {}
saveUser(){
    if (
      !this.userData.Nom ||
      !this.userData.Prenom ||
      !this.userData.Telephone ||
      !this.userData.Email ||
      !this.userData.MotDepasse
    ) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    this.User.addUser(this.userData).subscribe(() => {
      alert('Utilisateur créé avec succès');

      this.userData = {
        Nom: '',
        Prenom: '',
        Telephone: '',
        Email: '',
        MotDepasse: ''
      };
    });
  }
 
  

}
