import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonIcon,IonButton, IonText,IonInput,IonItem,IonToolbar } from '@ionic/angular/standalone';
import {
  mailOutline,
  lockClosedOutline,
  logoGoogle,
  logoGithub,
  logoFacebook,
  personAddOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { User } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonText,IonIcon,IonInput,IonItem,IonToolbar,IonButton, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
   mailOutline = mailOutline;
  lockClosedOutline = lockClosedOutline;
  logoGoogle = logoGoogle;
  logoGithub = logoGithub;
  logoFacebook = logoFacebook;
  personAddOutline = personAddOutline;
  
  email = '';
  password = '';
  errorMsg = '';

  constructor(  private router: Router, private User:User ) { }

  ngOnInit() {
  }
   login() {
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    this.User.getUsers().subscribe(users => {
      const user = users.find(u =>
        u.Email === this.email && u.MotDepasse === this.password
      );

      if (user) {
        // Sauvegarder l'utilisateur connecté
         localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Connexion réussie ✅');
        // sauvegarde simple (optionnelle)
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']); // ou page reservation
      } else {
          this.errorMsg = 'Email ou mot de passe incorrect ❌';
      }
    });

} }
