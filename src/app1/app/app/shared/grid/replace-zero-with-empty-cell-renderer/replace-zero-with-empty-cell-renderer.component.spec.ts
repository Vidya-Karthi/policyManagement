import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { ReplaceZeroWithEmptyCellRendererComponent } from './replace-zero-with-empty-cell-renderer.component';
import { configureTestSuite } from '../../testConfig.spec';

describe('ReplaceZeroWithEmptyCellRendererComponent', () => {
  let component: ReplaceZeroWithEmptyCellRendererComponent;
  let fixture: ComponentFixture<ReplaceZeroWithEmptyCellRendererComponent>;
  let params: any;

  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
       declarations: [ ReplaceZeroWithEmptyCellRendererComponent ]
    });

    //TestBed.overrideModule(ProductionsModule, overrides);

    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplaceZeroWithEmptyCellRendererComponent ]
    })
    .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceZeroWithEmptyCellRendererComponent);
    component = fixture.componentInstance;
    component.agInit(params);
  });

  it('should create ReplaceZeroWithEmptyCellRendererComponent', () => {
    expect(component).toBeTruthy();
  });

  it('refresh call should return false', () => {
    let returnValue = component.refresh();
    expect(returnValue).toBe(false);
  });

  it('process Value function should return empty string on params value 0', () => {
    component.params = {
      value : 0
    };
    let returnValue = component.processValue();
    expect(returnValue).toBe('');
  });

  it('process Value function should return the same value on params', () => {
    component.params = {
      value : '7'
    };
    let returnValue = component.processValue();
    expect(returnValue).toBe('7');
  });
});
