import { Component, signal } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { Button } from '@shared/components/button/button';
import { Dropdown, DropdownOption } from '@shared/components/dropdown/dropdown';
import { SURVEY_CATEGORIES } from '@features/surveys/constants/survey-categories';
import { Survey } from '@features/surveys/interfaces/survey';

@Component({
  imports: [SurveyCard, Button, Dropdown],
  selector: 'app-surveys-overview',
  styleUrl: './surveys-overview.scss',
  templateUrl: './surveys-overview.html',
})
export class SurveysOverview {
  selectedCategory = signal('all');
  activeFilter = signal<'active' | 'past'>('active');

  setFilter(filter: 'active' | 'past'): void {
    this.activeFilter.set(filter);
  }

  endingSoonSurveys: Survey[] = [
    {
      id: '1',
      category: 'Team activities',
      title: "Let's Plan the Next Team Event Together",
      endsIn: '1 Day',
      describingText: '',
      questions: [],
    },
    {
      id: '2',
      category: 'Health & Wellness',
      title: 'Fit & wellness survey!',
      endsIn: '2 Days',
      describingText: '',
      questions: [],
    },
    {
      id: '3',
      category: 'Gaming & Entertainment',
      title: 'Gaming habits and favorite games!',
      endsIn: '3 Days',
      describingText: '',
      questions: [],
    },
  ];

  allSurveys: Survey[] = [
    {
      id: '4',
      category: 'Team activities',
      title: 'Let`s Plan the Next Team Event Together',
      endsIn: '1 Day',
      describingText: '',
      questions: [],
    },
    {
      id: '5',
      category: 'Gaming',
      title: 'Gaming habits and favorite games!',
      endsIn: '3 Day',
      describingText: '',
      questions: [],
    },
    {
      id: '6',
      category: 'Gaming',
      title: 'Gaming habits and favorite games!',
      endsIn: '3 Day',
      describingText: '',
      questions: [],
    },
    {
      id: '7',
      category: 'Healthy Lifestyle',
      title: 'Healthier future: Fit & wellness survey!',
      endsIn: '2 Day',
      describingText: '',
      questions: [],
    },
    {
      id: '8',
      category: 'Healthy Lifestyle',
      title: 'Healthier future: Fit & wellness survey!',
      endsIn: '2 Day',
      describingText: '',
      questions: [],
    },
    {
      id: '9',
      category: 'Team activities',
      title: 'Let`s Plan the Next Team Event Together',
      endsIn: '1 Day',
      describingText: '',
      questions: [],
    },
  ];

  categoryOptions: DropdownOption[] = [
    { value: 'all', label: 'All Surveys' },
    ...SURVEY_CATEGORIES,
  ];
}
