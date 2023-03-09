import { Directive, ElementRef, Input } from '@angular/core';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[validate]',
  inputs: ['validate'],
})
export class ValidateDirective {
  @Input() validate: ValidatorFn[] = [];

  subscriptions: Subscription[] = [];

  constructor(private el: ElementRef, private field: NgControl) {
    console.log('validate directive called');
  }

  ngOnInit() {
    this.field.control?.setValidators(this.validate);

    const errorLabel = document.createElement('label');
    errorLabel.style.color = 'red';
    errorLabel.style.display = 'none';
    this.el.nativeElement.parentNode.appendChild(errorLabel);

    const validators = Object.getOwnPropertyNames(Validators);

    console.log('validators', validators);

    this.field.control?.valueChanges.subscribe((value) => {
      if (this.field.control?.invalid) {
        validators.forEach((validator) => {
          if (this.field.control?.hasError(validator)) {
            errorLabel.innerText = `This field must be a valid ${validator}`;
          }
        });
        errorLabel.style.display = 'block';
      } else {
        errorLabel.style.display = 'none';
      }
    });
  }
}
