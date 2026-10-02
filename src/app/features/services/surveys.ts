import { signal, Service } from '@angular/core';
import { Survey } from '../interfaces/survey';

@Service()
export class Surveys {
  private surveysSignal = signal<Survey[]>([
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
  ]);

  surveys = this.surveysSignal.asReadonly();

  addSurvey(survey: Survey): void {
    this.surveysSignal.update((currentSurveys) => [...currentSurveys, survey]);
  }

  getSurveyById(id: string): Survey | undefined {
    return this.surveysSignal().find((survey) => survey.id === id);
  }
}
