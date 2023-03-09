import { AbstractControl, Validators } from '@angular/forms';

export type currentValidatorMethods = keyof typeof ExtendValidators;

export class ExtendValidators extends Validators {
  static validateEmail(control: AbstractControl) {
    const email = control.value;
    if (email && email.length > 0 && !email.includes('@')) {
      return { validateEmail: true };
    }
    return null;
  }

  static validateUlogi(control: AbstractControl) {
    const uloga = control.value;
    if (uloga && uloga.length > 0 && uloga === '0') {
      return { validateUloga: true };
    }
    return null;
  }
}
