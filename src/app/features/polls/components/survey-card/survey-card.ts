import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-survey-card',
  styleUrl: './survey-card.scss',
  templateUrl: './survey-card.html',
})
export class SurveyCard {
  category = input.required<string>();
  title = input.required<string>();
  endsIn = input.required<string>();
  variant = input<'highlight' | 'list'>('list');
}
