import { TestBed } from '@angular/core/testing';

import { FlowResolverService } from './flow-resolver.service';

describe('FlowResolverService', () => {
  let service: FlowResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
