import { ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { NgZone } from '@angular/core';
import { MessageHandlerComponent } from './message-handler.component';
import { MessageService } from './message-handler.service';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { configureTestSuite } from '../testConfig.spec';

describe('MessageHandlerComponent', () => {
  let component: MessageHandlerComponent;
  let fixture: ComponentFixture<MessageHandlerComponent>;

  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, MatToolbarModule],
      declarations: [ MessageHandlerComponent ],
      providers: [MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    //TestBed.overrideModule(ProductionsModule, overrides);
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, MatToolbarModule],
      declarations: [ MessageHandlerComponent ],
      providers: [MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    spyOn(component,'ngOnDestroy').and.callFake(()=>{})
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMesage and state for Messagestate object', inject([MessageService, NgZone],(msgService, zone) => {
    spyOn(msgService,'MessageState').and.returnValue({message:'errorMessage', messageType: 'error'});
    spyOn(zone,'run');
    component.ngOnInit();
  }));

  it('should call ngOnDestroy', () => {
    component.ngOnDestroy();
  });
});
