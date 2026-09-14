import { Component } from '@angular/core';
import { AnswerOption } from '@shared/components/answer-option/answer-option';
import { Button } from '@shared/components/button/button';

@Component({
  imports: [Button, AnswerOption],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
