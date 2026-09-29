import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { Button } from '@shared/components/button/button';
import { InputField } from '@shared/components/input-field/input-field';
import { Textarea } from '@shared/components/textarea/textarea';
import { Dropdown, DropdownOption } from '@shared/components/dropdown/dropdown';
import { Checkbox } from '@shared/components/checkbox/checkbox';
import { Theme } from '@core/services/theme';
import { SURVEY_CATEGORIES } from '@features/surveys/constants/survey-categories';

interface Answer {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  allowMultiple: boolean;
  answers: Answer[];
}

const MAX_ANSWERS = 8;

function createEmptyAnswer(): Answer {
  return { id: crypto.randomUUID(), text: '' };
}

function createEmptyQuestion(): Question {
  return {
    id: crypto.randomUUID(),
    text: '',
    allowMultiple: false,
    answers: [createEmptyAnswer(), createEmptyAnswer()],
  };
}

@Component({
  imports: [
    StatusBadge,
    Button,
    InputField,
    Textarea,
    Dropdown,
    Checkbox,
    ReactiveFormsModule,
  ],
  selector: 'app-create-survey',
  styleUrl: './create-survey.scss',
  templateUrl: './create-survey.html',
})
export class CreateSurvey implements OnInit, OnDestroy {
  private theme = inject(Theme);

  // Pilot: einziges Feld, das schon auf Reactive Forms umgestellt ist.
  titleControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  endDate = signal('');
  describingText = signal('');
  selectedCategory = signal('');

  questions = signal<Question[]>([createEmptyQuestion()]);

  categoryOptions: DropdownOption[] = SURVEY_CATEGORIES;

  ngOnInit(): void {
    this.theme.setDarkMode(false);
  }

  ngOnDestroy(): void {
    this.theme.setDarkMode(true);
  }

  addQuestion(): void {
    this.questions.update((currentQuestions) => [
      ...currentQuestions,
      createEmptyQuestion(),
    ]);
  }

  removeQuestion(questionId: string): void {
    this.questions.update((currentQuestions) =>
      currentQuestions.filter((question) => question.id !== questionId),
    );
  }

  updateQuestionText(questionId: string, text: string): void {
    this.questions.update((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === questionId ? { ...question, text } : question,
      ),
    );
  }

  toggleAllowMultiple(questionId: string, value: boolean): void {
    this.questions.update((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === questionId
          ? { ...question, allowMultiple: value }
          : question,
      ),
    );
  }

  addAnswer(questionId: string): void {
    this.questions.update((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === questionId && question.answers.length < MAX_ANSWERS
          ? { ...question, answers: [...question.answers, createEmptyAnswer()] }
          : question,
      ),
    );
  }

  hasReachedAnswerLimit(question: Question): boolean {
    return question.answers.length >= MAX_ANSWERS;
  }

  removeAnswer(questionId: string, answerId: string): void {
    this.questions.update((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answers: question.answers.filter(
                (answer) => answer.id !== answerId,
              ),
            }
          : question,
      ),
    );
  }

  updateAnswerText(questionId: string, answerId: string, text: string): void {
    this.questions.update((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answers: question.answers.map((answer) =>
                answer.id === answerId ? { ...answer, text } : answer,
              ),
            }
          : question,
      ),
    );
  }

  answerLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 = 'A' im Zeichencode
  }
}
