import { currentValidatorMethods } from './current-validor.type';

export type languageType = 'en';
export type errorLanguage = {
  [key in languageType]: {
    [key in currentValidatorMethods]: {
      message: (...args: any[]) => string;
    };
  };
};

export const errorLanguage: errorLanguage = {
  en: {
    validateEmail: {
      message: (a: any) => {
        return 'Email is not valid ' + a;
      },
    },
    validateUlogi: {
      message: () => {
        return 'Email is not valid';
      },
    },
    validateTurkishPhone: {
      message: () => {
        return 'Email is not valid';
      },
    },
    required: {
      message: (a: any) => {
        return 'Email is not valid' + a;
      },
    },
    compose: {
      message: () => {
        return 'Email is not valid';
      },
    },
    composeAsync: {
      message: () => {
        return 'Email is not valid';
      },
    },
    email: {
      message: (a: string, b: number) => {
        return 'Email is not valid' + a.toString() + b;
      },
    },
    max: {
      message: (val: any) => {
        return 'This field is Exceeds the maximum value of ' + val;
      },
    },
    min: {
      message: (val: any) => {
        return 'This field is Exceeds the minimum value of ' + val;
      },
    },
    maxLength: {
      message: (val: any) => {
        return 'This field is Exceeds the maximum length of ' + val;
      },
    },
    minLength: {
      message: (val: any) => {
        return 'This field is Exceeds the minimum length of ' + val;
      },
    },
    nullValidator: {
      message: () => {
        return 'Email is not valid';
      },
    },
    pattern: {
      message: () => {
        return 'Email is not valid';
      },
    },
    prototype: {
      message: () => {
        return 'Email is not valid';
      },
    },
    requiredTrue: {
      message: (a: number) => {
        return 'This field is required' + a;
      },
    },
  },
};

errorLanguage.en.max.message(10, 2, 3, 5);
