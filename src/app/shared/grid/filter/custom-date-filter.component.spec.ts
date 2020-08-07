import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomDateFilterComponent, CustomDateFilterParams } from './custom-date-filter.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../testConfig.spec';

describe('CustomDateFilterComponent', () => {
  let component: CustomDateFilterComponent;
  let fixture: ComponentFixture<CustomDateFilterComponent>;
  let params: CustomDateFilterParams;

  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      declarations: [ CustomDateFilterComponent ],
      imports: [MatDatepickerModule, MatNativeDateModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    //TestBed.overrideModule(ProductionsModule, overrides);

    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDateFilterComponent ],
      imports: [MatDatepickerModule, MatNativeDateModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDateFilterComponent);
    component = fixture.componentInstance;
    component.agInit(params);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create filter model and return model',() => {
    component.currentValue = '';
    expect(component.buildModel()).toBeNull();

    component.currentValue = null;
    expect(component.buildModel()).toBeNull();

    component.currentValue =  'Invalid Date';
    expect(component.buildModel()).toBeNull();   

    component.currentValue = 'Wed Jun 12 2019 05:55:43 GMT-0500 (Central Daylight Time)';
    const mockObj = {
      filterType: 'text',
      type: 'equals',
      filter: '06/12/2019'
    };
    expect(component.buildModel()).toEqual(mockObj);
  })
  
  it('should assign parent Model filter value to current value', () => {
    let parentModel = {
      filter: "06/12/2019",
      filterType: "text",
      type: "equals"
    }
    component.onParentModelChanged(parentModel);
    expect(component.currentValue).toEqual(new Date(parentModel.filter));

    component.onParentModelChanged(null);
    expect(component.currentValue).toBeNull;
  })

  it('should assign current value to intital value', () => {
    component.currentValue = 'Test';  
    component.initialValue = '';    
    component.onFocus()
    expect(component.initialValue).toBe(component.currentValue);
  })
});
