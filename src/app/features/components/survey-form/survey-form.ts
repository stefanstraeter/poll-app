import { Component, output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '@shared/components/button/button';
import { Dropdown, DropdownOption } from '@shared/components/dropdown/dropdown';
import { DeleteIcon } from '@shared/components/delete-icon/delete-icon';
import { SURVEY_CATEGORIES } from '@features/constants/survey-categories';
import { Survey } from '@features/interfaces/survey';
import { CreateQuestion } from './create-question/create-question';
import { createQuestionGroup } from './model/question-form-builder';

@Component({
  imports: [Button, Dropdown, DeleteIcon, CreateQuestion, ReactiveFormsModule],
  selector: 'app-survey-form',
  styleUrl: './survey-form.scss',
  templateUrl: './survey-form.html',
})
export class SurveyForm {
  submitted = output<Survey>();

  surveyForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    endsIn: new FormControl('', { nonNullable: true }),
    describingText: new FormControl('', { nonNullable: true }),
    category: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    questions: new FormArray([createQuestionGroup()]),
  });

  categoryOptions: DropdownOption[] = SURVEY_CATEGORIES;

  addQuestion(): void {
    this.surveyForm.controls.questions.push(createQuestionGroup());
  }

  removeQuestion(questionIndex: number): void {
    if (questionIndex === 0) {
      this.clearFirstQuestion();
    } else {
      this.surveyForm.controls.questions.removeAt(questionIndex);
    }
  }

  private clearFirstQuestion(): void {
    const text = this.surveyForm.controls.questions.at(0).controls.text;
    text.setValue('');
    text.markAsUntouched();
  }

  clearTitle(): void {
    const title = this.surveyForm.controls.title;
    title.setValue('');
    title.markAsUntouched();
  }

  clearDescribingText(): void {
    const describingText = this.surveyForm.controls.describingText;
    describingText.setValue('');
    describingText.markAsUntouched();
  }

  handleSubmit(): void {
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
      questions: this.surveyForm.controls.questions.controls.map(
        (questionGroup) => ({
          id: crypto.randomUUID(),
          text: questionGroup.controls.text.value,
          allowMultiple: questionGroup.controls.allowMultiple.value,
          answers: questionGroup.controls.answers.controls.map(
            (answerControl) => ({
              id: crypto.randomUUID(),
              text: answerControl.value,
            }),
          ),
        }),
      ),
    };

    this.submitted.emit(survey);
  }
}
