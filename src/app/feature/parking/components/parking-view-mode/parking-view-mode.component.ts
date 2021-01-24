import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParkingModels } from '@app/feature/parking/constants/parking-models.constants';
import { ViewMode } from '@app/feature/parking/enums/view-mode.enum';
import { ParkingViewMode } from '@app/feature/parking/interfaces/parking-view-mode.interface';

@Component({
  selector: 'app-parking-view-mode',
  templateUrl: './parking-view-mode.component.html',
  styleUrls: ['./parking-view-mode.component.scss'],
})
export class ParkingViewModeComponent implements OnInit {
  @Input() public parkingViewMode: number;
  @Output()
  public emitChangeParkingView: EventEmitter<number> = new EventEmitter();

  public parkingViewModes: ParkingViewMode[];

  constructor() {}

  public ngOnInit(): void {
    this.parkingViewModes = ParkingModels.parkingViewModes;
    this.parkingViewMode = ViewMode.view;
  }

  public changeParkingViewMode(): void {
    if (this.parkingViewMode === ViewMode.view) {
      this.parkingViewMode = ViewMode.edit;
    } else {
      this.parkingViewMode = ViewMode.view;
    }
    this.emitChangeParkingView.next(this.parkingViewMode);
  }
}
