import { Routes } from '@angular/router';
import { Home } from '@features/home/components/home/home';
import { CreateSurvey } from '@features/polls/components/create-survey/create-survey';
import { SurveyDetail } from '@features/polls/components/survey-detail/survey-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'survey/:id', component: SurveyDetail },
  { path: 'create-survey', component: CreateSurvey },
];
