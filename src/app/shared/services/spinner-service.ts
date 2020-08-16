import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SpinnerService {
  private isSpinnerDisplayed$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  public getSpinnerDisplayValue$(): Observable<boolean> {
    return this.isSpinnerDisplayed$;
  }

  public makeSpinnerVisible(): void {
    this.isSpinnerDisplayed$.next(true);
  }

  public hideSpinner(): void {
    this.isSpinnerDisplayed$.next(false);
  }
}
