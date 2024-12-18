export interface Crop {
  name: string;
  purchaseValue: number | null;
  source: string;
  price: number;
  time: number;
  regrowthTime: number | null;
  experience: number;
  imagePath: string;
}
