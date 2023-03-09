import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ExtendValidators } from './extendValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'form-validator';
  userName = null;
  selectedValue = null;
  validators = ExtendValidators;

  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
    if (ngForm.form.valid) {
      alert('Form is valid');
    } else {
      alert('Form is INVALID');
    }
  }
}
