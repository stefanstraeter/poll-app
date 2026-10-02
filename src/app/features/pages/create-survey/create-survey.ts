import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { Button } from '@shared/components/button/button';
import { Theme } from '@core/services/theme';
import { Notifications } from '@core/services/notifications';
import { Survey } from '@features/interfaces/survey';
import { Surveys } from '@features/services/surveys';
import { SurveyForm } from '@features/components/survey-form/survey-form';

const NAVIGATE_DELAY_MS = 1500;

@Component({
  imports: [StatusBadge, Button, SurveyForm, RouterLink],
  selector: 'app-create-survey',
  styleUrl: './create-survey.scss',
  templateUrl: './create-survey.html',
})
export class CreateSurvey implements OnInit, OnDestroy {
  private theme = inject(Theme);
  private surveysService = inject(Surveys);
  private notifications = inject(Notifications);
  private router = inject(Router);

  ngOnInit(): void {
    this.theme.setDarkMode(false);
  }

  ngOnDestroy(): void {
    this.theme.setDarkMode(true);
  }

  onSurveyCreated(survey: Survey): void {
    this.surveysService.addSurvey(survey);
    this.notifications.show('Your survey is now published');
    setTimeout(() => this.router.navigate(['/']), NAVIGATE_DELAY_MS);
  }
}
