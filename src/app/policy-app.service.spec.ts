import { TestBed } from '@angular/core/testing';

import { PolicyAppService } from './policy-app.service';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoaderService } from './shared/loader/ip-loader.service';
import { IspHttpService } from './shared/services/isp-http.service';


describe('PolicyAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpClient,
      HttpHandler,
      LoaderService
    ]
  }));

  it('should be created', () => {
    const service: PolicyAppService = TestBed.get(PolicyAppService);
    expect(service).toBeTruthy();
  });

  // it('payment by payment method details fetch',() => {
  //   const service: IspAppService = TestBed.get(IspAppService);
  //   // let url ='/iplus-isp-0.0.1-SNAPSHOT/payments/searchPaymentsByMethod';
  //   let url ='/isp-api/payments/searchPaymentsByMethod';
  //   const ispHttpServ = TestBed.get(IspHttpService);
  //   spyOn(ispHttpServ,'post');
  //   let req = new PaymentsSearchRequest;
  //   service.fetchPayByPayData(req);
  //   expect(ispHttpServ.post).toHaveBeenCalledWith(url,req);
  // })

  
});