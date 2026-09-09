import { Component, inject } from '@angular/core';
import { Theme } from '@core/services/theme';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private theme = inject(Theme);

  isDarkMode = this.theme.isDarkMode;
}
