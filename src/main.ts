import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

import { mail, home, person, settings, notifications, helpCircle, calendar, cube, business, airplane, location, chatbubbles } from 'ionicons/icons';
import { addIcons } from 'ionicons';

// Ajout des icônes
addIcons({
  'mail': mail,
  'home': home,
  'person': person,
  'settings': settings,
  'notifications': notifications,
  'help-circle': helpCircle,
});


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
       provideHttpClient(),
  ],
});
