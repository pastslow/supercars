import { Component, OnInit, OnDestroy } from '@angular/core';

import { SpinnerService } from '@app/shared/services/spinner-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'nodeJsProject';
  public isSpinnerDisplayed: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private spinnerService: SpinnerService) { }

  public ngOnInit(): void {
    this.spinnerService.getSpinnerDisplayValue$().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      this.isSpinnerDisplayed = res;
    })
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

