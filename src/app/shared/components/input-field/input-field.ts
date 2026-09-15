import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-input-field',
  styleUrl: './input-field.scss',
  templateUrl: './input-field.html',
})
export class InputField {
  placeholder = input<string>('');
  value = input<string>('');
  valueChange = output<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}

/*

Der komplette Kreislauf:

User tippt 
→ Browser feuert natives input-Event 
→ onInput($event) wird aufgerufen 
→ target.value liest den neuen Text aus 
→ emit() schickt ihn über den valueChange-Kanal 
→ Eltern-Komponente empfängt ihn über (valueChange)="questionText.set($event)" 
→ aktualisiert ihr eigenes Signal.

Kurz zusammengefasst: Kein Signal "meldet sich selbst", sondern ein Browser-Ereignis (Tippen) löst die Methode aus, die dann den neuen Wert über emit() weiterreicht. Der Rest deines Verständnisses (Output-Kanal, nach draußen schicken) war schon korrekt.

*/
