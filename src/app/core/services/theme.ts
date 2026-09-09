import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  isDarkMode = signal<boolean>(true);

  constructor() {
    effect(() => {
      if (this.isDarkMode()) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
    });
  }

  setDarkMode(value: boolean): void {
    this.isDarkMode.set(value);
  }
}
