import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-poll-card',
  styleUrl: './poll-card.scss',
  templateUrl: './poll-card.html',
})
export class PollCard {
  category = input.required<string>();
  title = input.required<string>();
  endsIn = input.required<string>();
  variant = input<'highlight' | 'list'>('list');
}
