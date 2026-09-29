import { Component, signal } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { Button } from '@shared/components/button/button';
import { Dropdown, DropdownOption } from '@shared/components/dropdown/dropdown';
import { SURVEY_CATEGORIES } from '@features/surveys/constants/survey-categories';

interface Poll {
  category: string;
  title: string;
  endsIn: string;
}

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

  endingSoonPolls: Poll[] = [
    {
      category: 'Team activities',
      title: "Let's Plan the Next Team Event Together",
      endsIn: '1 Day',
    },
    {
      category: 'Health & Wellness',
      title: 'Fit & wellness survey!',
      endsIn: '2 Days',
    },
    {
      category: 'Gaming & Entertainment',
      title: 'Gaming habits and favorite games!',
      endsIn: '3 Days',
    },
  ];

  allPolls: Poll[] = [
    {
      category: 'Team activities',
      title: 'Let`s Plan the Next Team Event Together',
      endsIn: '1 Day',
    },
    {
      category: 'Gaming',
      title: 'Gaming habits and favorite games!',
      endsIn: '3 Day',
    },
    {
      category: 'Gaming',
      title: 'Gaming habits and favorite games!',
      endsIn: '3 Day',
    },
    {
      category: 'Healthy Lifestyle',
      title: 'Healthier future: Fit & wellness survey!',
      endsIn: '2 Day',
    },
    {
      category: 'Healthy Lifestyle',
      title: 'Healthier future: Fit & wellness survey!',
      endsIn: '2 Day',
    },
    {
      category: 'Team activities',
      title: 'Let`s Plan the Next Team Event Together',
      endsIn: '1 Day',
    },
  ];

  categoryOptions: DropdownOption[] = [
    { value: 'all', label: 'All Surveys' },
    ...SURVEY_CATEGORIES,
  ];
}
