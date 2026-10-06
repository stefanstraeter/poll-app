import { Component, output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '@shared/components/button/button';
import { notBeforeDate, todayAsIsoDate } from '@shared/validators/date';
import { Dropdown, DropdownOption } from '@shared/components/dropdown/dropdown';
import { DeleteIcon } from '@shared/components/delete-icon/delete-icon';
import { SURVEY_CATEGORIES } from '@features/constants/survey-categories';
import { Survey } from '@features/interfaces/survey';
import { Answer, Question } from '@features/interfaces/question';
import { CreateQuestion } from './create-question/create-question';
import {
  createQuestionGroup,
  QuestionFormGroup,
} from './model/question-form-builder';

@Component({
  imports: [Button, Dropdown, DeleteIcon, CreateQuestion, ReactiveFormsModule],
  selector: 'app-survey-form',
  styleUrl: './survey-form.scss',
  templateUrl: './survey-form.html',
})
export class SurveyForm {
  submitted = output<Survey>();

  today = todayAsIsoDate();

  surveyForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    deadline: new FormControl('', {
      nonNullable: true,
      validators: [notBeforeDate(this.today)],
    }),
    description: new FormControl('', { nonNullable: true }),
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

  clearDescription(): void {
    const description = this.surveyForm.controls.description;
    description.setValue('');
    description.markAsUntouched();
  }

  clearDeadline(): void {
    const deadline = this.surveyForm.controls.deadline;
    deadline.setValue('');
    deadline.markAsUntouched();
  }

  handleSubmit(): void {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.buildSurvey());
  }

  private buildSurvey(): Survey {
    return {
      id: 0, // id ist ein Platzhalter, die "echte" ID wird von der Datenbank generiert
      title: this.surveyForm.controls.title.value,
      category: this.surveyForm.controls.category.value,
      deadline: this.surveyForm.controls.deadline.value,
      description: this.surveyForm.controls.description.value,
      questions: this.surveyForm.controls.questions.controls.map(
        (questionGroup) => this.buildQuestion(questionGroup),
      ),
    };
  }

  private buildQuestion(questionGroup: QuestionFormGroup): Question {
    return {
      id: 0,
      text: questionGroup.controls.text.value,
      multiple: questionGroup.controls.multiple.value,
      answers: questionGroup.controls.answers.controls.map((answerControl) =>
        this.buildAnswer(answerControl),
      ),
    };
  }

  private buildAnswer(answerControl: FormControl<string>): Answer {
    return {
      id: 0,
      votes: 0,
      text: answerControl.value,
    };
  }
}
