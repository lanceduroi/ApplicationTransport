import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  error = '';
  form!: FormGroup;
  passwordVisible = false;


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async submit() {
    const { email, password } = this.form.value;

    const ok = await this.auth.login(email!, password!);
    if (ok) {
      this.form.reset(); // <-- réinitialise tous les champs
      this.router.navigateByUrl('/accueil');
    } else {
      this.error = 'Identifiants incorrects';
    }
  }


  navigateCreateAccount() {
    this.router.navigate(['/createcompte']);
  }
}
