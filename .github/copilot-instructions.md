# Copilot instructions — applitansportv

Bref: dépôt Ionic + Angular (composants standalone) + Capacitor — guide concis

- **Stack & scripts**: Angular 20, Ionic 8, Capacitor 8. Scripts utiles:
  - `npm start` (ng serve), `npm run build`, `npm run watch`, `npm test`, `npm run lint`.

- **Points d'entrée importants**:
  - Routes lazy: [src/app/app.routes.ts](src/app/app.routes.ts#L1-L20)
  - Pages (standalone): [src/app/home/home.page.ts](src/app/home/home.page.ts#L1-L200), [src/app/validation/validation.page.ts](src/app/validation/validation.page.ts#L1-L200), [src/app/createcompte/createcompte.page.ts](src/app/createcompte/createcompte.page.ts#L1-L200)
  - Service HTTP central: [src/app/reservation.ts](src/app/reservation.ts#L1-L200)
  - Capacitor config: [capacitor.config.ts](capacitor.config.ts#L1-L50) (webDir: `www`)

- **Architecture & pattern clés**:
  - Pages sont `standalone: true` et importent explicitement modules nécessaires (`FormsModule`, `CommonModule`, composants Ionic).
  - Routes utilisent `loadComponent` pour lazy-loading (ne pas refactorer sans mettre à jour `app.routes.ts`).
  - `Reservation` est le service central pour l'API (URL par défaut: `http://localhost:3000/Reservation`).
  - Styles SCSS globaux: `src/global.scss` et variables dans `src/theme/variables.scss`.

- **Règles pratiques pour un agent IA**:
  - Ne pas supprimer la lazy-loading — respecter `loadComponent` et `standalone: true`.
  - Lors de l'ajout/modification d'un composant standalone, explicitement ajouter tous les imports nécessaires dans le décorateur `@Component({ imports: [...] })`.
  - Pour changer l'API backend, mettre à jour uniquement `src/app/reservation.ts` et laisser un commentaire clarifiant l'URL.
  - Tests: utiliser `npm test` (Karma + Jasmine). Vérifier `karma.conf.js` si les tests échouent.

- **Environnement dev & backend local**:
  - L'API de dev attend `http://localhost:3000/Reservation`. Pour lancer rapidement une fausse API:

```bash
npx json-server --watch bd.json --port 3000
```

  - Note: dans le terminal d'origine une commande mal tapée `jeson-server --watch bd.json` peut échouer — utiliser `npx json-server`.

- **Exemples concrets dans le code**:
  - Route lazy: voir [src/app/app.routes.ts](src/app/app.routes.ts#L1-L20).
  - Utilisation du service: `this.reservation.addReservation(this.reservationData).subscribe(...)` dans [src/app/home/home.page.ts](src/app/home/home.page.ts#L1-L200).

- **Conseils de contribution**:
  - Tester localement: `npm start` puis lancer `npx json-server --watch bd.json --port 3000` si besoin.
  - Pour build mobile: `npm run build` puis `npx cap sync` / `npx cap open <platform>`.
  - Eviter refactors globaux des routes ou du pattern standalone sans tests et sans mise à jour des imports.

Si vous voulez, je peux: générer des exemples de PR, ajouter checklists CI, ou créer un petit script pour démarrer le backend mock.
# Copilot instructions — applitansportv

Bref: Ce dépôt est une application Ionic + Angular (standalone components) utilisant Capacitor. Ces instructions aident un agent IA à être productif rapidement.

- **Stack**: Angular 20, Ionic 8, Capacitor 8. Voir `package.json` pour scripts et dépendances.
- **Entrées principales**:
  - Routes & lazy-loading: [src/app/app.routes.ts](src/app/app.routes.ts#L1-L20)
  - Composants pages: [src/app/home/home.page.ts](src/app/home/home.page.ts#L1-L200), [src/app/validation/validation.page.ts](src/app/validation/validation.page.ts#L1-L200)
  - Point d'entrée: [src/app/app.component.ts](src/app/app.component.ts#L1-L200)
  - Service HTTP: [src/app/reservation.ts](src/app/reservation.ts#L1-L200) (backend: `http://localhost:3000/Reservation`)
  - Configuration Capacitor: [capacitor.config.ts](capacitor.config.ts#L1-L50) (webDir: `www`)

- **Architecture — résumé**:
  - Application mobile-web hybride: UI Ionic + logique Angular.
  - Pages sont des composants standalone lazy-loaded via `loadComponent` (voir `app.routes.ts`).
  - `Reservation` est un service injectable utilisé par `HomePage` pour POST/GET vers une API locale.
  - Styles globaux dans `src/global.scss` + variables dans `src/theme/variables.scss`.

- **Conventions importantes à respecter**:
  - Composants sont créés en `standalone: true` et importent explicitement les modules Ionic/Angular nécessaires.
  - Utiliser SCSS pour tout style (fichiers `.scss` dans `src/app/**`).
  - Les pages chargent des dépendances via `imports: [...]` dans le décorateur `@Component`.
  - Les appels réseau utilisent `HttpClient` et retournent `Observable`.

- **Dev / build / test workflows** (exécutables depuis la racine):
  - Démarrer le serveur de dev: `npm start` (alias `ng serve`).
  - Construire: `npm run build` (alias `ng build`).
  - Watch build: `npm run watch` pour rebuild en dev.
  - Tests unitaires: `npm test` (Karma + Jasmine). Voir `karma.conf.js`.
  - Lint: `npm run lint` (via `@angular-eslint`).
  - Pour déployer sur appareil (Capacitor): utiliser les commandes `npx cap sync` / `npx cap open <platform>` après `npm run build` (note: vérifier la plateforme cible localement).

- **Points d'intégration à connaître**:
  - Backend attendu en dev: `http://localhost:3000/Reservation` (modifier `src/app/reservation.ts` si nécessaire).
  - Ionic/ionicons sont utilisés pour les icônes (voir `home.page.ts` imports `ionicons/icons`).

- **Patterns de code observés (exemples)**:
  - Lazy route: { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) } ([app.routes.ts](src/app/app.routes.ts#L1-L20)).
  - Service usage: `this.reservation.addReservation(this.reservationData).subscribe(...)` dans `HomePage.saveReservation()` ([src/app/home/home.page.ts](src/app/home/home.page.ts#L1-L200)).

- **Conseils pratiques pour contributions IA**:
  - Préférez modifications locales et tests via `npm start` + `npm test` avant PR.
  - Quand vous modifiez un composant standalone, ajoutez explicitement tout import requis (ex: `FormsModule`, `CommonModule`, `HttpClientModule` au bootstrap si nécessaire).
  - Ne changez pas la structure de lazy-loading sauf si vous mettez à jour toutes les routes correspondantes.
  - Si vous modifiez l'URL backend, faites-le dans `src/app/reservation.ts` et documentez le changement dans le README ou un commentaire.

Si une section est incomplète ou si vous voulez que j'ajoute des exemples de PR ou des scripts CI, dites-moi quelles parts développer en priorité.
