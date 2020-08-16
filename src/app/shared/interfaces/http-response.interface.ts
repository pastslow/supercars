import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingFloor } from '@app/shared/interfaces/parking-floor.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-area.interface';
import { Parking } from './parking.interface';

export interface HttpResponse {
  message?: string;
  levels?: any;
  spots?: Spot[];
  areas?: ParkingArea[];
  entries?: ParkingFloor[];
  parking?: Parking;
  drivers?: any;
}
