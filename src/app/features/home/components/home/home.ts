import { Component, signal } from '@angular/core';
import { SurveysOverview } from '@features/polls/components/surveys-overview/surveys-overview';
import { Button } from '@shared/components/button/button';

@Component({
  imports: [Button, SurveysOverview],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
