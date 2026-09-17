import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-button',
  styleUrl: './button.scss',
  templateUrl: './button.html',
})
export class Button {
  variant = input<'primary' | 'secondary' | 'tertiary' | 'filter' | 'icon'>('primary');
  active = input<boolean>(false);
  disabled = input<boolean>(false);
}

/* 
variant = input<'primary' | 'secondary' | 'tertiary' | 'filter' | 'icon'>('primary');
Das 'primary' am Ende ist wieder der Default-Wert. 

Das heißt:

Kein variant angegeben -> nutzt automatisch 'primary'
<app-button>New survey</app-button>

Explizit angegeben -> überschreibt den Default 
<app-button variant="secondary">Add option</app-button>

Der Ablauf mittel Signal ist folgender:

1. Du gibst variant="secondary" beim Einbauen der Komponente an (oder eben nicht, dann bleibt's beim Default)
2. Das landet im Signal variant innerhalb der Button-Komponente
3. Im Template wird variant() ausgelesen und zu 'btn--secondary' zusammengebaut
4. Diese Klasse landet am <button>-Element im DOM
5. SCSS greift über .btn--secondary { ... } genau diese Klasse ab und wendet die passenden Farben/Styles an

Das Gleich läuft für disabled, nur dass der Default-Wert false ist.

Ganz normal aktiv, kein disabled nötig 
<app-button variant="primary">New survey</app-button>

Nur DANN disabled, wenn du's explizit angibst 
<app-button variant="primary" [disabled]="true">New survey</app-button>

Oder dynamisch, z.B. während ein Formular lädt
<app-button variant="primary" [disabled]="isLoading()">New survey</app-button>




*/
