import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { Button } from '@shared/components/button/button';
import { Dropdown, DropdownOption } from '@shared/components/dropdown/dropdown';
import { Checkbox } from '@shared/components/checkbox/checkbox';
import { Theme } from '@core/services/theme';
import { SURVEY_CATEGORIES } from '@features/surveys/constants/survey-categories';
import { Survey } from '@features/surveys/interfaces/survey';
import { Surveys } from '@features/surveys/services/surveys';

const MAX_ANSWERS = 8;

type QuestionFormGroup = FormGroup<{
  text: FormControl<string>;
  allowMultiple: FormControl<boolean>;
  answers: FormArray<FormControl<string>>;
}>;

function createAnswerControl(): FormControl<string> {
  return new FormControl('', { nonNullable: true });
}

function createQuestionGroup(): QuestionFormGroup {
  return new FormGroup({
    text: new FormControl('', { nonNullable: true }),
    allowMultiple: new FormControl(false, { nonNullable: true }),
    answers: new FormArray([createAnswerControl(), createAnswerControl()]),
  });
}

@Component({
  imports: [StatusBadge, Button, Dropdown, Checkbox, ReactiveFormsModule],
  selector: 'app-create-survey',
  styleUrl: './create-survey.scss',
  templateUrl: './create-survey.html',
})
export class CreateSurvey implements OnInit, OnDestroy {
  private theme = inject(Theme);
  private surveysService = inject(Surveys);
  private router = inject(Router);

  surveyForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    endsIn: new FormControl('', { nonNullable: true }),
    describingText: new FormControl('', { nonNullable: true }),
    // Dropdown hat kein natives Element zum Binden, deshalb kein
    // formControlName im Template - stattdessen wird dieser Control
    // manuell über [selected]/(selectedChange) gelesen/geschrieben.
    category: new FormControl('', { nonNullable: true }),
    questions: new FormArray([createQuestionGroup()]),
  });

  categoryOptions: DropdownOption[] = SURVEY_CATEGORIES;

  ngOnInit(): void {
    this.theme.setDarkMode(false);
  }

  ngOnDestroy(): void {
    this.theme.setDarkMode(true);
  }

  addQuestion(): void {
    this.surveyForm.controls.questions.push(createQuestionGroup());
  }

  removeQuestion(questionIndex: number): void {
    this.surveyForm.controls.questions.removeAt(questionIndex);
  }

  addAnswer(questionIndex: number): void {
    const answers = this.surveyForm.controls.questions.at(questionIndex).controls.answers;
    if (answers.length < MAX_ANSWERS) {
      answers.push(createAnswerControl());
    }
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.surveyForm.controls.questions.at(questionIndex).controls.answers.removeAt(answerIndex);
  }

  hasReachedAnswerLimit(questionGroup: QuestionFormGroup): boolean {
    return questionGroup.controls.answers.length >= MAX_ANSWERS;
  }

  answerLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 = 'A' im Zeichencode
  }

  onSubmit(): void {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const survey: Survey = {
      id: crypto.randomUUID(),
      title: this.surveyForm.controls.title.value,
      category: this.surveyForm.controls.category.value,
      endsIn: this.surveyForm.controls.endsIn.value,
      describingText: this.surveyForm.controls.describingText.value,
      questions: this.surveyForm.controls.questions.controls.map((questionGroup) => ({
        id: crypto.randomUUID(),
        text: questionGroup.controls.text.value,
        allowMultiple: questionGroup.controls.allowMultiple.value,
        answers: questionGroup.controls.answers.controls.map((answerControl) => ({
          id: crypto.randomUUID(),
          text: answerControl.value,
        })),
      })),
    };

    this.surveysService.addSurvey(survey);
    this.router.navigate(['/']);
  }
}
