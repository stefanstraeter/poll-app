import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-button',
  styleUrl: './button.scss',
  templateUrl: './button.html',
})
export class Button {
  variant = input<'primary' | 'secondary' | 'tertiary' | 'filter'>('primary');
  disabled = input<boolean>(false);
}

// <!-- Ganz normal aktiv, kein disabled nötig -->
// <app-button variant="primary">New survey</app-button>

// <!-- Nur DANN disabled, wenn du's explizit angibst -->
// <app-button variant="primary" [disabled]="true">New survey</app-button>

// <!-- Oder dynamisch, z.B. während ein Formular lädt -->
// <app-button variant="primary" [disabled]="isLoading()">New survey</app-button>
