import { Component } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ExtendValidators } from './extendValidators';

enum LoginType {
  Admin = 'Admin',
  User = 'User',
}

interface IForm {
  userName: string;
  email: string;
  phone: string;
  password: string;
  loginType: LoginType | null;
  city: string;
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
    city: '',
  };
  cities = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'];
  filteredCities = this.cities;

  filteredCities$ = new BehaviorSubject(this.cities);

  loginTypes = LoginType;

  title = 'form-validator';
  userName = null;

  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
    if (ngForm.form.valid) {
      alert('Form is valid');
    } else {
      alert('Form is INVALID');
    }
  }

  onCityChange(city: string) {
    this.input.city = city;

    this.filteredCities$.next(
      this.cities.filter((c) => c.toLowerCase().includes(city.toLowerCase()))
    );

    this.filteredCities = this.cities.filter((c) =>
      c.toLowerCase().includes(city.toLowerCase())
    );
  }
}
