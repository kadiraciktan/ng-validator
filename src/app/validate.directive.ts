import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { NgControl, ValidatorFn, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { filter, startWith, Subscription } from 'rxjs';
import { currentValidatorMethods } from './current-validor.type';
import { ExtendValidators } from './extendValidators';
import { errorLanguage } from './language.object';

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

      this.checkErrorLabel(errorElement);
      const fieldSub = this.field.control?.valueChanges
        .pipe(
          startWith(this.field.control?.value),
          filter((value) => !!value)
        )
        .subscribe((value) => {
          this.checkErrorLabel(errorElement, value);
        });

      this.subscriptions.push(fieldSub);

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

  checkErrorLabel(errorElement: HTMLElement, value?: any) {
    const activeErrors = this.field.control?.errors;
    if (value === undefined) {
      value = '';
    }

    if (activeErrors) {
      const errorKey = Object.keys(activeErrors)[0];
      errorElement.style.opacity = '100';
      errorElement.innerHTML =
        errorLanguage.en[errorKey as currentValidatorMethods].message(value);
      return;
    } else {
      errorElement.style.opacity = '0';
    }
  }
}
