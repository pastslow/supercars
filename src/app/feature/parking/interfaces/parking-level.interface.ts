import { ParkingArea } from './parking-area.interface';

export interface ParkingLevel {
  areas: ParkingArea[];
  id: string;
  name: string;
  parkingId: string;
  status: string;
}
