import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Button } from '@shared/components/button/button';
import { DeleteIcon } from '@shared/components/delete-icon/delete-icon';

@Component({
  imports: [ReactiveFormsModule, Button, DeleteIcon],
  selector: 'app-create-answer',
  styleUrl: './create-answer.scss',
  templateUrl: './create-answer.html',
})
export class CreateAnswer {
  answerControl = input.required<FormControl<string>>();
  answerIndex = input.required<number>();
  remove = output<void>();

  answerLetter(): string {
    return String.fromCharCode(65 + this.answerIndex()); // 65 = 'A' im Zeichencode
  }
}
