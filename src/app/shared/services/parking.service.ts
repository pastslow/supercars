import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Coordinate } from '@app/shared/interfaces/coordinate.interface';
import { Spot } from '@app/shared/interfaces/spot.interface';
import { Parking } from '@app/shared/interfaces/parking.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-area.interface';

@Injectable()
export class ParkingService {
  public parkingState$: BehaviorSubject<Parking> = new BehaviorSubject(null);
  public parkingAreaState$: BehaviorSubject<ParkingArea> = new BehaviorSubject(
    null
  );
  public selectedParkingLevelIndex$: BehaviorSubject<number> = new BehaviorSubject(
    0
  );

  constructor() {}

  public getParkingStateValue(): Parking {
    return this.parkingState$.value;
  }

  public getParkingState$(): Observable<Parking> {
    return this.parkingState$.asObservable();
  }

  public updateParkingState(parking: Parking): void {
    this.parkingState$.next(parking);
  }

  public getParkingAreaStateValue(): ParkingArea {
    return this.parkingAreaState$.getValue();
  }

  public getParkingAreaState$(): Observable<ParkingArea> {
    return this.parkingAreaState$.asObservable();
  }

  public updateParkingAreaState(parkingArea: ParkingArea): void {
    this.parkingAreaState$.next(parkingArea);
  }

  public getSelectedParkingAreaId(): string {
    return this.parkingAreaState$.getValue().id;
  }

  public getSelectedParkingId(): string {
    return this.parkingState$.getValue().id;
  }

  public getSelectedParkingLevelIndex$(): Observable<number> {
    return this.selectedParkingLevelIndex$.asObservable();
  }

  public updateSelectedParkingLevelIndex(levelIndex: number): void {
    this.selectedParkingLevelIndex$.next(levelIndex);
  }

  public getSelectedCell(
    coordinate: Coordinate,
    parkingPlacements: Spot[]
  ): Spot {
    const selectedCell = parkingPlacements.find(
      (spot) => spot.x === coordinate.x && spot.y === coordinate.y
    );
    return selectedCell;
  }
}
