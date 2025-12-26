import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { VoyageurService } from 'src/app/services/voyageur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createcompte',
  templateUrl: './createcompte.page.html',
  styleUrls: ['./createcompte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CreatecomptePage implements OnInit {
  nom: string = '';

  form!: FormGroup;
  error = '';
  passwordVisible = false;

  constructor(private navCtrl: NavController, private fb: FormBuilder, private voyageurService: VoyageurService, private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const newVoyageur = {
    id: Date.now().toString(),
    firstName: this.form.value.firstName,
    lastName: this.form.value.lastName,
    phone: this.form.value.phone,
    email: this.form.value.email,
    password: this.form.value.password
  };

  this.voyageurService.create(newVoyageur).subscribe({
    next: () => {
      alert('✅ Votre compte a été créé avec succès');
      this.form.reset(); // <-- réinitialise tous les champs
      this.router.navigateByUrl('/login');
    },
    error: () => {
      this.error = '❌ Erreur lors de la création du compte';
    }
  });
  }

  goBack() {
    this.navCtrl.back();
  }
}
