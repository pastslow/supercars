import { Spot } from './spot.interface';
import { ParkingFloor } from './parking-floor.interface';
import { ParkingArea } from './parking-area.interface';

export interface HttpResponse {
  message?: string;
  levels?: any;
  spots?: Spot[];
  areas?: ParkingArea[];
  entries?: ParkingFloor[];
}
