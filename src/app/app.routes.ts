import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'validation',
    loadComponent: () => import('./validation/validation.page').then(m => m.ValidationPage)
  },
  {
    path: 'createcompte',
    loadComponent: () => import('./createcompte/createcompte.page').then(m => m.CreatecomptePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'accueil',
    loadComponent: () => import('./accueil/accueil.page').then(m => m.AccueilPage)
  },
];
