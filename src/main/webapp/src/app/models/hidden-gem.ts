import { Geometry } from './geometry';
import { Photos } from './photos';
import { OpeningHours } from './openingHours';

export interface HiddenGem {
  geometry: Geometry;
  name: string;
  icon: string;
  placeId: string;
  rating: number;
  types: string[];
  openingHours: OpeningHours;
  photos: Photos[];
  vicinity: string;
  permanentlyClosed: boolean;
  userRatingsTotal: number;
  businessStatus: string;
}
