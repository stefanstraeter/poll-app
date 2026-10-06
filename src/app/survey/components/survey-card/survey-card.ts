import { Component, computed, input } from '@angular/core';
import { BadgeInfo, getBadgeInfo } from '../../rules/deadline-badge';

@Component({
  imports: [],
  selector: 'app-survey-card',
  styleUrl: './survey-card.scss',
  templateUrl: './survey-card.html',
})
export class SurveyCard {
  category = input.required<string>();
  title = input.required<string>();
  deadline = input.required<string | null>();
  variant = input<'highlight' | 'list'>('list');
  badgeText = computed(() =>
    this.buildBadgeText(getBadgeInfo(this.deadline())),
  );

  /**
   * @description Turns the stage into the text that is shown on the badge.
   * The texts are fixed, so a switch fits here.
   * @private
   * @param {BadgeInfo} badgeInfo - The stage and amount of the badge.
   * @return {string} - The text that is shown on the badge.
   * @memberof SurveyCard
   */
  private buildBadgeText({ stage, amount }: BadgeInfo): string {
    switch (stage) {
      case 'none':
        return 'No end date';
      case 'expired':
        return 'Survey expired';
      case 'today':
        return 'Ends today';
      case 'days':
        return `Ends In ${amount} ${amount === 1 ? 'Day' : 'Days'}`;
      case 'months':
        return `Ends In ${amount} ${amount === 1 ? 'Month' : 'Months'}`;
    }
  }
}
