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

export class CropModel {
  static empty(): Crop {
    return {
      name: "",
      purchaseValue: null,
      source: "",
      price: 0,
      time: 0,
      regrowthTime: null,
      experience: 0,
      imagePath: ""
    }
  }
}