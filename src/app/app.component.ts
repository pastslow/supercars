import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '@app/core/services/session.service';

import { SpinnerService } from '@app/core/services/spinner-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'nodeJsProject';
  public isSpinnerDisplayed: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private spinnerService: SpinnerService,
    private sessionService: SessionService
  ) {}

  public ngOnInit(): void {
    this.spinnerService
      .getSpinnerDisplayValue$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.isSpinnerDisplayed = res;

        //todo remove mock userId '1' when implementation is done
        this.sessionService.updateUserId(1);
        //todo end
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
