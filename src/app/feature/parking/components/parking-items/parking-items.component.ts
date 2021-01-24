import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

import { Parking } from '@app/feature/parking/interfaces/parking.interface';

@Component({
  selector: 'app-parking-items',
  templateUrl: './parking-items.component.html',
  styleUrls: ['./parking-items.component.scss'],
})
export class ParkingItemsComponent implements OnInit, OnChanges {
  @Input() public parkings: Parking[];
  @Output()
  public editSelectedParking: EventEmitter<Parking> = new EventEmitter();
  @Output()
  public deleteSelectedParking: EventEmitter<Parking> = new EventEmitter();
  @Output()
  public changeParkingModelIndex: EventEmitter<number> = new EventEmitter();

  public selectedParking: Parking;
  public hasAnyParkingsCreated: boolean;

  constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.parkings && changes.parkings.currentValue) {
      this.displayCreateParking();
    }
  }

  public changeSelectedParking(parking: Parking): void {
    this.selectedParking = parking;
  }

  public editParking(selectedParking: Parking): void {
    this.editSelectedParking.next(selectedParking);
  }

  public deleteParking(): void {
    this.deleteSelectedParking.next(this.selectedParking);
  }

  public createParking(selectedParkingModelIndex: number): void {
    this.changeParkingModelIndex.next(selectedParkingModelIndex);
  }

  private displayCreateParking(): void {
    this.hasAnyParkingsCreated = this.parkings.length > 0;
  }
}
