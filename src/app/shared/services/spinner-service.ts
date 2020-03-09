import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  public isSpinnerDisplayed = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  public makeSpinnerVisible() {
    this.isSpinnerDisplayed.next(true);
  }

  public hideSpinner() {
    this.isSpinnerDisplayed.next(false);
  }
}
