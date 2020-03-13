export interface Parking {
  id: number;
  name: string;
  address: string;
  total_levels: number;
  total_spots: number;
  free_spots: number;
  used_spots: number;
  start_date: string;
  end_date: string;
  user_id: number;
}
