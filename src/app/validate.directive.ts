import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { currentValidatorMethods, ExtendValidators } from './extendValidators';

@Directive({
  selector: '[validate]',
  inputs: ['validate'],
})
export class ValidateDirective {
  @Input() validate: currentValidatorMethods[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private el: ElementRef,
    private field: NgControl,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    const validators = Object.getOwnPropertyNames(ExtendValidators);

    this.field.control?.setValidators(
      this.validate.map((validator) => this.generateValidator(validator))
    );

    if (this.field.control) {
      const controlSub = this.field.control.valueChanges.subscribe((value) => {
        if (this.field.control?.invalid || this.field.control?.dirty) {
          validators.forEach((validator) => {
            if (this.field.control?.hasError(validator)) {
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
