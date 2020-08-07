import { ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { MatIconModule } from '@angular/material';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { LoginComponent } from 'src/app/login/login.component';
import { FormsModule } from '@angular/forms'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataSharingService } from '../services/data-sharing.service';
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from '../testConfig.spec';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ,LoginComponent,BreadcrumbComponent],
      imports: [
        HttpClientModule,
        MatIconModule,
        MatToolbarModule, 
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        FormsModule
      ],
      providers: [DataSharingService]
    });
    //TestBed.overrideModule(ProductionsModule, overrides);

    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ,LoginComponent,BreadcrumbComponent],
      imports: [
        HttpClientModule,
        MatIconModule,
        MatToolbarModule, 
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        FormsModule
      ],
      providers: [DataSharingService]
    })
    .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([Router],(Router) => {
    expect(component).toBeTruthy();
  }));
});
