import { Injectable } from '@angular/core';
import { IspHttpService } from './shared/services/isp-http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PolicyDetailsResponse } from './shared/dataModels/policyDetailsResponse';
import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PolicyAppService {
  private policyContext = environment.context;
  constructor(private IspHttpService: IspHttpService) { }

  /**
     @name vinSearch- call to db to fetch Vin Summary Grid Data.
     @param request - form details to update.
     */
    getLoginDetails(request: any): Observable<any> {
      return this.IspHttpService
        .post(`${this.policyContext}/userInfo`, request)
        .pipe(
          (data: any) => {
            // this.logger.logMethodEnd('dist-fd', 'getDistFDDetails', 'Error in getDistFDDetails Service', '' + data);
            return data;
          }
        );
    }
  
  /**
     @name register- call to db to register user
     @param request - form details to register.
     */
    registerUser(request: any): Observable<any> {
      return this.IspHttpService
        .post(`${this.policyContext}/register`, request)
        .pipe(
          (data: any) => {
            // this.logger.logMethodEnd('dist-fd', 'getDistFDDetails', 'Error in getDistFDDetails Service', '' + data);
            return data;
          }
        );
    }  
  /**
     @name register- call to db to register user
     @param request - form details to register.
     */
    loadPolicyInfo() {
      return this.IspHttpService
        .get(`${this.policyContext}/policyDetails`)
        .pipe(
          (data: any) => {
            return data;
          }
        );
    }  

      loadUserPolicyInfo(userId: any): Observable<any> {
      return this.IspHttpService
      .post(`${this.policyContext}/userPolicyDetails`,userId)
      .pipe(
        (data: any) => {
          return data;
        }
      );
    }

    updatePolicyInfo(updPolicy: PolicyDetailsResponse[]): Observable<any> {
      console.log("b4 call" + JSON.stringify(updPolicy));
      return this.IspHttpService
      .post(`${this.policyContext}/savePolicyDetails`,updPolicy)
      .pipe(
        (data: any) => {
          return data;
        }
      );
    }
    
  //   comparePassword(password: string, confirmPassword: string): any {
  //   //const password = control.get('password');
  //   console.log("password is" + password);
  //   //const confirmPassword = control.get('confirmPassword');
  //   console.log("conpassword is" + confirmPassword);
  //       // set error on matchingControl if validation fails
  //       return password && confirmPassword && password === confirmPassword ? { 'mismatch': true } : null;
  // }

 
}
