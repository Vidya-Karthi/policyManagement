import { Component, OnInit, ViewChild } from '@angular/core';
import { PolicyAppService } from '../policy-app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../shared/message-handler/message-handler.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { RegisterUser } from '../shared/dataModels/registerUser';
import { LoginResponse } from '../shared/dataModels/loginResponse';
import { ValidateFirstName, ValidateDOB, ValidateEmail, ComparePassword, ValidateDOBFormat } from '../custom-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerUser: RegisterUser;
  public infoMessage: string; 
  userId: string; 

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  
  constructor(private policyService: PolicyAppService,private route: ActivatedRoute,
    private messageService: MessageService, private router: Router,private fb: FormBuilder) {
  }

  ngOnInit() {
    console.log("In register page");
    this.infoMessage = '';
    this.registerForm = this.fb.group({
      'firstName': ["",[Validators.required,ValidateFirstName,Validators.pattern('^[a-zA-Z0-9]+$')]],
      'lastName': [null, Validators.required],
      'dob': [null, [Validators.required,ValidateDOB,ValidateDOBFormat]],
      'address': [null, Validators.required],
      'contactNo': [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      'emailAddress': ["", [Validators.required,ValidateEmail,Validators.email]],
      'password': [null,[Validators.required,Validators.minLength(6)]],
      'confirmPassword': [null,Validators.required]},
	  {
        validator: [ComparePassword("password", "confirmPassword")]
      }
      );
  }


  
  onSubmit() {
    console.log("Login Form Submitted");
    let proceedFlag: boolean = true;
    let dobstr: string;
    
    // check all mandatory fields have value
    if (proceedFlag && !(this.registerForm.controls['firstName'].value && this.registerForm.controls['lastName'].value &&
    this.registerForm.controls['dob'].value && this.registerForm.controls['address'].value &&
    this.registerForm.controls['contactNo'].value && this.registerForm.controls['emailAddress'].value  &&
    this.registerForm.controls['password'].value && this.registerForm.controls['confirmPassword'].value )) {
      proceedFlag = false;
      this.infoMessage = 'Please enter all mandatory fields.';
    } 
if(proceedFlag == true) {
    this.registerUser = this.registerForm.value;
    console.log("register  Submitted" + JSON.stringify(this.registerUser));
    let registerRequest = new RegisterUser();
   
    dobstr = this.registerForm.controls['dob'].value;
    this.userId = this.registerForm.controls['firstName'].value + dobstr.substr(0,2)
       + dobstr.substr(3,2);
    console.log("userId" + this.userId);  
    registerRequest.setUserId(this.userId); 
    registerRequest.setFirstName(this.registerForm.controls['firstName'].value);
    registerRequest.setLastName(this.registerForm.controls['lastName'].value);
    registerRequest.setPassword(this.registerForm.controls['password'].value);
    registerRequest.setAddress(this.registerForm.controls['address'].value);
    registerRequest.setContactNo(this.registerForm.controls['contactNo'].value);
    registerRequest.setDob(this.registerForm.controls['dob'].value);
    registerRequest.setEmailaddress(this.registerForm.controls['emailAddress'].value);
    registerRequest.setRole("user");
    this.register(registerRequest);

  }
  }

  onReset() {
    console.log("on Reset");
    this.registerForm.reset();
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.registerForm.controls['firstName'].clearValidators();
    this.registerForm.controls['lastName'].clearValidators();
    this.registerForm.controls['password'].clearValidators();
    this.registerForm.controls['confirmPassword'].clearValidators();
    this.registerForm.controls['address'].clearValidators();
    this.registerForm.controls['contactNo'].clearValidators();
    this.registerForm.controls['dob'].clearValidators();
    this.registerForm.controls['emailAddress'].clearValidators();
    this.registerForm.controls['firstName'].updateValueAndValidity();
    this.registerForm.controls['lastName'].updateValueAndValidity();
    this.registerForm.controls['lastName'].updateValueAndValidity();
    this.registerForm.controls['password'].updateValueAndValidity();
    this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    this.registerForm.controls['address'].updateValueAndValidity();
    this.registerForm.controls['contactNo'].updateValueAndValidity();
    this.registerForm.controls['dob'].updateValueAndValidity();
    this.registerForm.controls['emailAddress'].updateValueAndValidity();
  }  
  private register(registerDetails: RegisterUser) {
    console.log("in registerUser  " + JSON.stringify(this.registerUser));
    let loginResponse = new LoginResponse();
    this.policyService.registerUser(registerDetails)
    .subscribe(
      data => {
        loginResponse = data;
        //this.validateUser(loginResponse);
        console.log("Response" + JSON.stringify(data));
      });
       this.infoMessage = this.userId + " registered.Please login."
      }
      
}
