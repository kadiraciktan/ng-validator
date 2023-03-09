import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[validate]',
  inputs: ['validate'],
})
export class ValidateDirective {
  @Input() validate: ValidatorFn[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private el: ElementRef,
    private field: NgControl,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.field.control?.setValidators(this.validate);

    const validators = Object.getOwnPropertyNames(Validators);

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
}
