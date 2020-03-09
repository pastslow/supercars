import { Spot } from '@app/shared/interfaces/spot.interface';

export interface ParkingArea {
  id: number;
  name: string;
  size_y: number;
  size_x: number;
  parking_entries_id: number;
  spots: Spot[];
}
