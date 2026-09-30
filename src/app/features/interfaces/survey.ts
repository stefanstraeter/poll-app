import { Question } from './question';

export interface Survey {
  id: string;
  title: string;
  category: string;
  endsIn: string;
  describingText: string;
  questions: Question[];
}
