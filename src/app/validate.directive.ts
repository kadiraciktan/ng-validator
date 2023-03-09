import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { filter, startWith, Subscription } from 'rxjs';
import { currentValidatorMethods, ExtendValidators } from './extendValidators';

@Directive({
  selector: '[validate]',
  inputs: ['validate'],
})
export class ValidateDirective {
  @Input() validate: currentValidatorMethods[] = [];

  subscriptions: Subscription[] = [];
  allValidators = Object.getOwnPropertyNames(ExtendValidators);
  constructor(
    private el: ElementRef,
    private field: NgControl,
    public readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    if (this.field.control) {
      const errorElement = document.createElement('span');
      errorElement.style.color = 'red';
      errorElement.style.marginLeft = '1rem';
      errorElement.style.marginTop = '-22px';
      errorElement.style.width = '100%';
      errorElement.style.opacity = '0';
      errorElement.id = this.field.name + 'Error';
      errorElement.innerHTML = 'Form Field Error';
      const matFormField = this.el.nativeElement.closest('mat-form-field');
      if (matFormField) {
        matFormField.insertAdjacentElement('beforeend', errorElement);
      } else {
        this.el.nativeElement.parentElement.pushChild(errorElement);
      }

      this.field.control?.setValidators(
        this.validate.map((validator) => this.generateValidator(validator))
      );

      const fieldSub = this.field.control?.valueChanges
        .pipe(
          startWith(this.field.control?.value),
          filter((value) => !!value)
        )
        .subscribe(() => {
          this.checkErrorLabel(errorElement);
        });

      this.subscriptions.push(fieldSub);

      // this.el.nativeElement.addEventListener('blur', () => {
      //   this.checkErrorLabel(errorElement);
      // });

      this.el.nativeElement.addEventListener('focus', () => {
        this.checkErrorLabel(errorElement);
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  generateValidator(validator: currentValidatorMethods): ValidatorFn {
    return ExtendValidators[validator] as ValidatorFn;
  }

  checkErrorLabel(errorElement: HTMLElement) {
    const activeErrors = this.field.control?.errors;
    if (activeErrors) {
      const errorKey = Object.keys(activeErrors)[0];
      errorElement.style.opacity = '100';
      errorElement.innerHTML = '*Form Field Error  ' + errorKey;
      return;
    } else {
      errorElement.style.opacity = '0';
    }
  }
}
