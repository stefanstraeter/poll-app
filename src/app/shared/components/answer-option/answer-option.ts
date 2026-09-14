import { Component, input, output } from '@angular/core';
import { Checkbox } from '../checkbox/checkbox';

@Component({
  imports: [Checkbox],
  selector: 'app-answer-option',
  styleUrl: './answer-option.scss',
  templateUrl: './answer-option.html',
})
export class AnswerOption {
  optionLetter = input.required<string>(); // A, B, C
  answerText = input.required<string>(); // die jeweiligen Antworten
  checked = input<boolean>(false);
  toggled = output<boolean>();
}

// input.required()
// → prüft deinen eigenen Code beim Entwickeln/Kompilieren, schützt dich vor Tippfehlern/vergessenen Angaben, bevor die App überhaupt läuft
