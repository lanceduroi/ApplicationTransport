import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import {
  addOutline,
  createOutline,
  trashOutline,
  personOutline,
  closeCircleOutline,
  phonePortraitOutline,
  mailOutline,
  closeOutline,
  saveOutline,
  logInOutline,
  logOutOutline,
  lockClosedOutline,
  eyeOffOutline,
  eyeOutline,
  arrowBackOutline,
  personAddOutline,
  logoGoogle,
  logoGithub,
  logoFacebook,
  businessOutline,
  personCircleOutline,
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

import { mail, home, person, settings, notifications, helpCircle, calendar, cube, business, airplane, location, chatbubbles, refreshCircle, ticketOutline, cubeOutline, locateOutline, busOutline, bulbOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

// Ajout des icônes
addIcons({
  'mail': mail,
  'home': home,
  'person': person,
  'settings': settings,
  'notifications': notifications,
  'help-circle': helpCircle,
   'refresh-circle':refreshCircle,
   'ticket-outline':ticketOutline,
   'cube-outline':cubeOutline,
   'location-outline':locateOutline,
   'bus-outline':busOutline,
   'bulb-outline':bulbOutline,
   'business-outline':businessOutline,
   'logoGoogle':logoGoogle,
  'logoGithub':logoGithub,
  'logoFacebook':logoFacebook,
  'person-circle-outline':personCircleOutline
});


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
  ],
});
