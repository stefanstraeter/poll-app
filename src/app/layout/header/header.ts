import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  // Default ist true (für Startseite), lässt sich auf Detailseiten zu false ändern
  isDarkMode = input<boolean>(true);
}

// Auf der geöffneten Poll Seite dann
// <app-header [isDarkMode]="false" />

// routerLink="/" hinzufügen!
