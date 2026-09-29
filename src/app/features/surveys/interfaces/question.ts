export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  allowMultiple: boolean;
  answers: Answer[];
}
