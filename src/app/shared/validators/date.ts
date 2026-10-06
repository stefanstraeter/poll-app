import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @description Returns today's date as text in the format YYYY-MM-DD (local time).
 * This is the format that <input type="date"> expects.
 * @export
 * @return {*}  {string}
 */
export function todayAsIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * @description Creates a validator that rejects dates before minDate.
 * minDate must be in the format YYYY-MM-DD.
 * An empty value is allowed, so optional fields still work.
 * @export
 * @param {string} minDate
 * @return {*}  {ValidatorFn}
 */
export function notBeforeDate(minDate: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      return null;
    }
    return value < minDate ? { pastDate: true } : null;
  };
}
