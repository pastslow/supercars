import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Parking } from '@app/feature/parking/interfaces/parking.interface';
import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';
import { Spot } from '@app/feature/parking/interfaces/spot.interface';

@Injectable()
export class ParkingService {
  private temporaryDeletedSpotsIds$: BehaviorSubject<
    string[]
  > = new BehaviorSubject([]);
  private temporaryAreaSpotsState$: BehaviorSubject<
    Spot[]
  > = new BehaviorSubject([]);
  private parkingState$: BehaviorSubject<Parking> = new BehaviorSubject(null);
  private parkingAreaState$: BehaviorSubject<ParkingArea> = new BehaviorSubject(
    null
  );
  private selectedParkingLevelIndex$: BehaviorSubject<number> = new BehaviorSubject(
    0
  );

  constructor() {}

  public getTemporaryAreaDeletedSpotsIdsValue(): string[] {
    return this.temporaryDeletedSpotsIds$.value;
  }

  public updateTemporaryAreaDeletedSpots(deletedSpots: string[]): void {
    this.temporaryDeletedSpotsIds$.next(deletedSpots);
  }

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
