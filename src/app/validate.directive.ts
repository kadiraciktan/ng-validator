import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { filter, Subscription } from 'rxjs';
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
    public readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    const validators = Object.getOwnPropertyNames(ExtendValidators);

    this.field.control?.setValidators(
      this.validate.map((validator) => this.generateValidator(validator))
    );

    if (this.field.control) {
      const errorElement = document.createElement('span');
      errorElement.style.color = 'red';
      errorElement.style.marginLeft = '1rem';
      errorElement.style.marginTop = '-22px';
      errorElement.style.width = '100%';

      const controlSub = this.field.control.valueChanges
        .pipe(filter((value) => value !== null))
        .subscribe((value) => {
          if (this.field.control?.invalid || this.field.control?.dirty) {
            errorElement.id = this.field.name + 'Error';

            console.log(
              'directive class',
              this.el.nativeElement.closest('mat-form-field')
            );

            const matFormField =
              this.el.nativeElement.closest('mat-form-field');

            if (matFormField) {
              //append matError to matFormField as a last child
              matFormField.insertAdjacentElement('beforeend', errorElement);
            } else {
              this.el.nativeElement.parentElement.pushChild(errorElement);
            }

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
