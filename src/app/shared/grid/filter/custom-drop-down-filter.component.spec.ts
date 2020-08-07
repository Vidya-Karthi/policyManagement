import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { CustomDropDownFilterComponent,CustomDropDownFilterParams } from './custom-drop-down-filter.component';
import { MatSelectModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../testConfig.spec';

describe('CustomDropDownFilterComponent', () => {
  let component: CustomDropDownFilterComponent;
  let fixture: ComponentFixture<CustomDropDownFilterComponent>;
  let params: CustomDropDownFilterParams;

  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      declarations: [ CustomDropDownFilterComponent ],
      imports: [MatSelectModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    //TestBed.overrideModule(ProductionsModule, overrides);
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDropDownFilterComponent ],
      imports: [MatSelectModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDropDownFilterComponent);
    component = fixture.componentInstance;
    component.agInit(params);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create filter model and return model',() => {
    component.currentValue = '';
    expect(component.buildModel()).toBeNull();

    component.currentValue = 'Test';
    const mockObj = {
      filterType: 'text',
      type: 'equals',
      filter: 'Test'
    };
    expect(component.buildModel()).toEqual(mockObj);
  })

  it('should assign parent Model filter value to current value', () => {
    let parentModel = {
      filter: "Test",
      filterType: "text",
      type: "equals"
    }
    component.onParentModelChanged(parentModel);
    expect(component.currentValue).toBe(parentModel.filter);

    component.onParentModelChanged(null);
    expect(component.currentValue).toBeNull;
  });
});
