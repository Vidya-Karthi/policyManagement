import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomTextFilterComponent, CustomTextFilterParams } from './custom-text-filter.component';
import { SerializedDateFilter } from 'ag-grid-community';
import { configureTestSuite } from '../../testConfig.spec';

describe('CustomTextFilterComponent', () => {
  let component: CustomTextFilterComponent;
  let fixture: ComponentFixture<CustomTextFilterComponent>;
  let params: CustomTextFilterParams;

  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      declarations: [ CustomTextFilterComponent ],
      imports: [MatInputModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    //TestBed.overrideModule(ProductionsModule, overrides);

    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTextFilterComponent ],
      imports: [MatInputModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTextFilterComponent);
    component = fixture.componentInstance;
    component.agInit(params);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create filter model and return model',() => {
    component.currentValue = 'Test';
    const mockObj = {
      filterType: 'text',
      type: 'equals',
      filter: 'Test'
    };
    expect(component.buildModel()).toEqual(mockObj);

    component.currentValue = '';
    expect(component.buildModel()).toBeNull;
  })
  
  it('should assign current value to intital value', () => {
    component.currentValue = 'Test';  
    component.initialValue = '';    
    component.onFocus()
    expect(component.initialValue).toBe(component.currentValue);
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

  })
});
