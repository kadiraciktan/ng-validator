import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { currentValidatorMethods, ExtendValidators } from './extendValidators';

@Directive({
  selector: '[validate]',
  inputs: ['validate'],
})
export class ValidateDirective {
  @Input() validate: currentValidatorMethods[] = [];

  subscriptions: Subscription[] = [];

  constructor(private el: ElementRef, private field: NgControl) {}

  ngOnInit() {
    const validators = Object.getOwnPropertyNames(ExtendValidators);

    this.field.control?.setValidators(
      this.validate.map((validator) => this.generateValidator(validator))
    );

    if (this.field.control) {
      const errorElement = document.createElement('span');
      errorElement.style.color = 'red';
      errorElement.style.fontSize = '12px';
      errorElement.style.fontWeight = 'bold';
      errorElement.style.display = 'flex';
      errorElement.style.width = '100%';

      const controlSub = this.field.control.valueChanges
        .pipe(filter((value) => value !== null))
        .subscribe((value) => {
          if (this.field.control?.invalid || this.field.control?.dirty) {
            errorElement.id = this.field.name + 'Error';
            errorElement.style.position = 'absolute';

            this.el.nativeElement.parentElement.parentElement.appendChild(
              errorElement
            );

            validators.forEach((validator) => {
              if (this.field.control?.hasError(validator)) {
                errorElement.innerHTML =
                  this.field.control?.getError(validator);
              }
            });
          } else {
          }
        });
      this.subscriptions.push(controlSub);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  generateValidator(validator: currentValidatorMethods): ValidatorFn {
    return ExtendValidators[validator] as ValidatorFn;
  }
}
