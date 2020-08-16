import { ParkingArea } from './parking-area.interface';

export interface ParkingLevel {
  areas: ParkingArea[];
  id: number;
  name: string;
  parking_id: string;
  status: string;
}
