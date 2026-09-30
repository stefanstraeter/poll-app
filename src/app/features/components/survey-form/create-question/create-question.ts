import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Button } from '@shared/components/button/button';
import { Checkbox } from '@shared/components/checkbox/checkbox';
import { DeleteIcon } from '@shared/components/delete-icon/delete-icon';
import { createAnswerControl, QuestionFormGroup } from '../model/question-form-builder';
import { CreateAnswer } from './create-answer/create-answer';

const MAX_ANSWERS = 8;

@Component({
  imports: [ReactiveFormsModule, Button, Checkbox, DeleteIcon, CreateAnswer],
  selector: 'app-create-question',
  styleUrl: './create-question.scss',
  templateUrl: './create-question.html',
})
export class CreateQuestion {
  questionGroup = input.required<QuestionFormGroup>();
  questionIndex = input.required<number>();
  remove = output<void>();

  addAnswer(): void {
    const answers = this.questionGroup().controls.answers;
    if (answers.length < MAX_ANSWERS) {
      answers.push(createAnswerControl());
    }
  }

  removeAnswer(answerIndex: number): void {
    this.questionGroup().controls.answers.removeAt(answerIndex);
  }

  hasReachedAnswerLimit(): boolean {
    return this.questionGroup().controls.answers.length >= MAX_ANSWERS;
  }
}
