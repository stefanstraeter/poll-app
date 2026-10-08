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
  borderColor = input<'light' | 'dark'>('light');

  onToggle(): void {
    this.toggled.emit(!this.checked());
  }
}
