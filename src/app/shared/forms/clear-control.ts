import { AbstractControl } from '@angular/forms';

/**
 * @description
 * Empties a form control and marks it as untouched,
 * so no error message is shown for the empty field.
 * @export
 * @param {AbstractControl} control
 */
export function clearControl(control: AbstractControl): void {
  control.setValue('');
  control.markAsUntouched();
}
