import { ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { MatRadioModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule, MatDividerModule, MatTabsModule, MatCardModule, MatInputModule, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { CustomTextFilterComponent } from './shared/grid/filter/custom-text-filter.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { ipLoaderComponent } from './shared/loader/ip-loader.component';
import { MessageHandlerComponent } from './shared/message-handler/message-handler.component';
import { ISPAppConfigService } from './shared/services/isp-app-config.service';
import { IspHttpService } from './shared/services/isp-http.service';
import { LoaderService } from './shared/loader/ip-loader.service';
import { DataSharingService } from './shared/services/data-sharing.service';
import { CustomDropDownFilterComponent } from './shared/grid/filter/custom-drop-down-filter.component';
import { CustomDateFilterComponent } from './shared/grid/filter/custom-date-filter.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PolicyAppService } from './policy-app.service';
import { configureTestSuite } from './shared/testConfig.spec';
import { MdePopoverModule } from '@material-extended/mde';

describe('AppComponent', () => {
  let fixture;
  let app;
  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        ipLoaderComponent,
        MessageHandlerComponent,
        CustomTextFilterComponent,
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MdePopoverModule,
        HttpClientModule,
        AgGridModule.withComponents([CustomTextFilterComponent, CustomDropDownFilterComponent, CustomDateFilterComponent]),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        BrowserAnimationsModule,
        MatCardModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule,
        MatIconModule,
        MatSelectModule,
        RouterTestingModule
      ],
      providers: [
        ISPAppConfigService,
        DataSharingService,
        IspHttpService,
        LoaderService,
      ]
    });
    //TestBed.overrideModule(ProductionsModule, overrides);
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        ipLoaderComponent,
        MessageHandlerComponent,
        CustomTextFilterComponent,
        VinSummaryComponent,
        PaymentByPaymentComponent,
        PaymentByIncentiveComponent,
        ChallengesComponent,
        DealReviewsComponent,
        VinSummaryDetailsComponent,
        BreadcrumbComponent,
        CustomDropDownFilterComponent,
        CustomDateFilterComponent,
        PaymentDetailsComponent,
        IncentiveDetailsComponent,
        ChallengesDetailComponent,
        DealReviewDetailsComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AgGridModule.withComponents([CustomTextFilterComponent, CustomDropDownFilterComponent, CustomDateFilterComponent]),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        BrowserAnimationsModule,
        MatCardModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule,
        MatIconModule,
        MatSelectModule,
        RouterTestingModule
      ],
      providers: [
        ISPAppConfigService,
        DataSharingService,
        IspHttpService,
        LoaderService,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    app.headerObj = { dealerCode: '15056', challengeNew: 0, dealReviewNew: 0 };
  });*/

  beforeEach(() => {    
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    app.headerObj = { dealerCode: '15056', challengeNew: 0, dealReviewNew: 0 };
  });

  it('should create the app', inject([ISPAppConfigService, Router], (ispconfigServ, router) => {
    spyOn(ispconfigServ, 'getHeaderDetails').and.returnValue({ dealerCode: '15056', challengeNew: 0, dealReviewNew: 0 });
    //let events = of(new NavigationEnd(0,'http://localhost:4200/login','http://localhost:4200/login'));
    let event = {
      id: 1,
      navigationTrigger: "imperative",
      restoredState: null,
      url: "/"
    }
    spyOn(router, 'events').and.returnValue(of(event));
    app.ngOnInit();
    expect(app).toBeDefined();
  }));

 
});
