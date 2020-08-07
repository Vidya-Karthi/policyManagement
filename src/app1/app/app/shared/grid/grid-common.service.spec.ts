import { TestBed, inject } from '@angular/core/testing';

import { GridCommonService } from './grid-common.service';
import { configureTestSuite } from '../../shared/testConfig.spec';

describe('GridCommonService', () => {
  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => TestBed.configureTestingModule({}));*/

  it('should be created', () => {
    const service: GridCommonService = TestBed.get(GridCommonService);
    expect(service).toBeTruthy();
  });

  it('should calculate Total Pages and Current Page Set Values', inject([GridCommonService],(service) => {
    const rowPerPage = 10;
    let TotalRows = 250;
    expect(service.calculateTotalPages(TotalRows, rowPerPage)).toEqual(25);

    TotalRows = 251;
    expect(service.calculateTotalPages(TotalRows, rowPerPage)).toEqual(26);

    const currentPage = 2;
    const pageSet = {
      start: 21,
      end: 30
     }
    expect(service.calculateCurrentPageSetValues(currentPage, rowPerPage)).toEqual(pageSet);
  }))
});
