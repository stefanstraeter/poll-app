import { computed, inject, signal, Service } from '@angular/core';
import { Supabase } from '@core/services/supabase';
import { todayAsIsoDate } from '@shared/validators/date';
import { Survey } from '../model/interfaces/survey';
import { Answer, Question } from '../model/interfaces/question';
import { getEndingSoonSurveys } from '../rules/ending-soon-surveys';

@Service()
export class Surveys {
  private supabase = inject(Supabase);
  private surveysSignal = signal<Survey[]>([]); // read + write access
  surveys = this.surveysSignal.asReadonly(); // read-only access
  endingSoonSurveys = computed(() =>
    getEndingSoonSurveys(this.surveysSignal(), todayAsIsoDate()),
  );

  constructor() {
    this.loadSurveys();
  }

  /**
   * @description Loads all surveys with their questions and answers
   * from Supabase and writes them into the signal.
   * @return {Promise<void>} - A promise that resolves when the surveys are loaded.
   * @memberof Surveys
   */
  async loadSurveys(): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('surveys')
      .select('*, questions(*, answers(*))');

    if (error) {
      console.error('Could not load surveys:', error);
      return;
    }

    this.surveysSignal.set((data ?? []) as Survey[]);
  }

  /**
   * @description Loads a single survey by id directly from Supabase,
   * used by the detail page.
   * @param {number} id
   * @return {Promise<Survey | undefined>} - The survey, or undefined if it could not be loaded.
   * @memberof Surveys
   */
  async getSurveyById(id: number): Promise<Survey | undefined> {
    const { data, error } = await this.supabase.client
      .from('surveys')
      .select('*, questions(*, answers(*))')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Could not load survey:', error);
      return undefined;
    }

    return data as Survey;
  }

  /**
   * @description Creates a new survey with all its questions and answers
   * in Supabase, then reloads the list. The survey is saved first, since every
   * question needs its id. Questions (and each question's answers) are then
   * saved in parallel, since they don't depend on each other.
   * @param {Survey} survey
   * @return {Promise<void>} - Resolves when the survey is saved and the list is reloaded.
   * @memberof Surveys
   */
  async addSurvey(survey: Survey): Promise<void> {
    const surveyId = await this.insertSurvey(survey);

    await Promise.all(
      survey.questions.map(async (question) => {
        const questionId = await this.insertQuestion(question, surveyId);

        await Promise.all(
          question.answers.map((answer) =>
            this.insertAnswer(answer, questionId),
          ),
        );
      }),
    );

    await this.loadSurveys();
  }

  /**
   * @description Inserts one survey row (without questions).
   * @private
   * @param {Survey} survey
   * @return {Promise<number>} - The id of the new survey row.
   * @memberof Surveys
   */
  private async insertSurvey(survey: Survey): Promise<number> {
    const { data, error } = await this.supabase.client
      .from('surveys')
      .insert({
        title: survey.title,
        category: survey.category,
        deadline: survey.deadline || null,
        description: survey.description,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Could not create survey: ${error?.message}`);
    }

    return data.id;
  }

  /**
   * @description Inserts one question row (without answers).
   * @private
   * @param {Question} question
   * @param {number} surveyId
   * @return {Promise<number>} - The id of the new question row.
   * @memberof Surveys
   */
  private async insertQuestion(
    question: Question,
    surveyId: number,
  ): Promise<number> {
    const { data, error } = await this.supabase.client
      .from('questions')
      .insert({
        text: question.text,
        multiple: question.multiple,
        survey_id: surveyId,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Could not create question: ${error?.message}`);
    }

    return data.id;
  }

  /**
   * @description Inserts one answer row. Database sets `votes` to 0
   * automatically, so no id needs to be returned here.
   * @private
   * @param {Answer} answer
   * @param {number} questionId
   * @return {Promise<void>} - Resolves when the answer is saved.
   * @memberof Surveys
   */
  private async insertAnswer(
    answer: Answer,
    questionId: number,
  ): Promise<void> {
    const { error } = await this.supabase.client.from('answers').insert({
      text: answer.text,
      question_id: questionId,
    });

    if (error) {
      throw new Error(`Could not create answer: ${error.message}`);
    }
  }
}
