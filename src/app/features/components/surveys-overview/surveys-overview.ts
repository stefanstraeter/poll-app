import { Component, computed, inject, signal } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { Button } from '@shared/components/button/button';
import { Dropdown, DropdownOption } from '@shared/components/dropdown/dropdown';
import { SURVEY_CATEGORIES } from '@features/surveys/constants/survey-categories';
import { Surveys } from '../../services/surveys';

@Component({
  imports: [SurveyCard, Button, Dropdown],
  selector: 'app-surveys-overview',
  styleUrl: './surveys-overview.scss',
  templateUrl: './surveys-overview.html',
})
export class SurveysOverview {
  private surveysService = inject(Surveys);

  surveys = this.surveysService.surveys;
  endingSoonSurveys = computed(() => this.surveys().slice(0, 3));

  selectedCategory = signal('all');
  activeFilter = signal<'active' | 'past'>('active');

  setFilter(filter: 'active' | 'past'): void {
    this.activeFilter.set(filter);
  }

  categoryOptions: DropdownOption[] = [
    { value: 'all', label: 'All Surveys' },
    ...SURVEY_CATEGORIES,
  ];
}
