import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Theme } from '@core/services/theme';
import { ActivatedRoute } from '@angular/router';
import { NotFound } from '@shared/components/not-found/not-found';
import { Survey } from '@survey/model/interfaces/survey';
import { VoteCard } from '@survey/components/vote-card/vote-card';
import { SurveyResults } from '@survey/components/survey-results/survey-results';
import { Surveys } from '@survey/services/surveys';

@Component({
  imports: [VoteCard, SurveyResults, NotFound],
  selector: 'app-survey-detail',
  styleUrl: './survey-detail.scss',
  templateUrl: './survey-detail.html',
})
export class SurveyDetail implements OnInit, OnDestroy {
  private theme = inject(Theme);
  private route = inject(ActivatedRoute);
  private surveys = inject(Surveys);

  survey = signal<Survey | undefined>(undefined);
  isLoading = signal(true);

  /**
   * @description Sets the dark mode to false and load survey by id when the component is initialized.
   * @return {void}
   * @memberof SurveyDetail
   */
  ngOnInit(): void {
    this.theme.setDarkMode(false);
    const id = this.getSurveyId();
    this.loadSurvey(id);
  }

  /**
   * @description Resets the dark mode to true when the component is destroyed.
   * @return {void}
   * @memberof SurveyDetail
   */
  ngOnDestroy(): void {
    this.theme.setDarkMode(true);
  }

  /**
   * @description Loads the survey with the given id from the service and writes it
   * into the survey signal (undefined if it could not be loaded). Sets isLoading
   * to false afterwards, whether loading worked or not.
   * @private
   * @param {number} id
   * @return {Promise<void>} - Resolves when the survey is loaded and isLoading is false.
   * @memberof SurveyDetail
   */
  private async loadSurvey(id: number): Promise<void> {
    try {
      const loadedSurvey = await this.surveys.getSurveyById(id);
      this.survey.set(loadedSurvey);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * @description Reads the survey id from the current URL (route /survey/:id).
   * Returns NaN if the id in the URL is not a number.
   * @private
   * @return {number}
   * @memberof SurveyDetail
   */
  private getSurveyId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }
}
