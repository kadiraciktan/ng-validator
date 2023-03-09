import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ExtendValidators } from './extendValidators';

enum LoginType {
  'Admin',
  'User',
}

interface IForm {
  userName: string;
  email: string;
  phone: string;
  password: string;
  loginType: LoginType | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  input: IForm = {
    userName: '',
    email: '',
    phone: '',
    password: '',
    loginType: null,
  };

  loginTypes = LoginType;

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
