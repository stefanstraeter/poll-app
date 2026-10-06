import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export type QuestionFormGroup = FormGroup<{
  text: FormControl<string>;
  multiple: FormControl<boolean>;
  answers: FormArray<FormControl<string>>;
}>;

export function createAnswerControl(): FormControl<string> {
  return new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}

export function createQuestionGroup(): QuestionFormGroup {
  return new FormGroup({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    multiple: new FormControl(false, { nonNullable: true }),
    answers: new FormArray([createAnswerControl(), createAnswerControl()]),
  });
}
