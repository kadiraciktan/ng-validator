import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

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

  static validateTurkishPhone(control: AbstractControl) {
    const phone = control.value;
    if (phone && phone.length > 0 && phone.length !== 10) {
      return { validateTurkishPhone: true };
    }
    return null;
  }

  static override required(
    control: AbstractControl<any, any>
  ): ValidationErrors | null {
    return control.value ? null : { required: true };
  }
}
