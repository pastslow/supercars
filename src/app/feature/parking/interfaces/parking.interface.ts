import { ParkingLevel } from './parking-level.interface';
export interface Parking {
  id: string;
  name: string;
  address: string;
  totalLevels: number;
  totalSpots: number;
  freeSpots: number;
  usedSpots: number;
  startDate: string;
  endDate: string;
  levels: ParkingLevel[];
  parkingType: string;
}
