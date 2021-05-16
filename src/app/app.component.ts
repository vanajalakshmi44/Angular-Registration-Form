import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'registration';
  validatingForm: FormGroup;
  formGroupName: FormGroup;
  submitted = false;
  registered = false;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validatingForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required,Validators.minLength(10)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    });
  }
  hasError(controlName: string, errorName: string) {
    if (this.validatingForm.controls['password'].valid && controlName == 'confirmPassword') {
      if(this.validatingForm.controls.password.value !== this.validatingForm.controls.confirmPassword.value){
        return true;
      }
    }
    if (this.submitted) {
      return this.validatingForm.controls[controlName].hasError(errorName);
    }
    if (!this.validatingForm.controls[controlName].valid && this.validatingForm.controls[controlName]?.touched) {
      return this.validatingForm.controls[controlName].hasError(errorName);
    } else {
      return false;
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.validatingForm.valid) {
      this.registered = true;
      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.validatingForm.value);
    }
  }
}
