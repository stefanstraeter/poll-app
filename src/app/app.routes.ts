import { Routes } from '@angular/router';
import { Home } from '@features/pages/home/home';
import { CreateSurvey } from '@features/pages/create-survey/create-survey';
import { SurveyDetail } from '@features/pages/survey-detail/survey-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'survey/:id', component: SurveyDetail },
  { path: 'create-survey', component: CreateSurvey },
];
