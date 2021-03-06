import { Spot } from '@app/feature/parking/interfaces/spot.interface';

export interface ParkingArea {
  id: string;
  name: string;
  sizeY: number;
  sizeX: number;
  parkingEntriesId: string;
  totalSpots: number;
  freeSpots: number;
  usedSpots: number;
  spots: Spot[];
  parkingId: string;
}
