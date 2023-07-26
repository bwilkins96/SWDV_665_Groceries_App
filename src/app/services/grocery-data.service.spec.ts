import { TestBed } from '@angular/core/testing';

import { GroceryDataService } from './grocery-data.service';

describe('GroceryDataService', () => {
  let service: GroceryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
