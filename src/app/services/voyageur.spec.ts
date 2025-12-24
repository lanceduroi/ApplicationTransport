import { TestBed } from '@angular/core/testing';

import { VoyageurService } from './src/app/services/voyageur.service';

describe('Voyageur', () => {
  let service: VoyageurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoyageurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
