import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-textarea',
  styleUrl: './textarea.scss',
  templateUrl: './textarea.html',
})
export class Textarea {
  placeholder = input<string>('');
  value = input<string>('');
  valueChange = output<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.valueChange.emit(target.value);
  }
}
