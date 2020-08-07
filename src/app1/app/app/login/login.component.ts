import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { MessageService } from '../shared/message-handler/message-handler.service';
import { MatTabGroup } from '@angular/material';
import { PolicyAppService } from '../policy-app.service';
import { LoginRequest } from '../shared/dataModels/loginRequest';
import { LoginResponse } from '../shared/dataModels/loginResponse';
import { jsonpCallbackContext } from '@angular/common/http/src/module';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  public infoMessage: string; 
  public optiontab: number;
  loginForm: FormGroup;
  private loginRequest: LoginRequest;
  private loginResult: LoginResponse;


  constructor(private policyService: PolicyAppService,private route: ActivatedRoute,
    private messageService: MessageService, private router: Router,
     ){
  }

   
  ngOnInit() { 
    console.log("In login page");
    this.infoMessage = '';
   this.loginForm = new FormGroup({
    userId: new FormControl(null, Validators.required),
    password: new FormControl('',[Validators.required, Validators.minLength(5)])
  });
  }

  onSubmit() {
    console.log("user" + JSON.stringify(this.loginForm.value));
    let proceedFlag: boolean = true;
    // check all mandatory fields have value
    if (proceedFlag && !(this.loginForm.controls['userId'].value && this.loginForm.controls['password'].value )) {
      proceedFlag = false;
      this.messageService.showMessage('Please enter all mandatory fields.', 'error');
    } else if (proceedFlag && this.loginForm.controls['userId'].errors) {
      proceedFlag = false;
      this.messageService.showMessage('Please enter valid userId.', 'error');
    } else if (proceedFlag && this.loginForm.controls['password'].errors) {
      proceedFlag = false;
      this.messageService.showMessage('Please enter valid password.', 'error');
    }
    if (proceedFlag == true) {
       console.log("user" + this.loginForm.controls['userId']);
      this.loginRequest = this.loginForm.value;
      console.log("login Submitted" + JSON.stringify(this.loginRequest));
      let loginResults = new LoginResponse();
      this.getUserInfo(this.loginRequest);
    }  
  } 
 setLoginRequest() {
  // some default properties in the request object are set in the constructor itself
      this.loginRequest = new LoginRequest(); 
      this.loginRequest.userId = this.loginForm.controls['userId'].value;
      this.loginRequest.password = this.loginForm.controls['password'].value;
      console.log("login" + JSON.stringify(this.loginRequest));
  }

  private getUserInfo(formDetails: LoginRequest) {
    let loginResponse = new LoginResponse();
    this.policyService.getLoginDetails(formDetails)
    .subscribe(
      data => {
        loginResponse = data;
        this.validateUser(loginResponse);
      });
      }

  validateUser(loginResponse) {
    console.log("In validateUser" +JSON.stringify(loginResponse));
    if (loginResponse.userStatus == 'NewUser') {
      console.log("New User, Please register");
      this.infoMessage = 'You are not a registered User. Please register to login';
    }
    else if (loginResponse.role == 'user' )
     {
      console.log("Login Successful");
      let userIdParam: string = loginResponse.userId;
      this.router.navigate(['policy/' + userIdParam]);
    }
    else if (loginResponse.userId == 'Admin' && 
    loginResponse.responseStatus == 'PasswordIncorrect') {
      console.log("Contact Admin");
      this.infoMessage = 'Contact Admin Service';
    }
    else if ( loginResponse.role == 'admin')
     {
      console.log("Admin Login Successful");
      this.router.navigate(['adminPolicy']);
    }
  }

}