import { signal, Service } from '@angular/core';
import { Survey } from '../interfaces/survey';

@Service()
export class Surveys {
  private surveysSignal = signal<Survey[]>([
    {
      id: '1',
      category: 'Team activities',
      title: "Let's Plan the Next Team Event Together",
      deadline: '1 Day',
      description: '',
      questions: [],
    },
    {
      id: '2',
      category: 'Health & Wellness',
      title: 'Fit & wellness survey!',
      deadline: '2 Days',
      description: '',
      questions: [],
    },
    {
      id: '3',
      category: 'Gaming & Entertainment',
      title: 'Gaming habits and favorite games!',
      deadline: '3 Days',
      description: '',
      questions: [],
    },
    {
      id: '4',
      category: 'Team activities',
      title: 'Let`s Plan the Next Team Event Together',
      deadline: '1 Day',
      description: '',
      questions: [],
    },
    {
      id: '5',
      category: 'Gaming',
      title: 'Gaming habits and favorite games!',
      deadline: '3 Day',
      description: '',
      questions: [],
    },
    {
      id: '6',
      category: 'Gaming',
      title: 'Gaming habits and favorite games!',
      deadline: '3 Day',
      description: '',
      questions: [],
    },
    {
      id: '7',
      category: 'Healthy Lifestyle',
      title: 'Healthier future: Fit & wellness survey!',
      deadline: '2 Day',
      description: '',
      questions: [],
    },
    {
      id: '8',
      category: 'Healthy Lifestyle',
      title: 'Healthier future: Fit & wellness survey!',
      deadline: '2 Day',
      description: '',
      questions: [],
    },
    {
      id: '9',
      category: 'Team activities',
      title: 'Let`s Plan the Next Team Event Together',
      deadline: '1 Day',
      description: '',
      questions: [],
    },
  ]);

  surveys = this.surveysSignal.asReadonly();

  addSurvey(survey: Survey): void {
    this.surveysSignal.update((currentSurveys) => [...currentSurveys, survey]);
  }

  getSurveyById(id: string): Survey | undefined {
    return this.surveysSignal().find((survey) => survey.id === id);
  }
}
