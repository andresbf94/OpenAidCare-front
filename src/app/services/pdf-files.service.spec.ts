import { TestBed } from '@angular/core/testing';

import { PdfFilesService } from './pdf-files.service';

describe('PdfFilesService', () => {
  let service: PdfFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
