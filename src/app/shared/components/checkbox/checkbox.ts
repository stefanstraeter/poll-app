import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-checkbox',
  styleUrl: './checkbox.scss',
  templateUrl: './checkbox.html',
})
export class Checkbox {
  checked = input<boolean>(false);
  toggled = output<boolean>();

  onToggle(): void {
    this.toggled.emit(!this.checked());
  }
}

// emit() bedeutet wörtlich „aussenden" – die Checkbox-Komponente sagt damit ihrer Eltern-Komponente
// (also da, wo <app-checkbox> eingebaut wird): „Hey, hier ist gerade etwas passiert, und hier ist der neue Wert dazu."

// toggled ist ein output<boolean>() – das definiert einen Kanal, über den die Komponente boolean-Werte nach außen senden kann.
// Für sich allein passiert dabei aber noch nichts, es ist erstmal nur die Definition, dass es diesen Kanal gibt.
// this.toggled.emit(!this.checked()) ist der eigentliche Sendevorgang: Sobald der User auf die Checkbox klickt, wird onToggle() ausgeführt,
// und emit(...) schickt den neuen Wert (das Gegenteil vom aktuellen checked-Wert) durch diesen Kanal nach draußen.

// Warum überhaupt so kompliziert, statt die Checkbox einfach selbst ihren Zustand ändern zu lassen?

// Das ist eigentlich der wichtigste Punkt dahinter:
// Die Checkbox-Komponente speichert ihren eigenen Zustand nicht selbst (schau dir an: checked ist ein input(),
// kein internes Signal, das sie selbst verändert). Sie sagt nur „der User hat geklickt, hier ist der vorgeschlagene neue Wert"
// – aber die Eltern-Komponente entscheidet, ob und wie sie darauf reagiert (z. B. den Wert wirklich übernehmen, oder z. B. eine Validierung dazwischenschalten,
// bevor sie den Zustand ändert).

// Das nennt sich unidirektionaler Datenfluss:
// Daten fließen von oben (Eltern) nach unten (Kind) über input(), Ereignisse fließen von unten (Kind) nach oben (Eltern) über output()/emit().
// Das macht den Datenfluss in größeren Apps viel vorhersehbarer, weil du immer genau weißt, wer wofür "zuständig" ist.
