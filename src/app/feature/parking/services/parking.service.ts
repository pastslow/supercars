import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Parking } from '@app/feature/parking/interfaces/parking.interface';
import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';
import { Spot } from '@app/feature/parking/interfaces/spot.interface';

@Injectable()
export class ParkingService {
  public temporaryAreaSpotsState$: BehaviorSubject<
    Spot[]
  > = new BehaviorSubject([]);
  public parkingState$: BehaviorSubject<Parking> = new BehaviorSubject(null);
  public parkingAreaState$: BehaviorSubject<ParkingArea> = new BehaviorSubject(
    null
  );
  public selectedParkingLevelIndex$: BehaviorSubject<number> = new BehaviorSubject(
    0
  );

  constructor() {}

  public getTemporaryAreaSpotsStateValue(): Spot[] {
    return this.temporaryAreaSpotsState$.value;
  }

  public updateTemporaryAreaSpotsState(spots: Spot[]): void {
    this.temporaryAreaSpotsState$.next(spots);
  }

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
}
