import { TestBed } from '@angular/core/testing';

import { IspHttpService } from './isp-http.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from '../loader/ip-loader.service';
import { configureTestSuite } from '../../shared/testConfig.spec';

describe('IspHttpService', () => {
  configureTestSuite();
  
  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule],
    providers: [
      LoaderService
    ]
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  /*beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule],
    providers: [
      LoaderService
    ]
  }));*/

  it('should be created', () => {
    const service: IspHttpService = TestBed.get(IspHttpService);
    expect(service).toBeTruthy();
  });
});
