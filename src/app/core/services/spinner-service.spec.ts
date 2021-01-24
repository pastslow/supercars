import { TestBed } from '@angular/core/testing';

import { SpinnerService } from '@app/core/services/spinner-service';
import { of } from 'rxjs';

describe('The Spinner Service', () => {
  let spinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SpinnerService,
          useValue: jasmine.createSpyObj('SpinnerService', [
            'getSpinnerDisplayValue$',
            'makeSpinnerVisible',
            'hideSpinner',
          ]),
        },
      ],
    });

    spinnerService = TestBed.inject(SpinnerService);
  });

  describe('the *getSpinnerDisplayValue$* method', () => {
    it('should return a boolean which represents if the spinner is displayed or not', () => {
      spinnerService.hideSpinner();

      spinnerService.getSpinnerDisplayValue$.and.returnValue(of(false));
      spinnerService
        .getSpinnerDisplayValue$()
        .subscribe((isSpinnerDisplayed) => {
          expect(isSpinnerDisplayed).toEqual(false);
        });
    });
  });

  describe('the *makeSpinnerVisible* method', () => {
    it("should make spinner visible and set it's value to true", () => {
      spinnerService.makeSpinnerVisible();

      spinnerService.getSpinnerDisplayValue$.and.returnValue(of(true));
      spinnerService
        .getSpinnerDisplayValue$()
        .subscribe((isSpinnerDisplayed) => {
          expect(isSpinnerDisplayed).toEqual(true);
        });
    });
  });

  describe('the *hideSpinner* method', () => {
    it("should make spinner no longer visible and set it's value to false", () => {
      spinnerService.hideSpinner();

      spinnerService.getSpinnerDisplayValue$.and.returnValue(of(false));
      spinnerService
        .getSpinnerDisplayValue$()
        .subscribe((isSpinnerDisplayed) => {
          expect(isSpinnerDisplayed).toEqual(false);
        });
    });
  });
});
