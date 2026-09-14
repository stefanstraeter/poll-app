import { Component } from '@angular/core';
import { AnswerOption } from '@shared/components/answer-option/answer-option';
import { Button } from '@shared/components/button/button';
import { PollCard } from '@shared/components/poll-card/poll-card';

@Component({
  imports: [Button, PollCard],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
