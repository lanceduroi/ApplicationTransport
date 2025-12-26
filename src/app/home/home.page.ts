import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonList, IonSelect,
  IonSelectOption, IonLabel, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { Reservation } from '../reservation';
import { IonIcon, IonToggle } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  IonCard
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  calendarOutline,
  cashOutline,
  starOutline,
  createOutline,
  trashOutline, busOutline, saveOutline, timeOutline, personAddOutline
} from 'ionicons/icons';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonList,
    FormsModule,
    IonSelect,
    IonSelectOption,
    IonLabel,
    CommonModule,
    IonIcon,
    IonCard,
    IonButtons, IonBackButton

  ],
})
export class HomePage {
  typesReservation: string[] = ['standard', 'VIP'];
  villesNiger: string[] = [
    'Niamey',
    'Zinder',
    'Maradi',
    'Tahoua',
    'Agadez',
    'Diffa',
    'Dosso',
    'Tillabéri',
    'Téra',
    'Birni N’Konni'
  ];
  reservationData = {
    VilleDepart: '',
    VilleArrivee: '',
    DateDepart: '',
    typeReservation: '',
    DateReservation: '',
    montant: 0,
    status: ''
  };
  showReservations = false;
  reservations: any[] = [];
  editMode = false;
  editId: number | null = null;
  currentUser: any;
  constructor(private reservation: Reservation,
    private router: Router,private auth: AuthService) {
    addIcons({ busOutline, locationOutline, calendarOutline, starOutline, cashOutline, saveOutline, timeOutline, createOutline, trashOutline, personAddOutline });
  }
  
  toggleReservations() {
    this.showReservations = !this.showReservations;
    //le boutton est desactive tant que le formulaire n'est pas remplit
    // Charger les réservations seulement au clic
    if (this.showReservations && this.reservations.length === 0) {
      this.loadReservations();
    }
  }
  //suppression
  deleteReservation(id: number) {
    if (confirm('Supprimer cette réservation ?')) {
      this.reservation.deleteReservation(id).subscribe(() => {
        this.loadReservations();
      });
    }
  }
  //modifiay
  editReservation(r: any) {
    this.editMode = true;
    this.editId = r.id;
    this.reservationData = { ...r };
  }
  loadReservations() {
    this.reservation.getReservations().subscribe(data => {
      this.reservations = data.sort(
        (a: any, b: any) =>
          new Date(b.DateReservation).getTime() -
          new Date(a.DateReservation).getTime()
      );
    });
  }

  updateMontant() {
    if (this.reservationData.typeReservation === 'VIP') {
      this.reservationData.montant = 10000; // montant pour VIP
    } else if (this.reservationData.typeReservation === 'standard') {
      this.reservationData.montant = 5000; // montant pour standard
    } else {
      this.reservationData.montant = 0; // par défaut
    }
  }

  updateDateReservation() {
    // Date et heure actuelles
    const now = new Date();

    // Formatage : "YYYY-MM-DDTHH:mm" (compatible ion-datetime)
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // mois commence à 0
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    this.reservationData.DateReservation = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }
  saveReservation() {
    if (!this.reservationData.VilleDepart || !this.reservationData.VilleArrivee || !this.reservationData.DateDepart || !this.reservationData.typeReservation) { alert('Veuillez renseigner tous les champs obligatoires'); return; }

    // Date réservation automatique
    this.updateDateReservation();

    if (this.editMode && this.editId !== null) {
      // MODE MODIFICATION
      this.reservation.updateReservation(this.editId, this.reservationData)
        .subscribe(() => {
          alert('Réservation modifiée avec succès');

          this.resetForm();
          this.loadReservations();
        });
    } else {
      // MODE CREATION

      this.reservationData.status = 'nonvalider';
      this.updateDateReservation()
      this.reservation.addReservation(this.reservationData)
        .subscribe(() => {
          alert('Réservation ajoutée avec succès');
          // Aller vers la page validation
          this.router.navigate(['/validation']);
          this.resetForm();
          this.loadReservations();
        });
    }

  }
  resetForm() {
    this.reservationData = {
      VilleDepart: '',
      VilleArrivee: '',
      DateDepart: '',
      typeReservation: '',
      DateReservation: '',
      montant: 0,
      status: 'nonvalider'
    };
    this.editMode = false;
    this.editId = null;
  }

  navigateToCreateNewUser() {
    this.router.navigate(['/createcompte']);
  }
}
