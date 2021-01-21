import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ParkingArea } from '@app/shared/interfaces/parking-area.interface';

@Component({
  selector: 'app-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.scss'],
})
export class ParkingStatusComponent implements OnInit, OnDestroy {
  @Input() public selectedParkingArea: ParkingArea;

  private unsubscribe$: Subject<void> = new Subject();

  constructor() {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
