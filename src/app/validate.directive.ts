import { Directive, ElementRef, Input } from '@angular/core';
import { NgControl, ValidatorFn } from '@angular/forms';
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
    const form = this.el.nativeElement.closest('form');

    console.log('FORM', form);

    this.field.control?.setValidators(this.validate);

    const errorLabel = document.createElement('label');
    errorLabel.style.color = 'red';
    errorLabel.style.display = 'none';
    this.el.nativeElement.parentNode.appendChild(errorLabel);

    this.field.control?.valueChanges.subscribe((value) => {
      if (this.field.control?.invalid) {
        errorLabel.style.display = 'block';
        console.log('ERROR', this.field.control?.errors);
        if (this.field.control.hasError('required')) {
          errorLabel.innerText = 'This field  is required';
        }
        if (this.field.control.hasError('email')) {
          errorLabel.innerText = 'This field must be a valid email';
        }
      } else {
        errorLabel.style.display = 'none';
      }
    });
  }
}
