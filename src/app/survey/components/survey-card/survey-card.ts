import { Component, computed, input } from '@angular/core';

type BadgeStage = 'none' | 'expired' | 'today' | 'days' | 'months';

interface BadgeInfo {
  stage: BadgeStage;
  amount: number;
}

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

  // Der Text fürs Badge wird aus dem Enddatum berechnet, z. B. "Ends In 2 Months"
  badgeText = computed(() =>
    this.buildBadgeText(this.getBadgeInfo(this.deadline())),
  );

  /**
   * @description Decides which stage the end date is in, and how big the amount is.
   * Up to 30 days: shown in days. Longer: shown in months (30 days = 1 month).
   * @private
   * @param {(string | null)} deadline - The end date in the format YYYY-MM-DD, or null if there is no end date.
   * @return {BadgeInfo} - The stage and amount of the badge.
   * @memberof SurveyCard
   */
  private getBadgeInfo(deadline: string | null): BadgeInfo {
    if (!deadline) {
      return { stage: 'none', amount: 0 };
    }

    const days = this.daysUntil(deadline);

    if (days < 0) {
      return { stage: 'expired', amount: 0 };
    }
    if (days === 0) {
      return { stage: 'today', amount: 0 };
    }
    if (days <= 30) {
      return { stage: 'days', amount: days };
    }

    return { stage: 'months', amount: Math.floor(days / 30) };
  }

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

  /**
   * @description  Counts the full days from today until the end date.
   * Both dates are set to midnight, so only the calendar day counts.
   * @private
   * @param {string} deadline - The end date in the format YYYY-MM-DD.
   * @return {number}  - The number of full days until the end date.
   * @memberof SurveyCard
   */
  private daysUntil(deadline: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const end = new Date(deadline + 'T00:00:00');

    return Math.round((end.getTime() - today.getTime()) / 86400000);
  }
}
