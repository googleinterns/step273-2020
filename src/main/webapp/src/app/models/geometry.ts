import { Location } from './location';

// This interface contains the location coordinates (longitude and latitude) of the hidden gem.
export interface Geometry {
  // Location of the hidden gem.
  location: Location;

  // It contains the preferred viewport when displaying the place on a map as a LatLngBounds if it is known.
  // TODO: to be removed after creating the Hidden Gem object in the backend.
  viewport: {
    northeast: Location;
    southwest: Location;
  }
}
