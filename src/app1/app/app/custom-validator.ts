import { FormGroup, AbstractControl } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

export function ComparePassword(controlName: string, matchingControlName: string) {
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

// To validate first name
export function ValidateFirstName(control: AbstractControl) {
  //const fname = firstName;
   console.log("validating first characters"+ control.value);
   //if (!control.value == null) {
     console.log("here1");
    if (control.value.match(('^[0-9]'))) {
    console.log("validating name");
    return { validFname: true };
  }
//}
  console.log("validating first character");
    return null;
}


// To validate first name
export function ValidateEmail(control: AbstractControl) {
  //const fname = firstName;
   console.log("validating email characters"+ control.value);
   if (!control.value == null)  {
    if (!control.value.match('[^_]+$')) {
    console.log("validating email");
    return { validEmail: true };
  }
}
  console.log("validating email character");
    return null;
}

export function ValidateDOB(control: AbstractControl) {
console.log("validating DOB characters"+ control.value);
var today = new Date();
today.setHours(0,0,0,0);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');  
var yyyy = today.getFullYear();
var currDate = dd + '/' + mm + '/' + yyyy;
var inpDate = new Date(control.value);
var dd = String(inpDate.getDate()).padStart(2, '0');
var mm = String(inpDate.getMonth() + 1).padStart(2, '0');  
var yyyy = inpDate.getFullYear();
var userDate = dd + '/' + mm + '/' + yyyy;
console.log("date input" + userDate);
console.log("today" + currDate);
  if (userDate > currDate) {
    console.log("validating DOB"); 
    return { validDob: true };
  }
  console.log("date valid");
    return null;
}

export function ValidateDOBFormat(control: AbstractControl) {
  console.log("validating DOB characters"+ control.value);
  let dateRegEx = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
  if(!control.value == null) {
    if (!control.value.match(dateRegEx)) {
       console.log("did not match");
      return { "dateDOB": true };
    }
  }  
  return null;
  }
  

