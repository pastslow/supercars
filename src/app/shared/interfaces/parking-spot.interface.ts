import { Spot } from './spot.interface';

export interface ParkingSpot {
  sizeRow: number;
  sizeCol: number;
  name: string,
  spots: Spot[];
}
