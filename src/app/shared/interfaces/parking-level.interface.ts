import { ParkingArea } from './parking-area.interface';

export interface ParkingLevel {
  areas: ParkingArea;
  id: string;
  name: string;
  parking_id: string;
  status: string;
}
