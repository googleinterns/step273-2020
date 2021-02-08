import { Location } from './location';

export interface Geometry {
  location: Location;
  viewport: {
    northeast: Location;
    southwest: Location;
  }
}
