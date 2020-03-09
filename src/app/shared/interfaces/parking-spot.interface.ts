import { Spot } from '@app/shared/interfaces/spot.interface';

export interface ParkingSpot {
  sizeRow: number;
  sizeCol: number;
  name: string,
  spots: Spot[];
}
