import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme } from '@core/services/theme';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private theme = inject(Theme);

  isDarkMode = this.theme.isDarkMode;
}
