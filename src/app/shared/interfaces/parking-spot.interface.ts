import { Spot } from '@app/shared/interfaces/spot.interface';

export interface ParkingArea {
  size_y: number;
  size_x: number;
  name: string,
  spots: Spot[];
}
