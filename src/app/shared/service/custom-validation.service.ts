import { Injectable } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { FormGroup } from '@angular/forms';
 
@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  static decimalNumber(maxIntDigits: number, maxPoints: number): ValidatorFn {
    const result = (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(`^([0-9]{0,${maxIntDigits}})([.][0-9]{0,${maxPoints}})?$`);
      const valid = regex.test(control.value);
      return valid ? null : { invalidDecimalNumber: { maxIntDigits, maxPoints } };
    };
 
    return result;
  }
 
  static nationalId(control: AbstractControl): { [key: string]: any } {
    if (!control.value) {
      return null;
    }
 
    const regex = /[1][0-9]{9}$/; //NOSONAR
    const valid = regex.test(control.value);
    return valid ? null : { invalidNationalId: true };
  }
 
  static iqamaNo(control: AbstractControl): { [key: string]: any } {
    if (!control.value) {
      return null;
    }
 
    const regex = /[2][0-9]{9}$/; //NOSONAR
    const valid = regex.test(control.value);
    return valid ? null : { invalidIqamaNo: true };
  }
  static convertDateToMDY(date: string) {
    return date
      .replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
      .replace(/(\d{2})-(\d{1})-(\d{4})/, '$2/$1/$3')
      .replace(/(\d{1})-(\d{2})-(\d{4})/, '$2/$1/$3')
      .replace(/(\d{1})-(\d{1})-(\d{4})/, '$2/$1/$3');
  }
 
  static matchEmailValidator(emailField: string, confirmEmailField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const email: string = formGroup.get(emailField)?.value;
      const confirmEmailControl = formGroup.get(confirmEmailField);
      const confirmEmail: string = confirmEmailControl?.value;
 
      if (!email || !confirmEmail || email.toUpperCase() === confirmEmail.toUpperCase()) {
        this.removeError(confirmEmailControl, 'emailMismatch');
      } else {
        confirmEmailControl.setErrors({ emailMismatch: true });
      }
 
      return null;
    };
  }
 
  // Function to remove a specific error key from FormControl
  static removeError(control: AbstractControl, errorKey: string) {
    if (control.errors && control.hasError(errorKey)) {
      const errors = { ...control.errors };
      delete errors[errorKey];
      control.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }
  }
 
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
 
      // If the field is empty, don't return any error
      if (!value) {
        return null;
      }
 
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(value);
 
      // Return an error if the email is invalid
      return isValid ? null : { email: true };
    };
  }
 
  static fromToDate(
    fromDateField: string,
    toDateField: string,
    errorName: string = 'fromToDate',
    setErrors: boolean = true
  ) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[toDateField];
      const fromDate = formGroup.get(fromDateField).value;
      const toDate = formGroup.get(toDateField).value;
      if (fromDate !== null && toDate !== null) {
        let datef = new Date(this.convertDateToMDY(fromDate));
        let dateto = new Date(this.convertDateToMDY(toDate));
 
        // Ausing the fromDate and toDate are numbers. In not convert them first after null check
        if (fromDate !== null && toDate !== null && datef >= dateto) {
          control.setErrors({ [errorName]: true });
        }
      } else if (setErrors) {
        control.setErrors({ [errorName]: false });
      }
    };
  }
 
  static fromToDateOptional(
    fromDateField: string,
    toDateField: string,
    errorName: string = 'fromToDate',
    setErrors: boolean = false
  ) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[toDateField];
      const fromDate = formGroup.get(fromDateField).value;
      const toDate = formGroup.get(toDateField).value;
      if (fromDate !== null && toDate !== null) {
        let datef = new Date(this.convertDateToMDY(fromDate));
        let dateto = new Date(this.convertDateToMDY(toDate));
 
        // Ausing the fromDate and toDate are numbers. In not convert them first after null check
        if (fromDate !== null && toDate !== null && datef >= dateto) {
          control.setErrors({ [errorName]: true });
        }
      } else if (fromDate == null && toDate !== null) {
        control.setErrors({ [errorName]: true });
      } else if (setErrors) {
        control.setErrors({ [errorName]: false });
      }
    };
  }
  static arabicOnly(control: AbstractControl): { [key: string]: any } {
    if (!control.value) {
      return null;
    }
    const regex = new RegExp('^[\u0621-\u064A\u0660-\u0669 ]+$'); //NOSONAR
 
    const valid = regex.test(control.value.trim());
    return valid ? null : { invalidArabicChars: true };
  }
  static arabicandNumberOnly(control: AbstractControl): { [key: string]: any } {
    if (!control.value) {
      return null;
    }
    const regex = new RegExp('[a-zA-Z@_%!#.()$~ً،:-]'); //NOSONAR
    const trimmedValue = control?.value?.trim();
 
    // Check if the trimmed value is empty or contains spaces
    if (trimmedValue?.length === 0) {
      return { required: true }; // Return error if empty or only spaces
    }
    const valid = !regex.test(control.value.trim());
    return valid ? null : { invalidArabicChars: true };
  }
  static CustomArabicEnglishAndNumber(control: AbstractControl): { [key: string]: any } {
    if (!control.value) {
      return null;
    }
    const regex = new RegExp('^[\u0621-\u064Aa-zA-Z0-9\\s/]+$'); //NOSONAR
    const valid = regex.test(control.value.trim());
    return valid ? null : { invalidCustomArabicEnglishAndNumberChars: true };
  }
  static CustomArabicEnglish(control: AbstractControl): { [key: string]: any } {
    if (!control.value) {
      return null;
    }
    const trimmedValue = control?.value?.trim();
 
    // Check if the trimmed value is empty or contains spaces
    if (trimmedValue?.length === 0) {
      return { required: true }; // Return error if empty or only spaces
    }
    const regex = new RegExp('^[\u0621-\u064Aa-zA-Z\\s/]+$'); //NOSONAR
    const valid = regex.test(control.value.trim());
    return valid ? null : { invalidCustomArabicEnglish: true };
  }
  static CustomEnglishAndNumber(control: AbstractControl): { [key: string]: any } {
    if (!control.value) {
      return null;
    }
    const trimmedValue = control?.value?.trim();
 
    // Check if the trimmed value is empty or contains spaces
    if (trimmedValue?.length === 0) {
      return { required: true }; // Return error if empty or only spaces
    }
    const regex = new RegExp('^[a-zA-Z/0-9s]+$'); //NOSONAR
    const valid = regex.test(control.value.trim());
    return valid ? null : { invalidCustomEnglishAndNumberChars: true };
  }
 
  static englishOnly(control: AbstractControl): { [key: string]: any } {
    if (!control.value) {
      return null;
    }
 
    const trimmedValue = control?.value?.trim();
 
    // Check if the trimmed value is empty or contains spaces
    if (trimmedValue?.length === 0) {
      return { required: true }; // Return error if empty or only spaces
    }
 
    // Regex to validate English characters only
    const regex = new RegExp('[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]'); //NOSONAR
    const valid = !regex.test(trimmedValue);
 
    return valid ? null : { invalidEnglishChars: true };
  }
 
  static hasSmallCase(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      const regex = new RegExp('[a-z]'); //NOSONAR
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : { hasSmallCase: true };
    };
  }
  static hasCapitalCase(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      const regex = new RegExp('[A-Z]'); //NOSONAR
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : { hasCapitalCase: true };
    };
  }
 
  arbicPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
 
      const regex = new RegExp('^[\\u0621-\\u064A\\u0660-\\u06690-9s@_%!#.()$~ً،:-+]+$'); //NOSONAR
      const valid = regex.test(control.value);
      return valid ? null : { invalidArabicChars: true };
    };
  }
 
  englishPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
 
      const regex = new RegExp('(^[^&<>{}\u0600-\u06FF]+$)'); //NOSONAR
      const valid = regex.test(control.value);
      return valid ? null : { invalidEnglishChars: true };
    };
  }
  noStartingWithValidator(no): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const value = (control.value + '') as string;
        if (value && !value.startsWith(no)) {
          return { noStartingWithNo: { no: no } };
        }
      }
      return null;
    };
  }
  phonePatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
 
      const regex = new RegExp('d{10,16}|[+]d{10,14}'); //NOSONAR
      const valid = regex.test(control.value);
      return valid ? null : { invalidphoneNumber: true };
    };
  }
 
  disableScriptPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
 
      const regex = new RegExp('^[^<>{}&]+$'); //NOSONAR
      const valid = regex.test(control.value);
      return valid ? null : { invalidInput: true };
    };
  }
 
  disableScriptPatternValidator2(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
 
      const format = /[`!@#$%^&*()+\=\[\]{};':"|,.<>?~؛،‘؟]/;
      const valid = format.test(control.value);
 
      return !valid ? null : { invalidInput: true };
    };
  }
 
  checkOnIdentitficationNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      if (control.value === 1 || control.value === 2) {
        return null;
      } else {
        return { InvalidIdentificationNumber: true };
      }
    };
  }
 
  numbersOnlyPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[0-9]*$'); //NOSONAR
      const valid = regex.test(control.value);
      return valid ? null : { invalidNumber: true };
    };
  }
 
  arabicEnglishNumbersExceptSomeSpecialCharactersPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(`^([\\u0621-\u064Aa-zA-Z0-9\\s!"#$%'()*+,-./:;=@[\\]\\\\|~/])+$`);
      const valid = regex.test(control.value);
      return valid ? null : { invalidCustomEnglishNumbersSymbolsExcept: true };
    };
  }
 
  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
 
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
 
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
 
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
 
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}