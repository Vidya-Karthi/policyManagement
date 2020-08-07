import { ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageNavigateCellRendererComponent } from './page-navigate-cell-renderer.component';
import { Router } from '@angular/router';
import { IspAppService } from '../../../isp-app.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VSSearchRequest } from '../../../shared/dataModels/vinSummarySearchRequest';
import { VinSummaryComponent } from '../../../vin-summary/vin-summary.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.module';
import { LoaderService } from '../../../shared/loader/ip-loader.service';
import { GridApi, Grid } from 'ag-grid-community';
import { configureTestSuite } from '../../testConfig.spec';

describe('PageNavigateCellRendererComponent', () => {
  let component: PageNavigateCellRendererComponent;
  let fixture: ComponentFixture<PageNavigateCellRendererComponent>;
  let params: any;
 
  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      declarations: [ PageNavigateCellRendererComponent ],
      imports: [
        HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      RouterTestingModule
    ],
      providers: [ IspAppService, LoaderService ]
    });

    //TestBed.overrideModule(ProductionsModule, overrides);

    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNavigateCellRendererComponent ],
      imports: [
        HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      RouterTestingModule
    ],
      providers: [ IspAppService, LoaderService ]
    })
    .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavigateCellRendererComponent);
    component = fixture.componentInstance;    
    component.agInit(params);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false  on refresh', () => {
    expect(component.refresh()).toBe(false);
  });

  it('validate Routing', inject([Router,IspAppService],(router,ispService) => {
    spyOn(router,'navigate');
    ispService.vsSelectedData = new BehaviorSubject<VSSearchRequest>(new VSSearchRequest);
    //spyOn(ispService.vsSelectedData,'next').and.returnValue(data);
    spyOn(ispService,'setVSSelectedData').and.returnValue(new VSSearchRequest());
    component['params'] = {
      value: '2T3ZFREV3JW492485',
      context: {
        componentParent: {
          headerObj: { dealerCode: '15056' },
          currentPageRoutePath: 'vinSummary/vinSummaryDetails/',
          vSSearchRequest : new VSSearchRequest(),
          ispService: IspAppService.prototype,
          api: GridApi.prototype
        }
      },
      data : {
        customerName: 'David,John',
        retailDate: '06/06/2019'
      }
    }
    component['params'].context.componentParent.api = new GridApi;
    spyOn(component['params'].context.componentParent.api,'getFilterModel').and.returnValue({
      modelYear: { filter: "2018", filterType: "text", type: "equals" }
    });
    spyOn(component['params'].context.componentParent.api, "getSortModel").and.returnValue([{
       colId: "serialNo", sort: "asc" }
    ]);
    component.pageNavigate();
    expect(router.navigate).toHaveBeenCalledWith(['vinSummary/vinSummaryDetails//2T3ZFREV3JW492485/David%2CJohn/06~06~2019']);

    component['params'] = {
      value: '2T3ZFREV3JW492485',
      context: {
        componentParent: {
          headerObj: { dealerCode: '15056' },
          currentPageRoutePath: 'vinSummary',
          vSSearchRequest : new VSSearchRequest(),
          ispService: IspAppService.prototype,
          api: GridApi.prototype
        }
      },
      data : {
        customerName: 'David,John',
        retailDate: '06/06/2019'
      }
    }
    component['params'].context.componentParent.api = new GridApi;
    spyOn(component['params'].context.componentParent.api,'getFilterModel').and.returnValue({
      modelYear: { filter: "2018", filterType: "text", type: "equals" }
    });
    spyOn(component['params'].context.componentParent.api, "getSortModel").and.returnValue([{
       colId: "serialNo", sort: "asc" }
    ]);
    component.pageNavigate();
    expect(router.navigate).toHaveBeenCalledWith(['vinSummary']);
  }));

  it('validate Routing when route path is payment by payment and vin details', inject([Router,IspAppService],(router,ispService) => {
    spyOn(router,'navigate');
    ispService.vsSelectedData = new VSSearchRequest;
    //spyOn(ispService.vsSelectedData,'next').and.returnValue(data);
    spyOn(ispService,'setVSSelectedData').and.returnValue(new VSSearchRequest());
    component['params'] = {
      value: '3TMCZ5AN0KM225626',
      context: {
        componentParent: {
          headerObj: { dealerCode: '15056' },
          currentPageRoutePath: 'paymentByPayment/vinSummaryDetails/',
          vSSearchRequest : new VSSearchRequest(),
          ispService: IspAppService.prototype,
          api: GridApi.prototype
        }
      },
      data : {
        paymentReferenceNo: "0003751379",
        customerName: 'FAUCETT,MICHAEL',
        retailDate: '02/28/2019'
      }
    }
    component['params'].context.componentParent.api = new GridApi;
    spyOn(component['params'].context.componentParent.api,'getFilterModel').and.returnValue({
      modelYear: { filter: "2018", filterType: "text", type: "equals" }
    });
    spyOn(component['params'].context.componentParent.api, "getSortModel").and.returnValue([{
       colId: "serialNo", sort: "asc" }
    ]);
    component.pageNavigate();
    expect(router.navigate).toHaveBeenCalledWith(['paymentByPayment/vinSummaryDetails//3TMCZ5AN0KM225626/0003751379/FAUCETT%2CMICHAEL/02~28~2019']);
  }));

  it('validate Routing when route path is payment by payment and payment details', inject([Router,IspAppService],(router,ispService) => {
    spyOn(router,'navigate');
    ispService.vsSelectedData = new VSSearchRequest;
    //spyOn(ispService.vsSelectedData,'next').and.returnValue(data);
    spyOn(ispService,'setVSSelectedData').and.returnValue(new VSSearchRequest());
    component['params'] = {
      value: '0003745948',
      context: {
        componentParent: {
          headerObj: { dealerCode: '15056' },
          currentPageRoutePath: 'paymentByPayment/paymentDetails/',
          vSSearchRequest : new VSSearchRequest(),
          ispService: IspAppService.prototype,
          api: GridApi.prototype
        }
      },
      data : {
        paymentReferenceNo: "0003745948",
        customerName: 'FAUCETT,MICHAEL',
        retailDate: '02/28/2019'
      }
    }
    component['params'].context.componentParent.api = new GridApi;
    spyOn(component['params'].context.componentParent.api,'getFilterModel').and.returnValue({
      modelYear: { filter: "2018", filterType: "text", type: "equals" }
    });
    spyOn(component['params'].context.componentParent.api, "getSortModel").and.returnValue([{
       colId: "serialNo", sort: "asc" }
    ]);
    component.pageNavigate();
    expect(router.navigate).toHaveBeenCalledWith(['paymentByPayment/paymentDetails//0003745948']);
  })); 
  
  it('validate Routing when route path is payment by incentive and vin details', inject([Router,IspAppService],(router,ispService) => {
    spyOn(router,'navigate');
    ispService.vsSelectedData = new VSSearchRequest;
    //spyOn(ispService.vsSelectedData,'next').and.returnValue(data);
    spyOn(ispService,'setVSSelectedData').and.returnValue(new VSSearchRequest());
    component['params'] = {
      value: "3TMCZ5AN5KM231471",
      context: {
        componentParent: {
          headerObj: { dealerCode: '15056' },
          currentPageRoutePath: 'paymentByIncentive/vinSummaryDetails/',
          vSSearchRequest : new VSSearchRequest(),
          ispService: IspAppService.prototype
        }
      },
      data : {
        incentiveTypeName: "Customer Cash",
        incentiveTypeNo: 153857,
        customerName: "DISSINGER,HERBERT",
        retailDate: "02/28/2019"
      }
    }
    component.pageNavigate();
    expect(router.navigate).toHaveBeenCalledWith(['paymentByIncentive/vinSummaryDetails//3TMCZ5AN5KM231471/Customer Cash/153857/DISSINGER%2CHERBERT/02~28~2019']);
  }));

  it('validate Routing when route path is challenges details', inject([Router,IspAppService],(router,ispService) => {
    spyOn(router,'navigate');
    ispService.vsSelectedData = new VSSearchRequest;
    //spyOn(ispService.vsSelectedData,'next').and.returnValue(data);
    spyOn(ispService,'setVSSelectedData').and.returnValue(new VSSearchRequest());
    component['params'] = {
      value: '2T1BPRHE8KC201971',
      context: {
        componentParent: {
          headerObj: { dealerCode: '15056' },
          currentPageRoutePath: 'challenges/detail/',
          vSSearchRequest : new VSSearchRequest(),
          ispService: IspAppService.prototype,
          api: GridApi.prototype
        }
      },
      data : {
        vin: "2T1BPRHE8KC201971",
        challengeNo: 1191532,
      }
    }
    component['params'].context.componentParent.api = new GridApi;
    spyOn(component['params'].context.componentParent.api,'getFilterModel').and.returnValue({
      modelYear: { filter: "2018", filterType: "text", type: "equals" }
    });
    spyOn(component['params'].context.componentParent.api, "getSortModel").and.returnValue([{
       colId: "serialNo", sort: "asc" }
    ]);
    component.pageNavigate();
    expect(router.navigate).toHaveBeenCalledWith(['challenges/detail//2T1BPRHE8KC201971/1191532']);
  })); 

  it('validate Routing when route path is Deal Reviews details', inject([Router,IspAppService],(router,ispService) => {
    spyOn(router,'navigate');
    ispService.vsSelectedData = new VSSearchRequest;
    //spyOn(ispService.vsSelectedData,'next').and.returnValue(data);
    spyOn(ispService,'setVSSelectedData').and.returnValue(new VSSearchRequest());
    component['params'] = {
      value: 'DUMMY000014198645',
      context: {
        componentParent: {
          headerObj: { dealerCode: '15056' },
          currentPageRoutePath: 'dealReviews/detail/',
          vSSearchRequest : new VSSearchRequest(),
          ispService: IspAppService.prototype,
          api: GridApi.prototype
        }
      },
      data : {
        vin: "DUMMY000014198645",
        dealReviewNo: 6,
      }
    }
    component['params'].context.componentParent.api = new GridApi;
    spyOn(component['params'].context.componentParent.api,'getFilterModel').and.returnValue({
      modelYear: { filter: "2018", filterType: "text", type: "equals" }
    });
    spyOn(component['params'].context.componentParent.api, "getSortModel").and.returnValue([{
       colId: "serialNo", sort: "asc" }
    ]);
    component.pageNavigate();
    expect(router.navigate).toHaveBeenCalledWith(['dealReviews/detail//DUMMY000014198645/6']);
  })); 
  
});
