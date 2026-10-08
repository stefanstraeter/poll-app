import { Component, input, signal } from '@angular/core';
import { Question } from '@survey/model/interfaces/question';
import { AnswerOption } from './answer-option/answer-option';

/**
 * @description Shows one question with its answers and keeps track of which
 * answers are currently selected. Enforces single-choice (only one answer at
 * a time) or multiple-choice (several answers independently) depending on
 * question.multiple.
 * @export
 * @class VoteQuestion
 */
@Component({
  imports: [AnswerOption],
  selector: 'app-vote-question',
  styleUrl: './vote-question.scss',
  templateUrl: './vote-question.html',
})
export class VoteQuestion {
  question = input.required<Question>();
  questionIndex = input.required<number>();

  private selectedAnswerIds = signal<number[]>([]);

  /**
   * @description Checks whether this answer is currently selected.
   * @param {number} answerId
   * @return {boolean}
   * @memberof VoteQuestion
   */
  isSelected(answerId: number): boolean {
    return this.selectedAnswerIds().includes(answerId);
  }

  /**
   * @description Called when an answer is clicked. Delegates to the
   * matching selection mode.
   * @param {number} answerId
   * @return {void}
   * @memberof VoteQuestion
   */
  toggleAnswer(answerId: number): void {
    if (this.question().multiple) {
      this.toggleMultiple(answerId);
    } else {
      this.selectSingle(answerId);
    }
  }

  /**
   * @description Adds or removes one answer from the selection, independently of the others.
   * @private
   * @param {number} answerId
   * @return {void}
   * @memberof VoteQuestion
   */
  private toggleMultiple(answerId: number): void {
    this.selectedAnswerIds.update((ids) => {
      if (ids.includes(answerId)) {
        return ids.filter((id) => id !== answerId);
      } else {
        return [...ids, answerId];
      }
    });
  }

  /**
   * @description Replaces the selection with just this one answer, so only one answer can be selected.
   * @private
   * @param {number} answerId
   * @return {void}
   * @memberof VoteQuestion
   */
  private selectSingle(answerId: number): void {
    this.selectedAnswerIds.set([answerId]);
  }
}
