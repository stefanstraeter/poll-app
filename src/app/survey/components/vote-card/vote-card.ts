import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from '@shared/components/button/button';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { CloseIcon } from '@shared/components/close-icon/close-icon';
import { Survey } from '@survey/model/interfaces/survey';
import { VoteQuestion } from './vote-question/vote-question';

/**
 * @description Shows one survey as a card: status, meta info, title,
 * description and its questions. Lets the user leave the survey via the
 * close button and, later, submit the vote via the complete button.
 * @export
 * @class VoteCard
 */
@Component({
  imports: [DatePipe, RouterLink, Button, StatusBadge, CloseIcon, VoteQuestion],
  selector: 'app-vote-card',
  styleUrl: './vote-card.scss',
  templateUrl: './vote-card.html',
})
export class VoteCard {
  survey = input.required<Survey>();
}
