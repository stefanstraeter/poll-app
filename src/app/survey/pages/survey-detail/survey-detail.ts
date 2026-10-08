import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Theme } from '@core/services/theme';
import { Survey } from '@survey/model/interfaces/survey';
import { VoteCard } from '@survey/components/vote-card/vote-card';
import { SurveyResults } from '@survey/components/survey-results/survey-results';

@Component({
  imports: [VoteCard, SurveyResults],
  selector: 'app-survey-detail',
  styleUrl: './survey-detail.scss',
  templateUrl: './survey-detail.html',
})
export class SurveyDetail implements OnInit, OnDestroy {
  private theme = inject(Theme);

  // Dummy-Daten, bis in Schritt 2 echte Survey-Daten per Route-ID geladen werden
  survey: Survey = {
    id: 0,
    title: "Let's Plan the Next Team Event Together",
    category: 'Team activities',
    deadline: '2025-09-01',
    description:
      'We want to create team activities that everyone will enjoy – share your preferences and ideas in our survey to help us plan better experiences together.',
    questions: [
      {
        id: 1,
        text: 'Which date would work best for you?',
        multiple: true,
        answers: [
          { id: 1, text: '19.09.2025, Friday', votes: 0 },
          { id: 2, text: '10.10.2025, Friday', votes: 0 },
          { id: 3, text: '11.10.2025, Saturday', votes: 0 },
          { id: 4, text: '31.10.2025, Friday', votes: 0 },
        ],
      },
      {
        id: 2,
        text: 'What is most important to you in a team event?',
        multiple: false,
        answers: [
          { id: 5, text: 'Team bonding', votes: 0 },
          { id: 6, text: 'Food and drinks', votes: 0 },
          { id: 7, text: 'Trying something new', votes: 0 },
          { id: 8, text: 'Keeping it low-key and stress-free', votes: 0 },
        ],
      },
    ],
  };

  /**
   * @description Sets the dark mode to false when the component is initialized.
   * @return {void}
   * @memberof SurveyDetail
   */
  ngOnInit(): void {
    this.theme.setDarkMode(false);
  }

  /**
   * @description Resets the dark mode to true when the component is destroyed.
   * @return {void}
   * @memberof SurveyDetail
   */
  ngOnDestroy(): void {
    this.theme.setDarkMode(true);
  }
}
